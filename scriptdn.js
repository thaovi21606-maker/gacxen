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

// Xử lý Validation và Đăng Nhập
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    let isValid = true;

    function showError(id, show) {
        document.getElementById(id).style.display = show ? 'block' : 'none';
        if(show) isValid = false;
    }

    const email = document.getElementById('loginEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    showError('loginEmailError', !emailRegex.test(email));

    const password = document.getElementById('loginPassword').value;
    showError('loginPasswordError', password === "");

    if (isValid) {
        let users = JSON.parse(localStorage.getItem('gacxen_users')) || [];
        const matchedUser = users.find(u => u.email === email && u.password === password);

        if (matchedUser) {
            localStorage.setItem('gacxen_currentUser', JSON.stringify(matchedUser));
            
            // BẬT THÔNG BÁO XỊN CỦA BẠN LÊN
            alert("Đăng nhập thành công! Đang chuyển đến trang Tài khoản...");
            
            // ĐỢI 2 GIÂY RỒI CHUYỂN TRANG
            setTimeout(function() {
                window.location.href = 'taikhoan.html'; 
            }, 2000);

        } else {
            alert("Email hoặc mật khẩu không chính xác! Hoặc tài khoản chưa được đăng ký.");
        }
    }
});

// Xử lý tính năng QUÊN MẬT KHẨU
document.getElementById('forgotPasswordLink').addEventListener('click', function(e) {
    e.preventDefault();
    const emailToReset = prompt("Vui lòng nhập email của bạn để lấy lại mật khẩu:");
    if (emailToReset) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailToReset)) {
            alert(`Một đường link khôi phục mật khẩu đã được gửi đến email: ${emailToReset}. Vui lòng kiểm tra hộp thư!`);
        } else {
            alert("Email không đúng định dạng. Vui lòng thử lại!");
        }
    }
});

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

        // TẠO TÀI KHOẢN MỚI 100% MỖI LẦN CLICK ĐỂ TEST DỮ LIỆU ĐỘC LẬP
        const dummyUser = {
            firstName: 'Khách',
            lastName: providerName,
            email: `user${Date.now()}@${providerName.toLowerCase()}.com`,
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
