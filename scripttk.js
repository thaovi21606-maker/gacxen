// --- HÀM CHUYỂN ĐỔI NỘI DUNG CÁC TAB ---
function switchTab(event, tabId) {
    if (event) event.preventDefault();
    const menuItems = document.querySelectorAll('.account-menu li');
    menuItems.forEach(item => item.classList.remove('active'));

    if (event) {
        event.currentTarget.classList.add('active');
    } else {
        const activeLink = document.querySelector(`a[onclick*="${tabId}"]`);
        if (activeLink) activeLink.parentElement.classList.add('active');
    }

    const tabContents = document.querySelectorAll('.acc-tab');
    tabContents.forEach(tab => tab.classList.remove('active'));

    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');

    sessionStorage.setItem('gacxen_activeTab', tabId);
}

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. KHÔI PHỤC TAB TRƯỚC ĐÓ 
    const savedTab = sessionStorage.getItem('gacxen_activeTab');
    if (savedTab) {
        switchTab(null, savedTab);
    }

    // 2. KIỂM TRA QUYỀN TRUY CẬP
    const savedUser = localStorage.getItem('gacxen_currentUser');
    if(!savedUser) {
        window.location.href = 'dangnhap.html';
        return; 
    }
    const currentUser = JSON.parse(savedUser);

    // 3. ĐỔ DỮ LIỆU RA CÁC FORM
    if (document.getElementById('profLastName')) {
        document.getElementById('profLastName').value = currentUser.lastName || '';
        document.getElementById('profFirstName').value = currentUser.firstName || '';
        document.getElementById('profPhone').value = currentUser.phone || '';
        document.getElementById('profEmail').value = currentUser.email || '';
        
        if (currentUser.gender) {
            const genderRadio = document.querySelector(`input[name="gender"][value="${currentUser.gender}"]`);
            if (genderRadio) genderRadio.checked = true;
        }

        if (document.getElementById('profDay')) {
            document.getElementById('profDay').value = currentUser.dobDay || '';
            document.getElementById('profMonth').value = currentUser.dobMonth || '';
            document.getElementById('profYear').value = currentUser.dobYear || '';
        }
        
        document.getElementById('profEmail').setAttribute('readonly', true);
        document.getElementById('profEmail').style.backgroundColor = '#f0f0f0';
    }

    // Đổ dữ liệu Sổ địa chỉ 
    if (document.getElementById('addrFirstName') && currentUser.address) {
        if (document.getElementById('addrLastName')) 
            document.getElementById('addrLastName').value = currentUser.address.lastName || '';
            
        document.getElementById('addrFirstName').value = currentUser.address.firstName || currentUser.address.name || '';
        
        if(document.getElementById('addrPhone')) 
            document.getElementById('addrPhone').value = currentUser.address.phone || '';
        
        if(document.getElementById('addrCity')) 
            document.getElementById('addrCity').value = currentUser.address.city || '';
            
        if(document.getElementById('addrDistrict')) 
            document.getElementById('addrDistrict').value = currentUser.address.district || '';
            
        if(document.getElementById('addrWard')) 
            document.getElementById('addrWard').value = currentUser.address.ward || '';
            
        if(document.getElementById('addrDetail')) 
            document.getElementById('addrDetail').value = currentUser.address.detail || '';
    }

    const userLevelDiv = document.querySelector('.user-level');
    if(userLevelDiv) {
        userLevelDiv.innerHTML = `<strong style="color: #333; font-size: 16px;">${currentUser.lastName || ''} ${currentUser.firstName || ''}</strong><br>Thành viên Bạc`;
    }

    // ==========================================
    // SỰ KIỆN ĐĂNG XUẤT (Đã sửa lỗi hỏi 2 lần & nhảy về trang chủ)
    // ==========================================
   // ==========================================
// SỰ KIỆN ĐĂNG XUẤT (Sửa lỗi không xóa dữ liệu)
// ==========================================
// SỰ KIỆN ĐĂNG XUẤT CỰC MẠNH (XÓA SẠCH DẤU VẾT)
// ==========================================
const btnLogout = document.getElementById('btnRealLogout');
if (btnLogout) {
    // Dùng 'true' ở cuối để bắt sự kiện trước tất cả các file khác
    btnLogout.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); 
        
        if(confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
            // 1. Xóa thông tin đăng nhập
            localStorage.removeItem('gacxen_currentUser');
            sessionStorage.removeItem('gacxen_activeTab');

            // 2. DỌN SẠCH RÁC: Xóa luôn các biến dữ liệu chung CŨ (Thủ phạm gây hiện số 2, số 3)
            localStorage.removeItem('gacxen_cart');
            localStorage.removeItem('gacxen_favorites');
            
            // 3. Ép số trên giao diện về 0 ngay tắp lự
            document.querySelectorAll('.cart-count').forEach(function(el) {
                el.innerText = '0';
            });

            // 4. Bắt buộc nhảy về trang đăng nhập
// 4. Chuyển về trang chủ
window.location.replace('homepage.html');        }
    }, true); 
}
    // ==========================================
    // HÀM HIỂN THỊ CHỮ ĐỎ
    // ==========================================
    function showError(id, show, isValidStatus) {
        const errorElement = document.getElementById(id);
        if (errorElement) errorElement.style.display = show ? 'block' : 'none';
        if (show) return false; 
        return isValidStatus;
    }

    // ==========================================
    // 4. XỬ LÝ LƯU HỒ SƠ 
    // ==========================================
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            const lastName = document.getElementById('profLastName').value.trim();
            isValid = showError('errProfLastName', lastName === "", isValid);

            const firstName = document.getElementById('profFirstName').value.trim();
            isValid = showError('errProfFirstName', firstName === "", isValid);
            
            const phone = document.getElementById('profPhone').value.trim();
            const phoneRegex = /^(02|03|05|07|08|09)[0-9]{8}$/;
            isValid = showError('errProfPhone', !phoneRegex.test(phone), isValid);

            try {
                const dayStr = document.getElementById('profDay')?.value.trim();
                const monthStr = document.getElementById('profMonth')?.value.trim();
                const yearStr = document.getElementById('profYear')?.value.trim();
                
                if (dayStr || monthStr || yearStr) {
                    const day = parseInt(dayStr);
                    const month = parseInt(monthStr);
                    const year = parseInt(yearStr);
                    const currentYear = new Date().getFullYear();

                    let dobInvalid = false;
                    if (isNaN(day) || day < 1 || day > 31) dobInvalid = true;
                    if (isNaN(month) || month < 1 || month > 12) dobInvalid = true;
                    if (isNaN(year) || year < 1900 || year > currentYear) dobInvalid = true;
                    
                    isValid = showError('errProfDob', dobInvalid, isValid);
                }
            } catch(e) {}

            if (!isValid) return; 

            currentUser.lastName = lastName;
            currentUser.firstName = firstName;
            currentUser.phone = phone;
            currentUser.gender = document.querySelector('input[name="gender"]:checked')?.value;
            currentUser.dobDay = document.getElementById('profDay').value.trim();
            currentUser.dobMonth = document.getElementById('profMonth').value.trim();
            currentUser.dobYear = document.getElementById('profYear').value.trim();

            localStorage.setItem('gacxen_currentUser', JSON.stringify(currentUser));
            
            let users = JSON.parse(localStorage.getItem('gacxen_users')) || [];
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            if(userIndex !== -1) {
                users[userIndex] = currentUser;
                localStorage.setItem('gacxen_users', JSON.stringify(users));
            }

            alert("Cập nhật hồ sơ cá nhân thành công!");
            setTimeout(function() {
                window.location.reload(); 
            }, 1500);
        });
    }

    // ==========================================
    // 5. XỬ LÝ ĐỔI MẬT KHẨU
    // ==========================================
    // ==========================================
    // 5. XỬ LÝ ĐỔI MẬT KHẨU (Đã tích hợp chặn mạng xã hội)
    // ==========================================
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        // KIỂM TRA: NẾU LÀ TÀI KHOẢN FACEBOOK/GOOGLE THÌ ẨN FORM ĐI
        if (currentUser.password === 'SocialLogin_NoPassword_123!') {
            passwordForm.innerHTML = `
                <div style="text-align: center; padding: 50px 20px; background: #fffcfd; border-radius: 8px; border: 1px dashed #f65385;">
                    <i class="fas fa-shield-alt" style="font-size: 45px; color: #f65385; margin-bottom: 15px;"></i>
                    <h3 style="color: #333; margin-bottom: 10px; font-size: 18px;">Tài khoản liên kết mạng xã hội</h3>
                    <p style="color: #666; line-height: 1.6; font-size: 15px;">
                        Bạn đang đăng nhập bằng tài khoản Facebook hoặc Google.<br>
                        Độ bảo mật của bạn đang được quản lý bởi nền tảng đó nên không cần (và không thể) đổi mật khẩu tại đây.
                    </p>
                </div>
            `;
        } 
        // NẾU LÀ TÀI KHOẢN ĐĂNG KÝ BÌNH THƯỜNG THÌ CHO ĐỔI PASS NHƯ CŨ
        else {
            passwordForm.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;

                const currentPass = document.getElementById('currentPassword').value;
                isValid = showError('errCurrentPassword', currentPass === "", isValid);

                const newPass = document.getElementById('newPassword').value;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
                isValid = showError('errNewPassword', !passwordRegex.test(newPass), isValid);

                const confirmPass = document.getElementById('confirmNewPassword').value;
                isValid = showError('errConfirmNewPassword', confirmPass === "" || confirmPass !== newPass, isValid);

                if (!isValid) return;

                if (currentPass !== currentUser.password) {
                    alert("Mật khẩu hiện tại không đúng!");
                    return;
                }

                currentUser.password = newPass;
                localStorage.setItem('gacxen_currentUser', JSON.stringify(currentUser));
                
                let users = JSON.parse(localStorage.getItem('gacxen_users')) || [];
                const userIndex = users.findIndex(u => u.email === currentUser.email);
                if(userIndex !== -1) {
                    users[userIndex].password = newPass;
                    localStorage.setItem('gacxen_users', JSON.stringify(users));
                }

                alert("Đổi mật khẩu thành công!");
                setTimeout(function() {
                    passwordForm.reset(); 
                }, 1500);
            });
        }
    }

    // ==========================================
    // 6. XỬ LÝ SỔ ĐỊA CHỈ
    // ==========================================
    const addressForm = document.getElementById('addressForm');
    if (addressForm) {
        addressForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            let isValid = true;

            const lastNameInput = document.getElementById('addrLastName');
            if (lastNameInput) isValid = showError('errAddrLastName', lastNameInput.value.trim() === "", isValid);

            const firstNameInput = document.getElementById('addrFirstName');
            if (firstNameInput) isValid = showError('errAddrFirstName', firstNameInput.value.trim() === "", isValid);

            const phoneInput = document.getElementById('addrPhone');
            if (phoneInput) {
                const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
                isValid = showError('errAddrPhone', !phoneRegex.test(phoneInput.value.trim()), isValid);
            }

            const city = document.getElementById('addrCity');
            if (city) isValid = showError('errAddrCity', city.value === "", isValid);

            const district = document.getElementById('addrDistrict');
            if (district) isValid = showError('errAddrDistrict', district.value.trim() === "", isValid);

            const ward = document.getElementById('addrWard');
            if (ward) isValid = showError('errAddrWard', ward.value.trim() === "", isValid);

            const detail = document.getElementById('addrDetail');
            if (detail) isValid = showError('errAddrDetail', detail.value.trim() === "", isValid);

            if (!isValid) return;

            currentUser.address = {
                lastName: lastNameInput ? lastNameInput.value.trim() : '',
                firstName: firstNameInput ? firstNameInput.value.trim() : '',
                phone: phoneInput ? phoneInput.value.trim() : '',
                city: city ? city.value : '',
                district: district ? district.value : '',
                ward: ward ? ward.value : '',
                detail: detail ? detail.value : ''
            };

            localStorage.setItem('gacxen_currentUser', JSON.stringify(currentUser));
            
            let users = JSON.parse(localStorage.getItem('gacxen_users')) || [];
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            if(userIndex !== -1) {
                users[userIndex].address = currentUser.address;
                localStorage.setItem('gacxen_users', JSON.stringify(users));
            }

            alert("Lưu địa chỉ thành công!");
        });
    }
});

// ==========================================
// CÁC HÀM TIỆN ÍCH DƯỚI CÙNG GIỮ NGUYÊN
// ==========================================
function switchTier(event, tierId) {
    const tierButtons = document.querySelectorAll('.tier-tabs .tier');
    tierButtons.forEach(btn => btn.classList.remove('active'));

    event.currentTarget.classList.add('active');

    const tierContents = document.querySelectorAll('.tier-content');
    tierContents.forEach(content => content.classList.remove('active'));

    const targetTier = document.getElementById(tierId);
    if (targetTier) targetTier.classList.add('active');
}

function copyVoucher(buttonElement) {
    const card = buttonElement.closest('.voucher-card');
    const codeText = card.querySelector('.code-text').innerText;

    navigator.clipboard.writeText(codeText).then(function() {
        const originalText = buttonElement.innerText;
        buttonElement.innerText = "Đã copy";
        buttonElement.classList.add("copied");

        setTimeout(() => {
            buttonElement.innerText = originalText;
            buttonElement.classList.remove("copied");
        }, 2000);
    }).catch(function(err) {
        console.error('Không thể copy: ', err);
    });
}

function switchVoucherTab(event, tabId) {
    const tabBtns = document.querySelectorAll('.voucher-tabs span');
    tabBtns.forEach(btn => btn.classList.remove('active'));

    event.currentTarget.classList.add('active');

    const tabContents = document.querySelectorAll('.v-tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    const target = document.getElementById(tabId);
    if(target) target.classList.add('active');
}