// Tính năng ẩn/hiện mật khẩu
function togglePassword(inputId, iconElement) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        iconElement.classList.remove("fa-eye");
        iconElement.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        iconElement.classList.remove("fa-eye-slash");
        iconElement.classList.add("fa-eye");
    }
}

// Xử lý Validation khi submit form
// Xử lý Validation khi submit form
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    let isValid = true;

    function showError(id, show) {
        document.getElementById(id).style.display = show ? 'block' : 'none';
        if(show) isValid = false;
    }

    const lastName = document.getElementById('lastName').value.trim();
    showError('lastNameError', lastName === "");

    const firstName = document.getElementById('firstName').value.trim();
    showError('firstNameError', firstName === "");

    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^(02|03|05|07|08|09)[0-9]{8}$/;
    showError('phoneError', !phoneRegex.test(phone));

    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    showError('emailError', !emailRegex.test(email));

    const password = document.getElementById('password').value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;    
    showError('passwordError', !passwordRegex.test(password));

    const confirmPassword = document.getElementById('confirmPassword').value;
    showError('confirmPasswordError', confirmPassword === "" || confirmPassword !== password);

    // ---- KIỂM TRA TICK ĐIỀU KHOẢN ----
    const agreeCheckbox = document.getElementById('agree-terms');
    if (agreeCheckbox) {
        showError('err-terms', !agreeCheckbox.checked);
    }
    // -------------------------------------------------

    if (isValid) {
        let users = JSON.parse(localStorage.getItem('gacxen_users')) || [];
        
        const isEmailExist = users.some(u => u.email === email);
        if (isEmailExist) {
            alert("Email này đã được đăng ký! Vui lòng chuyển sang trang Đăng nhập.");
            return;
        }

        const newUser = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            password: password 
        };

        users.push(newUser);
        localStorage.setItem('gacxen_users', JSON.stringify(users));

        alert("Đăng ký tài khoản thành công! Mời bạn đăng nhập để tiếp tục.");
        
        setTimeout(function() {
            window.location.href = 'dangnhap.html'; 
        }, 2000);
    }
});

// ---- TỰ ĐỘNG TẮT CHỮ ĐỎ KHI TICK VÀO Ô ----
const agreeCheckboxEl = document.getElementById('agree-terms');
if (agreeCheckboxEl) {
    agreeCheckboxEl.addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('err-terms').style.display = 'none';
        }
    });
}

// Xử lý Social Login
const btnFacebook = document.querySelector('.btn-fb');
const btnGoogle = document.querySelector('.btn-gg');

function simulateSocialLogin(url, title, providerName) {
    const width = 500;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    
    const popup = window.open(
        url, title, 
        `width=${width},height=${height},top=${top},left=${left},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
    );

    setTimeout(() => {
        if(popup) popup.close();

        const dummyUser = {
            firstName: 'Khách',
            lastName: providerName,
            email: `user@${providerName.toLowerCase()}.com`,
            phone: '0900000000',
            password: 'SocialLogin_NoPassword_123!'
        };

        localStorage.setItem('gacxen_currentUser', JSON.stringify(dummyUser));

        alert(`Đăng nhập bằng ${providerName} thành công! Đang chuyển hướng vào tài khoản...`);
        
        setTimeout(function() {
            window.location.href = 'taikhoan.html'; 
        }, 2000);
        
    }, 3000); 
}

if (btnFacebook) {
    btnFacebook.addEventListener('click', function(e) {
        e.preventDefault();
        simulateSocialLogin('https://www.facebook.com/login.php', 'Facebook Login', 'Facebook');
    });
}

if (btnGoogle) {
    btnGoogle.addEventListener('click', function(e) {
        e.preventDefault();
        simulateSocialLogin('https://accounts.google.com/signin', 'Google Login', 'Google');
    });
}
