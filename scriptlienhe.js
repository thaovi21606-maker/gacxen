// =========================================
    // XỬ LÝ FORM LIÊN HỆ (GỬI LỜI NHẮN)
    // =========================================
    const contactForm = document.getElementById('contactForm');
    const btnSubmitContact = document.getElementById('btnSubmitContact');

    if (contactForm && btnSubmitContact) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn trình duyệt tự tải lại trang khi bấm submit

            // 1. Đổi giao diện nút thành "Đang gửi đi..."
            const originalText = btnSubmitContact.innerText;
            btnSubmitContact.innerText = 'Đang gửi đi...';
            btnSubmitContact.classList.add('sending'); // Thêm class CSS để khóa hiệu ứng hover

            // 2. Giả lập thời gian server xử lý gửi email (chờ khoảng 1.5 giây)
            setTimeout(() => {
                // Trả lại giao diện nút như cũ
                btnSubmitContact.innerText = originalText;
                btnSubmitContact.classList.remove('sending');

                // Bật thông báo thành công
                alert('💖 Cảm ơn bạn! Lời nhắn của bạn đã được gửi đến Gác Xen thành công. Chúng mình sẽ phản hồi sớm nhất nhé!');
                
                // Xóa trắng các ô thông tin trong form để khách có thể điền lại nếu muốn
                contactForm.reset();
            }, 1500);
        });
    }
// 3. TRẠNG THÁI TÀI KHOẢN HEADER
    // =========================================
    const btnAccount = document.getElementById('btn-account-header');
    const submenu = document.getElementById('accountSubmenu');
    const savedUser = localStorage.getItem('gacxen_currentUser');

    if (btnAccount) {
        if (savedUser) {
            const currentUser = JSON.parse(savedUser);
            const fullName = `${currentUser.lastName} ${currentUser.firstName}`;
            const avatarSrc = currentUser.avatar || '../img/tk.png'; 
            
            btnAccount.innerHTML = `
                <img src="${avatarSrc}" alt="Avatar" style="width: 25px; height: 25px; border-radius: 50%; object-fit: cover; vertical-align: middle; margin-right: 5px;">
                <span style="font-weight: bold; font-size: 14px;">${fullName}</span>
            `;
            btnAccount.href = "taikhoan.html";
            if (submenu) submenu.remove(); // Ẩn menu Đăng nhập/Đăng ký
        } else {
            btnAccount.href = "dangnhap.html";
        }
    }