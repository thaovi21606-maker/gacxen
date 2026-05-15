// Kiểm tra ngay lập tức trước khi tải trang, nếu đã xem thì gắn cờ 'skip-intro'
        if (sessionStorage.getItem('introPlayed')) {
            document.documentElement.classList.add('skip-intro');
        }



// 1. Mở - Đóng thanh tìm kiếm bên hông
window.openSearch = function() {
    document.getElementById("searchSidebar")?.classList.add("active");
    document.getElementById("searchOverlay")?.classList.add("active");
}
window.closeSearch = function() {
    document.getElementById("searchSidebar")?.classList.remove("active");
    document.getElementById("searchOverlay")?.classList.remove("active");
}
document.getElementById("searchOverlay")?.addEventListener("click", closeSearch);

// 2. Trượt ngang Widget Sản Phẩm
let isAnimating = false;
window.slideRight = function(id) {
    if (isAnimating) return;
    const slider = document.getElementById(id + '-slider');
    if (!slider) return;
    isAnimating = true;
    const firstCard = slider.firstElementChild;
    const amount = firstCard.offsetWidth + 16; 
    slider.style.transition = 'transform 0.4s ease-in-out';
    slider.style.transform = `translateX(-${amount}px)`;
    setTimeout(() => {
        slider.style.transition = 'none';
        slider.style.transform = 'translateX(0)';
        slider.appendChild(firstCard);
        isAnimating = false;
    }, 400);
}

window.slideLeft = function(id) {
    if (isAnimating) return;
    const slider = document.getElementById(id + '-slider');
    if (!slider) return;
    isAnimating = true;
    const lastCard = slider.lastElementChild;
    const amount = lastCard.offsetWidth + 16;
    slider.style.transition = 'none';
    slider.prepend(lastCard);
    slider.style.transform = `translateX(-${amount}px)`;
    setTimeout(() => {
        slider.style.transition = 'transform 0.4s ease-in-out';
        slider.style.transform = 'translateX(0)';
    }, 20);
    setTimeout(() => { isAnimating = false; }, 420);
}

// Ẩn/Hiện mũi tên trượt Widget
window.showArrows = function(id) {
    const left = document.getElementById('btn-left-' + id);
    const right = document.getElementById('btn-right-' + id);
    if(left) left.style.display = 'flex';
    if(right) right.style.display = 'flex';
}
window.hideArrows = function(id) {
    const left = document.getElementById('btn-left-' + id);
    const right = document.getElementById('btn-right-' + id);
    if(left) left.style.display = 'none';
    if(right) right.style.display = 'none';
}

// 3. Đóng Popup Quảng Cáo
window.closePopup = function() {
    const popup = document.getElementById('adPopup');
    if (popup) { popup.style.display = 'none'; document.body.style.overflow = 'auto'; }
}

// 4. Lọc Sản Phẩm Flash Sale
window.showFlashSale = function() {
    const items = document.querySelectorAll('.shop-item');
    const title = document.getElementById("bannerTitle");
    if (title) title.innerText = "Flash Sale 🔥";
    items.forEach(item => {
        const discount = item.querySelector('.discount-badge');
        item.style.display = discount ? 'block' : 'none';
    });
}

// 5. Cập nhật số lượng Giỏ hàng và Yêu thích trên Header
window.updateGlobalCounters = function() {
    var favs = JSON.parse(localStorage.getItem('gacxen_favorites')) || [];
    var favCountEl = document.getElementById('favCount');
    if (favCountEl) favCountEl.innerText = favs.length;

    var cart = JSON.parse(localStorage.getItem('gacxen_cart')) || [];
    var totalCartItems = 0;
    for (var i = 0; i < cart.length; i++) totalCartItems += cart[i].qty;
    var cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) cartCountEl.innerText = totalCartItems;
};

// 6. Hệ thống Thông báo Custom (Alert & Confirm)
window.showGacxenAlert = function(title, message, type = 'success', callback = null) {
    let overlay = document.getElementById('gacxen-modal-overlay') || document.createElement('div');
    overlay.id = 'gacxen-modal-overlay';
    if(!document.getElementById('gacxen-modal-overlay')) document.body.appendChild(overlay);
    
    let icons = { success: 'fa-check', error: 'fa-times', warning: 'fa-exclamation', info: 'fa-info' };
    let iconHtml = `<div class="gx-icon gx-${type}"><i class="fas ${icons[type] || 'fa-info'}"></i></div>`;

    overlay.innerHTML = `
        <div class="gx-modal-box">
            ${iconHtml}
            <h3 class="gx-modal-title">${title}</h3>
            <p class="gx-modal-desc">${message}</p>
            <button class="gx-btn-ok" id="gx-btn-ok">OK</button>
        </div>
    `;
    setTimeout(() => overlay.classList.add('active'), 10);
    document.getElementById('gx-btn-ok').onclick = () => { 
        overlay.classList.remove('active'); 
        if (callback) setTimeout(callback, 300); 
    };
};

window.showGacxenConfirm = function(title, message, onConfirm) {
    let overlay = document.getElementById('gacxen-modal-overlay') || document.createElement('div');
    overlay.id = 'gacxen-modal-overlay';
    if(!document.getElementById('gacxen-modal-overlay')) document.body.appendChild(overlay);

    overlay.innerHTML = `
        <div class="gx-modal-box">
            <div class="gx-icon gx-warning"><i class="fas fa-question"></i></div>
            <h3 class="gx-modal-title">${title}</h3>
            <p class="gx-modal-desc">${message}</p>
            <div class="gx-btn-group">
                <button class="gx-btn-cancel" id="gx-btn-cancel">Hủy</button>
                <button class="gx-btn-confirm" id="gx-btn-confirm">Đồng ý</button>
            </div>
        </div>
    `;
    setTimeout(() => overlay.classList.add('active'), 10);
    document.getElementById('gx-btn-cancel').onclick = () => overlay.classList.remove('active');
    document.getElementById('gx-btn-confirm').onclick = () => {
        overlay.classList.remove('active');
        setTimeout(() => { if (onConfirm) onConfirm(); }, 300);
    };
};

// GHI ĐÈ HÀM ALERT MẶC ĐỊNH
window.alert = function(message) {
    let type = 'info', title = 'THÔNG BÁO', msgStr = String(message).toLowerCase();
    if(msgStr.includes('thành công') || msgStr.includes('cảm ơn') || message.includes('✅')) { type = 'success'; title = 'THÀNH CÔNG!'; } 
    else if(msgStr.includes('lỗi') || msgStr.includes('trống') || msgStr.includes('không hợp lệ') || message.includes('❌') || msgStr.includes('không tìm thấy')) { type = 'error'; title = 'CẢNH BÁO!'; } 
    else if(msgStr.includes('vui lòng')) { type = 'warning'; title = 'LƯU Ý!'; }
    
    let cleanMsg = message.replace(/[✅❌🎉🔒]/g, '').trim();
    showGacxenAlert(title, cleanMsg, type);
};


// ===================================================================
// PHẦN 2: THỰC THI GIAO DIỆN KHI TRANG TẢI XONG (DOM LOADED)
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {

    // Khởi tạo bộ đếm Giỏ hàng & Yêu thích ngay khi load
    window.updateGlobalCounters();

    // =========================================
    // 1. DATA VÀ LOGIC TÌM KIẾM CHUẨN
    // =========================================
    const books = [
        { name: "Thư cho em", link: "product-detail.html?id=vh1" },
        { name: "Vì cậu là bạn nhỏ của tớ", link: "product-detail.html?id=vh2" },
        { name: "Vòng tay học trò", link: "product-detail.html?id=vh3" },
        { name: "Vui vẻ không quạu nha", link: "product-detail.html?id=vh4" },
        { name: "Phải lòng với cô đơn", link: "product-detail.html?id=vh5" },
        { name: "Cuộc đời ngắn lắm đừng ôm muộn phiền", link: "product-detail.html?id=vh6" },
        { name: "Combo tối ưu lợi nhuận và doanh thu", link: "product-detail.html?id=sp1" },
        { name: "Nhân dân quyền lực và lợi nhuận", link: "product-detail.html?id=sp2" },
        { name: "Combo chiến lược Marketing Công Nghệ", link: "product-detail.html?id=sp3" },
        { name: "Combo Tư Duy Kiếm Tiền", link: "product-detail.html?id=sp4" },
        { name: "Tinh Thần Nghiệp Chủ", link: "product-detail.html?id=sp5" },
        { name: "Tài chính doanh nghiệp", link: "product-detail.html?id=sp6" },
        { name: "Tư duy nhanh và chậm", link: "product-detail.html?id=tl1" },
        { name: "Thuật ngữ tâm lý học Anh - Việt - Đức - Pháp", link: "product-detail.html?id=tl2" },
        { name: "Liệu pháp tâm lý trị liệu chiến lược", link: "product-detail.html?id=tl3" },
        { name: "Flashcard tư duy lãnh đạo", link: "product-detail.html?id=tl4" },
        { name: "Tư duy phản biện như một luật sư", link: "product-detail.html?id=tl5" },
        { name: "Combo liệu pháp tâm hồn lấp đầy trống rỗng", link: "product-detail.html?id=tl6" },
        { name: "Sự ra đời trí khôn ở trẻ em", link: "product-detail.html?id=kh1" },
        { name: "Triết học của giáo dục", link: "product-detail.html?id=kh2" },
        { name: "1000 bộ não - Lý thuyết mới về trí tuệ con người", link: "product-detail.html?id=kh3" },
        { name: "Một góc nhìn về tiến hóa văn hóa", link: "product-detail.html?id=kh4" },
        { name: "Xây dựng trường học hạnh phúc", link: "product-detail.html?id=kh5" },
        { name: "Hồi ký người thầy xây trường hạnh phúc", link: "product-detail.html?id=kh6" }
    ];

    const sidebarSearchInput = document.getElementById("searchInput");
    const suggestionsBox = document.getElementById("searchSuggestions");
    const sidebarSearchFormEl = document.getElementById("sidebarSearchForm");

    // Xử lý gợi ý trực tiếp (Live Search)
    if (sidebarSearchInput && suggestionsBox) {
        sidebarSearchInput.addEventListener("input", function() {
            const keyword = this.value.toLowerCase().trim();
            suggestionsBox.innerHTML = ""; 
            if (keyword === "") { suggestionsBox.style.display = "none"; return; }
            
            const filteredBooks = books.filter(book => book.name.toLowerCase().includes(keyword));
            if (filteredBooks.length === 0) { suggestionsBox.style.display = "none"; return; }
            
            filteredBooks.forEach(book => {
                const item = document.createElement("div");
                item.classList.add("suggest-item");
                item.innerHTML = `<i class="fas fa-search" style="color: #999; margin-right: 8px;"></i> ${book.name}`;
                item.onclick = () => window.location.href = book.link;
                suggestionsBox.appendChild(item);
            });
            suggestionsBox.style.display = "block";
        });
    }

  // Nhấn Enter tại form Sidebar
if (sidebarSearchFormEl) {
    sidebarSearchFormEl.addEventListener("submit", function(e) {
        e.preventDefault();

        const keyword = sidebarSearchInput.value.toLowerCase().trim();

        if (!keyword) {
            alert("Vui lòng nhập tên sách bạn muốn tìm!");
            return;
        }

        // Lấy tất cả sản phẩm
        const items = document.querySelectorAll(".shop-item");

        let found = false;

        items.forEach(item => {
            const productName = item
                .querySelector("h3")
                .innerText
                .toLowerCase();

            if (productName.includes(keyword)) {
                item.style.display = "block";
                found = true;
            } else {
                item.style.display = "none";
            }
        });

        // Nếu không tìm thấy
        if (!found) {
            alert("Không tìm thấy sản phẩm!");
        }

        // Đóng sidebar sau khi tìm
        closeSearch();
    });
}

    // Nhấn form Header -> Tự động mở Sidebar
    const headerSearchForm = document.getElementById('searchForm');
    if (headerSearchForm) {
        headerSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.openSearch();
        });
    }

    // =========================================
    // 2. XỬ LÝ MÀN HÌNH CHỜ (INTRO VIP 3D VŨ TRỤ) - ĐÃ FIX THỜI GIAN
    // =========================================
    function handleIntroLoader() {
        const loader = document.getElementById('intro-loader');
        const loadFill = document.getElementById('load-fill-vip');
        const loadCount = document.getElementById('load-count-vip');
        if (!loader) return;

        const introPlayed = sessionStorage.getItem('introPlayed');

        if (!introPlayed) {
            const duration = 4500; // Thời gian load là 4.5 giây
            const startTime = Date.now(); // Lấy mốc thời gian thực tế để đếm

            const timer = setInterval(() => {
                const elapsed = Date.now() - startTime;
                let progress = (elapsed / duration) * 100;

                // KHI THANH CHẠY TỚI 100%
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(timer); // Dừng bộ đếm

                    // Ép hiển thị 100%
                    if(loadFill) loadFill.style.width = '100%';
                    if(loadCount) loadCount.innerText = '100%';

                    // CHỜ ĐÚNG 0.6 GIÂY SAU KHI ĐẠT 100% RỒI MỚI CHUYỂN TRANG
                    setTimeout(() => {
                        loader.classList.add('exit-vip'); // Bật hiệu ứng nổ tung
                        
                        setTimeout(() => {
                            loader.style.display = 'none';
                            sessionStorage.setItem('introPlayed', 'true');
                        }, 1200); // Chờ 1.2s cho hiệu ứng bay hơi kết thúc
                        
                    }, 600); 

                } else {
                    // Khi đang chạy
                    if(loadFill) loadFill.style.width = progress + '%';
                    if(loadCount) loadCount.innerText = Math.floor(progress) + '%';
                }
            }, 20); // 20ms update 1 lần cho siêu mượt
        } else {
            loader.style.display = 'none';
        }
    }
    handleIntroLoader();

    // =========================================
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

    // =========================================
    // 4. ACTIVE MENU THEO TRANG
    // =========================================
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-menu > li > a').forEach(item => {
        item.classList.remove('active');
        if (currentPath === item.getAttribute('href') || (currentPath === '' && item.getAttribute('href') === 'homepage.html')) {
            item.classList.add('active');
        }
    });

    // =========================================
    // 5. ĐĂNG KÝ NHẬN TIN TỨC (NEWSLETTER)
    // =========================================
    const btnSubscribe = document.getElementById('btnSubscribe');
    const btnUnsubscribe = document.getElementById('btnUnsubscribe');
    const emailInput = document.getElementById('emailInput');
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    let subscribedEmails = JSON.parse(localStorage.getItem('gacxen_emails')) || [];

    if (btnSubscribe) {
        btnSubscribe.addEventListener('click', () => {
            const email = emailInput.value.trim();
            if (!email) { alert('Vui lòng nhập địa chỉ email!'); return; }
            if (!isValidEmail(email)) { alert('Email không hợp lệ!'); return; }
            
            if (subscribedEmails.includes(email)) { 
                alert(`⚠️ Email "${email}" đã được đăng ký trước đó!`); 
            } else {
                subscribedEmails.push(email);
                localStorage.setItem('gacxen_emails', JSON.stringify(subscribedEmails));
                alert(`🎉 ĐĂNG KÝ THÀNH CÔNG!`);
                emailInput.value = '';
            }
        });
    }

    if (btnUnsubscribe) {
        btnUnsubscribe.addEventListener('click', () => {
            const email = emailInput.value.trim();
            if (!email) { alert('Vui lòng nhập email muốn hủy!'); return; }
            
            if (subscribedEmails.includes(email)) {
                if (confirm(`Hủy đăng ký cho email: ${email}?`)) {
                    subscribedEmails = subscribedEmails.filter(item => item !== email);
                    localStorage.setItem('gacxen_emails', JSON.stringify(subscribedEmails));
                    alert(`✅ ĐÃ HỦY ĐĂNG KÝ!`);
                    emailInput.value = '';
                }
            } else { alert(`❌ Email chưa từng đăng ký!`); }
        });
    }

    // =========================================
    // 6. BANNER SLIDER TRANG CHỦ
    // =========================================
    const mainSlider = document.getElementById('bannerSlider');
    const mainSlides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (mainSlider && mainSlides.length > 0) {
        let idx = 0;
        
        function updateMainSlider() {
            mainSlider.style.transform = `translateX(-${idx * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            if(dots[idx]) dots[idx].classList.add('active');
        }
        function nextMainSlide() { idx = (idx + 1) % mainSlides.length; updateMainSlider(); }
        function prevMainSlide() { idx = (idx - 1 + mainSlides.length) % mainSlides.length; updateMainSlider(); }

        let autoSlide = setInterval(nextMainSlide, 4000);

        if (nextBtn) nextBtn.addEventListener('click', () => { nextMainSlide(); clearInterval(autoSlide); autoSlide = setInterval(nextMainSlide, 4000); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevMainSlide(); clearInterval(autoSlide); autoSlide = setInterval(nextMainSlide, 4000); });
        
        dots.forEach((dot, dIdx) => {
            dot.addEventListener('click', () => { idx = dIdx; updateMainSlider(); clearInterval(autoSlide); autoSlide = setInterval(nextMainSlide, 4000); });
        });
    }

    // =========================================
    // 7. POPUP QUẢNG CÁO TỰ ĐỘNG (CHỈ HIỆN 1 LẦN)
    // =========================================
    setTimeout(() => {
        const popup = document.getElementById('adPopup');
        
        // Kiểm tra xem trong phiên làm việc này đã hiện popup chưa
        const popupPlayed = sessionStorage.getItem('popupPlayed');

        // Nếu popup tồn tại trên trang VÀ chưa từng hiện thì mới cho hiện
        if (popup && !popupPlayed) {
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Đánh dấu là đã hiện rồi để lần sau không nhảy lên nữa
            sessionStorage.setItem('popupPlayed', 'true');
        }
    }, 6000);

    // Click ra ngoài để đóng popup
    window.addEventListener('click', (e) => {
        const popup = document.getElementById('adPopup');
        if (e.target === popup) window.closePopup();
    });

    // =========================================
    // 8. ĐẾM NGƯỢC FLASH SALE
    // =========================================
    if (document.getElementById("hours")) {
        let endTime = localStorage.getItem("flashsale_end");
        if (!endTime) {
            endTime = new Date().getTime() + 10800 * 1000;
            localStorage.setItem("flashsale_end", endTime);
        } else {
            endTime = parseInt(endTime);
        }

        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = endTime - now;
            if (timeLeft <= 0) {
                localStorage.setItem("flashsale_end", new Date().getTime() + 10800 * 1000);
                location.reload();
                return;
            }

            const countdownEl = document.querySelector(".countdown");
            if (timeLeft < 600000 && countdownEl) countdownEl.style.color = "red";

            let h = Math.floor(timeLeft / (1000 * 60 * 60));
            let m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            let s = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById("hours").innerText = String(h).padStart(2, '0');
            document.getElementById("minutes").innerText = String(m).padStart(2, '0');
            document.getElementById("seconds").innerText = String(s).padStart(2, '0');
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // =========================================
    // 9. SẮP XẾP SẢN PHẨM THEO LỌC TÊN / GIÁ
    // =========================================
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
        const list = document.getElementById("shop-list");
        if(list) {
            const originalItems = Array.from(list.getElementsByClassName("shop-item"));
            sortSelect.addEventListener("change", function () {
                const value = this.value;
                let items = Array.from(list.getElementsByClassName("shop-item"));

                if (value === "default") {
                    list.innerHTML = "";
                    originalItems.forEach(item => list.appendChild(item));
                    return;
                }

                items.sort((a, b) => {
                    const nameA = a.querySelector("h3").innerText.toLowerCase();
                    const nameB = b.querySelector("h3").innerText.toLowerCase();
                    const priceA = parseInt(a.querySelector(".shop-price").innerText.replace(/\D/g, ""));
                    const priceB = parseInt(b.querySelector(".shop-price").innerText.replace(/\D/g, ""));

                    if (value === "name-asc") return nameA.localeCompare(nameB);
                    if (value === "name-desc") return nameB.localeCompare(nameA);
                    if (value === "price-asc") return priceA - priceB;
                    if (value === "price-desc") return priceB - priceA;
                    return 0;
                });

                list.innerHTML = "";
                items.forEach(item => list.appendChild(item));
            });
        }
    }
});





// ==========================================
// GOOGLE TRANSLATE - FIX TRIỆT ĐỂ LỖI NGẮT DỊCH
// ==========================================

// 1. ĐỒNG BỘ COOKIE NGAY LẬP TỨC TRƯỚC KHI TRANG LOAD XONG
// (Đảm bảo Google tự động nhận diện tiếng Anh từ trong trứng nước)
(function syncLanguageCookie() {
    const savedLang = localStorage.getItem("siteLang") || 'vi';
    if (savedLang === 'en') {
        document.cookie = "googtrans=/vi/en; path=/";
        if (window.location.hostname) {
            document.cookie = `googtrans=/vi/en; domain=${window.location.hostname}; path=/`;
        }
    } else {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        if (window.location.hostname) {
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
        }
    }
})();

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'vi',
        includedLanguages: 'en,vi',
        autoDisplay: false
    }, 'google_translate_element');
}

function changeLanguage(lang) {
    localStorage.setItem("siteLang", lang);
    
    // Cập nhật lại cookie tức thời khi user bấm nút
    if (lang === 'en') {
        document.cookie = "googtrans=/vi/en; path=/";
    } else {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    applyTranslation(lang);
    updateFlagUI(lang);
}

// 2. HÀM ÉP DỊCH THÔNG MINH HƠN (Chống click hụt)
function applyTranslation(lang) {
    let attempts = 0;
    const checkExist = setInterval(function() {
        const select = document.querySelector(".goog-te-combo");
        
        // QUAN TRỌNG: Phải đợi thẻ select được Google nạp xong các thẻ <option> mới thao tác
        if (select && select.options && select.options.length > 0) {
            const targetValue = (lang === 'vi') ? 'vi' : 'en'; 
            
            // Kiểm tra nếu web chưa dịch thì mới giả lập sự kiện change
            if (select.value !== targetValue) {
                select.value = targetValue;
                select.dispatchEvent(new Event("change", { bubbles: true }));
            }
            clearInterval(checkExist);
        }
        
        attempts++;
        if (attempts > 50) clearInterval(checkExist); // Timeout sau 25s tránh treo trình duyệt
    }, 500);
}

// 3. TỰ ĐỘNG CHẠY PHƯƠNG ÁN DỰ PHÒNG KHI SANG TRANG MỚI
document.addEventListener("DOMContentLoaded", function() {
    const savedLang = localStorage.getItem("siteLang") || 'vi';
    
    // Nếu chạy trên Live Server thì Cookie ở bước 1 đã lo liệu.
    // Nếu chạy file:/// thì cookie bị vô hiệu, bước này sẽ kéo lại bằng LocalStorage.
    if (savedLang === 'en') {
        applyTranslation('en');
    }
    
    updateFlagUI(savedLang);
});

// 4. CẬP NHẬT GIAO DIỆN LÁ CỜ
function updateFlagUI(lang) {
    const mainFlagBtn = document.querySelector('.lang-btn');
    if (!mainFlagBtn) return;
    
    if (lang === 'en') {
        mainFlagBtn.innerHTML = '<img src="../img/en-flag.jpg" alt="EN" class="flag-icon"> <i class="fas fa-chevron-down" style="font-size: 10px;"></i>';
    } else {
        mainFlagBtn.innerHTML = '<img src="../img/vn-flag.jpg" alt="VN" class="flag-icon"> <i class="fas fa-chevron-down" style="font-size: 10px;"></i>';
    }
}
// ==========================================
// GHI ĐÈ HÀM ĐẾM SỐ CHO TOÀN BỘ WEBSITE
// ==========================================
window.updateGlobalCounters = function() {
    var userStr = localStorage.getItem('gacxen_currentUser');
    var email = userStr ? JSON.parse(userStr).email : 'guest';
    
    // Nếu chưa đăng nhập -> Ép tất cả các số trên Header về 0
    if (email === 'guest') {
        document.querySelectorAll('.cart-count').forEach(function(el) {
            el.innerText = '0';
        });
        return;
    }

    // Nếu đã đăng nhập -> Lấy đúng giỏ hàng/yêu thích của tài khoản đó
    var cart = JSON.parse(localStorage.getItem('gacxen_cart_' + email)) || [];
    var favs = JSON.parse(localStorage.getItem('gacxen_favorites_' + email)) || [];
    
    var cartCountEl = document.getElementById('cartCount');
    var favCountEl = document.getElementById('favCount');
    
    if(cartCountEl) cartCountEl.innerText = cart.length;
    if(favCountEl) favCountEl.innerText = favs.length;
};

// Chạy cập nhật số ngay khi trang vừa load xong
document.addEventListener("DOMContentLoaded", function() {
    if(typeof window.updateGlobalCounters === 'function') {
        window.updateGlobalCounters();
    }
});
// ====================================================
// BỘ VÁ LỖI XUNG ĐỘT KHO CHUNG VÀ KHO RIÊNG
// (Đảm bảo giỏ hàng và yêu thích lưu đúng vào tài khoản)
// ====================================================

// 1. Khai báo cơ chế tìm đúng "Kho riêng" cho toàn bộ web
window.getCurrentUserEmail = function() {
    var user = localStorage.getItem('gacxen_currentUser');
    return user ? JSON.parse(user).email : 'guest';
};

window.getIsolatedKey = function(baseKey) {
    return baseKey + '_' + window.getCurrentUserEmail();
};

window.requireLogin = function() {
    if (window.getCurrentUserEmail() === 'guest') {
        alert("⚠️ Bạn phải đăng nhập để thực hiện hành động này!");
        setTimeout(() => { window.location.href = 'dangnhap.html'; }, 2000);
        return false;
    }
    return true;
};

// 2. Ép số trên Header hiển thị đúng số liệu của "Kho riêng"
// 2. Ép số trên Header hiển thị đúng số liệu của "Kho riêng"
window.updateGlobalCounters = function() {
    if (window.getCurrentUserEmail() === 'guest') {
        document.querySelectorAll('.cart-count').forEach(function(el) { el.innerText = '0'; });
        return;
    }
    
    var cart = JSON.parse(localStorage.getItem(window.getIsolatedKey('gacxen_cart'))) || [];
    var favs = JSON.parse(localStorage.getItem(window.getIsolatedKey('gacxen_favorites'))) || [];
    
    var cartCountEl = document.getElementById('cartCount');
    var favCountEl = document.getElementById('favCount');
    var cartPageCountEl = document.getElementById('cartPageCount');
    
    // --- ĐOẠN CODE SỬA LỖI ĐẾM TỔNG SỐ LƯỢNG ---
    var totalItems = 0;
    for (var i = 0; i < cart.length; i++) {
        totalItems += cart[i].qty;
    }
    
    if(cartCountEl) cartCountEl.innerText = totalItems; // Đã đổi cart.length thành totalItems
    if(favCountEl) favCountEl.innerText = favs.length;
    
    // Nếu đang đứng ở trang giỏ hàng thì cập nhật luôn số kế bên chữ Giỏ hàng (2)
if(cartPageCountEl) cartPageCountEl.innerText = totalItems;
};

// 3. GHI ĐÈ HÀM THÊM VÀO GIỎ HÀNG (SỬA LỖI VÀO TRANG TRỐNG TRƠN)
// Chú ý: Nếu nút của bạn ngày xưa gọi hàm tên khác (VD: addCart, themVaoGio...), 
// thì bạn sửa chữ "addToCart" bên dưới cho khớp nhé!
window.addToCart = function(productId, qty) {
    if (!window.requireLogin()) return; // Chặn nếu chưa đăng nhập
    
    qty = qty || 1;
    var cartKey = window.getIsolatedKey('gacxen_cart'); // Trỏ đúng vào kho riêng
    var cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    var existing = cart.find(function(c) { return c.id === productId; });
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: productId, qty: qty });
    }
    
    localStorage.setItem(cartKey, JSON.stringify(cart)); // Lưu lại vào kho riêng
    window.updateGlobalCounters(); // Cập nhật lại số trên Header
    alert("✅ Đã thêm sản phẩm vào giỏ hàng của bạn!");
};

// 4. GHI ĐÈ HÀM THÊM YÊU THÍCH
window.addToFav = function(productId) {
    if (!window.requireLogin()) return;

    var favKey = window.getIsolatedKey('gacxen_favorites');
    var favs = JSON.parse(localStorage.getItem(favKey)) || [];
    
    if (!favs.includes(productId)) {
        favs.push(productId);
        localStorage.setItem(favKey, JSON.stringify(favs));
        alert("❤️ Đã thêm vào danh sách yêu thích!");
    } else {
        alert("Sản phẩm này đã có trong yêu thích!");
    }
    window.updateGlobalCounters();
};

// Luôn chạy đếm số chuẩn khi load trang
document.addEventListener("DOMContentLoaded", function() {
    window.updateGlobalCounters();
});
// =========================================================
// BỘ LỆNH GHI ĐÈ XỬ LÝ KHO RIÊNG (DÁN DƯỚI CÙNG SCRIPT.JS)
// =========================================================
// 1. Ghi đè hàm requireLogin: Dùng showGacxenAlert để CHỜ KHÁCH BẤM OK rồi mới chuyển trang
window.requireLogin = function() {
    if (window.getCurrentUserEmail() === 'guest') {
        window.showGacxenAlert(
            "THÔNG BÁO", 
            "⚠️ Bạn phải đăng nhập để thực hiện!", 
            "info", 
            function() {
                // Hành động này chỉ chạy khi khách bấm nút OK
                window.location.href = 'dangnhap.html'; 
            }
        );
        return false;
    }
    return true;
};

// 2. Ghi đè hàm Thêm Giỏ Hàng
window.addToCart = function(productId) {
    if (!window.requireLogin()) return; // Gọi hàm kiểm tra dùng chung ở trên

var qtyInput = document.getElementById('soluong');    var qty = qtyInput ? parseInt(qtyInput.value) : 1;
    if (isNaN(qty) || qty < 1) qty = 1;

    var cartKey = window.getIsolatedKey('gacxen_cart'); 
    var cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    var existing = cart.find(c => c.id === productId);
    if (existing) existing.qty += qty;
    else cart.push({ id: productId, qty: qty });
    
    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.updateGlobalCounters();
    alert("✅ Đã thêm sản phẩm vào giỏ hàng!");
};

// 3. Ghi đè hàm Mua Ngay (Vào thẳng trang thanh toán)
window.buyNow = function(productId) {
    if (!window.requireLogin()) return; // Gọi hàm kiểm tra dùng chung ở trên

var qtyInput = document.getElementById('soluong');    var qty = qtyInput ? parseInt(qtyInput.value) : 1;
    if (isNaN(qty) || qty < 1) qty = 1;

    var cartKey = window.getIsolatedKey('gacxen_cart'); 
    var cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    var existing = cart.find(c => c.id === productId);
    if (existing) existing.qty += qty;
    else cart.push({ id: productId, qty: qty });
    
    localStorage.setItem(cartKey, JSON.stringify(cart));
    // Lệnh chuyển thẳng qua trang giỏ hàng
    window.location.href = 'giohang.html';
};

// 4. Ghi đè hàm Yêu Thích
window.addToFav = function(productId) {
    if (!window.requireLogin()) return; // Gọi hàm kiểm tra dùng chung ở trên

    var favKey = window.getIsolatedKey('gacxen_favorites');
    var favs = JSON.parse(localStorage.getItem(favKey)) || [];
    
    if (!favs.includes(productId)) {
        favs.push(productId);
        localStorage.setItem(favKey, JSON.stringify(favs));
        alert("❤️ Đã thêm vào danh sách yêu thích!");
    } else {
        alert("Sản phẩm đã có trong danh sách yêu thích!");
    }
    window.updateGlobalCounters();
};
// =========================================
// CHỨC NĂNG CHATBOT AI
// =========================================

// Mở/đóng khung chat
window.toggleChatbot = function() {
    const chatbot = document.getElementById('gacxen-chatbot');
    if (chatbot) {
        chatbot.classList.toggle('active');
    }
};

// Xử lý khi bấm nút Gửi
// Xử lý khi bấm nút Gửi (Phiên bản Chatbot Thông Minh)
window.sendChatMessage = function() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    const rawText = input.value.trim();
    
    if (rawText === '') return;

    // 1. In tin nhắn của khách hàng lên màn hình
    messagesContainer.innerHTML += `
        <div class="message user-msg">
            <div class="msg-bubble">${rawText}</div>
        </div>
    `;
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 2. Chatbot phân tích từ khóa
    const text = rawText.toLowerCase(); // Chuyển thành chữ thường để dễ so sánh
    let aiResponse = "";

    setTimeout(() => {
        // Bộ não phân tích ngữ nghĩa (Keyword Matching)
        if (text.includes("chào") || text.includes("hi") || text.includes("hello") || text.includes("ê")) {
            aiResponse = "Chào bạn! Gác Xen có thể giúp gì cho bạn hôm nay? 😺";
        } 
        else if (text.includes("kinh tế") || text.includes("kinh doanh") || text.includes("marketing") || text.includes("làm giàu")) {
            aiResponse = "Gác Xen có rất nhiều sách Kinh tế - Tài chính hay. Mình gợi ý bạn cuốn 'Tài Chính Doanh Nghiệp' hoặc 'Combo Profit First' nhé. Bạn vào mục Sản phẩm để xem chi tiết nha! 📈";
        } 
        else if (text.includes("văn học") || text.includes("tiểu thuyết") || text.includes("truyện")) {
            aiResponse = "Tủ sách Văn học của Gác Xen đang có 'Vòng tay học trò' và 'Thư cho em' rất hot đó ạ. Bạn thích đọc thể loại tình cảm hay chữa lành? 📖";
        } 
        else if (text.includes("tâm lý") || text.includes("chữa lành") || text.includes("kỹ năng") || text.includes("buồn")) {
            aiResponse = "Nếu bạn quan tâm sách Tâm lý, hãy thử 'Liệu pháp tâm hồn' hoặc 'Tư duy nhanh và chậm' nha. Đọc rất thấm và nhẹ nhàng đó ạ! 🧠";
        } 
        else if (text.includes("khoa học") || text.includes("giáo dục")) {
            aiResponse = "Về mảng Khoa học - Giáo dục, cuốn '1000 bộ não' hoặc 'Xây dựng trường học hạnh phúc' đang là Best-seller bên mình đó bạn. 🔬";
        }
        else if (text.includes("ship") || text.includes("giao hàng") || text.includes("phí") || text.includes("vận chuyển")) {
            aiResponse = "Gác Xen hỗ trợ giao qua GHTK, GHN và VNPost ạ. Đặc biệt bên mình đang có mã FREESHIP 25K cho đơn từ 200K nha! 🚚";
        } 
        else if (text.includes("giảm giá") || text.includes("khuyến mãi") || text.includes("voucher") || text.includes("flash") || text.includes("sale")) {
            aiResponse = "Ui nhiều voucher lắm bạn ơi! Đang có Flash Sale giảm tới 30%, và nếu bạn là thành viên mới, nhớ nhập mã 'GACXENNEW' để được giảm thẳng 50K nhé! 🎁";
        } 
        else if (text.includes("giá") || text.includes("bao nhiêu") || text.includes("tiền")) {
            aiResponse = "Giá sách nhà Gác Xen dao động từ 84.000đ đến hơn 500.000đ tùy combo. Bạn cho mình xin tên cuốn sách bạn muốn hỏi để mình báo giá chính xác nha! 💰";
        }
        else if (text.includes("cảm ơn") || text.includes("thank") || text.includes("ok") || text.includes("dạ")) {
            aiResponse = "Dạ không có gì ạ. Chúc bạn một ngày thật vui và chọn được cuốn sách ưng ý tại Gác Xen nha! ❤️";
        } 
        else {
            // Câu trả lời mặc định nếu không hiểu
            aiResponse = "Dạ, câu hỏi này hơi khó nên trợ lý AI chưa hiểu trọn vẹn ý bạn. 😿 Bạn có thể hỏi cụ thể hơn về Tên sách, Thể loại (kinh tế, tâm lý...), Phí ship, hoặc Voucher được không ạ?";
        }
        
        // In câu trả lời của AI ra
        messagesContainer.innerHTML += `
            <div class="message bot-msg">
                <div class="msg-bubble">${aiResponse}</div>
            </div>
        `;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 600); // Tốc độ phản hồi: 0.6 giây
};

// Cho phép nhấn Enter để gửi tin nhắn
window.handleChatEnter = function(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
};
// =========================================
// RENDER BẢNG XẾP HẠNG (BXH) - FULL 4 TAB
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('bxh-list-container');
    const detailContainer = document.getElementById('bxh-detail-container');
    const tabs = document.querySelectorAll('.bxh-tab');
    
    if (!listContainer || !detailContainer || tabs.length === 0) return;

    // Toàn bộ dữ liệu Bảng xếp hạng lấy từ Shop của bạn
    const bxhData = {
        vanhoc: [
            { id: 'vh1', name: 'Thư cho em', author: 'Hoàng Nam Tiến', publisher: 'Hội Nhà Văn', price: '105.000đ', oldPrice: '150.000đ', discount: '-30%', score: '2559 điểm', image: '../img/Thu-cho-em.jpg', desc: 'Cuốn sách này kể về mối tình vượt qua hai thế kỷ của thiếu tướng Hoàng Đan và vợ là đại biểu Quốc hội Nguyễn Thị An Vinh...' },
            { id: 'vh2', name: 'Vì cậu là bạn nhỏ của tớ', author: 'Tun Phạm', publisher: 'Phụ Nữ Việt Nam', price: '136.000đ', oldPrice: '170.000đ', discount: '-20%', score: '1734 điểm', image: '../img/Vi-cau-la-ban-nho-cua-to.jpg', desc: 'Cuốn sách đầu tay đánh dấu chặng hành trình phát triển, nỗ lực không ngừng nghỉ của Tác giả, MC, Content Creator Tun Phạm...' },
            { id: 'vh3', name: 'Vòng tay học trò', author: 'Nguyễn Thị Hoàng', publisher: 'Hội Nhà Văn', price: '119.000đ', oldPrice: '140.000đ', discount: '-15%', score: '1148 điểm', image: '../img/Vong-tay-hoc-tro.jpg', desc: 'Giữa độ đôi mươi xuân sắc, cô giáo Tôn Nữ Quỳnh Trâm quyết định bỏ Sài Gòn hoa lệ lại phía sau để lên Đà Lạt tìm kiếm sự yên bình...' },
            { id: 'vh4', name: 'Vui vẻ không quạu nha', author: 'Ở Đây Zui Nè', publisher: 'Phụ Nữ Việt Nam', price: '84.000đ', oldPrice: '120.000đ', discount: '-30%', score: '1046 điểm', image: '../img/Vui-ve-khong-quau-nha.jpg', desc: 'Thả lỏng và tận hưởng sự vui vẻ đi. Vì chẳng phải cuộc đời đang ghét bạn đâu, mà chính bạn đang loay hoay với những mệt nhọc...' },
            { id: 'vh5', name: 'Phải lòng với cô đơn', author: 'Kulzsc', publisher: 'Phụ Nữ Việt Nam', price: '144.000đ', oldPrice: '180.000đ', discount: '-20%', score: '978 điểm', image: '../img/Phai-long-voi-co-don.jpg', desc: 'Từ cổ chí kim, con người ta sinh ra vốn đã một mình, có người bầu bạn thì tốt mà không có cũng chẳng sao.' }
        ],
        kinhte: [
            { id: 'sp1', name: 'Combo Profit First + Đừng Bán Sản Phẩm', author: 'Mike Michalowicz', publisher: 'NXB Công Thương', price: '334.400đ', oldPrice: '418.000đ', discount: '-20%', score: '2410 điểm', image: '../img/Combo-Toi-Uu-Loi-Nhuan-amp-Doanh-Thu-Profit-First-Dung-Ban-San-Pham-Hay-Ban-Giai-Phap.jpg', desc: 'Cuốn sách tập trung vào phương pháp quản lý tài chính giúp các doanh nghiệp nhỏ thoát khỏi vòng xoáy phá sản.' },
            { id: 'sp2', name: 'Nhân dân quyền lực và lợi nhuận', author: 'Joseph E. Stiglitz', publisher: 'NXB Tri Thức', price: '199.750đ', oldPrice: '235.000đ', discount: '-15%', score: '1890 điểm', image: '../img/Nhan-Dan-Quyen-Luc-Va-Loi-Nhuan-Joseph-E-Stiglitz-NXB-Tri-Thuc.jpg', desc: 'Tác phẩm kinh tế – chính trị quan trọng mang đến cái nhìn sâu sắc về xã hội và sự phân bổ quyền lực, lợi nhuận.' },
            { id: 'sp3', name: 'Combo chiến Lược Marketing Công Nghệ', author: 'Geoffrey A Moore', publisher: 'NXB Công Thương', price: '542.400đ', oldPrice: '678.000đ', discount: '-20%', score: '1502 điểm', image: '../img/Cong-Thuc-Tech-Biz-Chien-Luoc-Marketing-Cho-Thi-Truong-Cong-Nghe-Nghe-Thuat-Thiet-Ke-Game.jpg', desc: 'Khám phá bí mật nghệ thuật thiết kế game và chiến lược marketing độc đáo áp dụng cho thị trường công nghệ số...' },
            { id: 'sp4', name: 'Combo Tư Duy Kiếm Tiền - Thay Đổi Tí Hon', author: 'David Bach', publisher: 'NXB Công Thương', price: '295.800đ', oldPrice: '348.000đ', discount: '-15%', score: '1240 điểm', image: '../img/Combo-Tu-Duy-Trieu-Phu-Tu-Than-Thay-Doi-Ti-Hon-R-I-C-H-Mua-Ban-Doanh-Nghiep.jpg', desc: 'Những thay đổi tí hon mang lại sự giàu có bất ngờ. Bộ sách giúp bạn rèn luyện tư duy tỷ phú từ những thói quen hàng ngày.' },
            { id: 'sp6', name: 'Tài Chính Doanh Nghiệp', author: 'Stephen Ross', publisher: 'Kinh tế TP HCM', price: '472.600đ', oldPrice: '556.000đ', discount: '-15%', score: '980 điểm', image: '../img/tai-chinh-doanh-nghiep.jpg', desc: 'Giáo trình tiêu chuẩn và chuyên sâu về cấu trúc vốn, quản trị rủi ro và các quyết định tài chính quan trọng trong doanh nghiệp.' }
        ],
        tamly: [
            { id: 'tl1', name: 'Tư duy nhanh và chậm', author: 'Daniel Kahneman', publisher: 'NXB Thế Giới', price: '212.000đ', oldPrice: '265.000đ', discount: '-20%', score: '2800 điểm', image: '../img/Tu-duy-nhanh-va-cham.jpg', desc: 'Cuốn sách nổi tiếng về hai hệ thống tư duy chi phối nhận thức và quyết định của con người: Hệ thống 1 nhanh, cảm tính; Hệ thống 2 chậm, logic.' },
            { id: 'tl2', name: 'Thuật ngữ tâm lý học', author: 'Hoàng Hưng', publisher: 'NXB Tri Thức', price: '340.000đ', oldPrice: '400.000đ', discount: '-15%', score: '1950 điểm', image: '../img/Thuat-Ngu-Tam-Li-Hoc-Anh-Viet-Duc-Phap.jpg', desc: 'Từ điển thuật ngữ Tâm lý học đối chiếu 4 ngôn ngữ Anh - Việt - Đức - Pháp, tài liệu quý giá cho người nghiên cứu chuyên ngành.' },
            { id: 'tl3', name: 'Liệu pháp tâm lý trị liệu chiến lược', author: 'Jay Haley', publisher: 'NXB Tri Thức', price: '161.000đ', oldPrice: '230.000đ', discount: '-30%', score: '1620 điểm', image: '../img/Lieu-Phap-Tam-Li-Tri-Lieu-Chien-Luoc-Jay-Haley-amp-Madeleine.jpg', desc: 'Hướng dẫn các kỹ thuật trị liệu tâm lý chiến lược giúp thay đổi hành vi và giải quyết các vấn đề tâm lý phức tạp.' },
            { id: 'tl5', name: 'Tư duy phản biện như một luật sư', author: 'Colin Seale', publisher: 'NXB Tri Thức', price: '182.750đ', oldPrice: '215.000đ', discount: '-15%', score: '1310 điểm', image: '../img/Tu-duy-phan-bien-nhu-mot-luat-su.jpg', desc: 'Học cách lập luận, phân tích vấn đề và tư duy sắc bén như một luật sư chuyên nghiệp để ứng dụng vào đời sống.' },
            { id: 'tl6', name: 'Combo liệu pháp tâm hồn lấp đầy', author: 'Patricia d’Angeli', publisher: 'NXB Dân Trí', price: '245.000đ', oldPrice: '350.000đ', discount: '-30%', score: '1105 điểm', image: '../img/Combo-lieu-phap-tam-hon-lap-day-trong-rong-thien-tri-thuc.jpg', desc: 'Bộ sách chữa lành giúp bạn vượt qua những khoảng trống nội tâm, tìm lại sự bình yên và thấu hiểu chính mình.' }
        ],
        khoahoc: [
            { id: 'kh3', name: '1000 bộ não - Lý thuyết mới', author: 'Jeff Hawkins', publisher: 'NXB Thế Giới', price: '320.000đ', oldPrice: '400.000đ', discount: '-20%', score: '2100 điểm', image: '../img/1000 Bo-nao-ly-thuyet-moi-ve-tri-tue-con-nguoi.jpg', desc: 'Lý thuyết mới mang tính đột phá về trí tuệ con người và cách thức hoạt động thực sự của vỏ não hệ thần kinh.' },
            { id: 'kh1', name: 'Sự ra đời trí khôn ở trẻ em', author: 'Jean Piaget', publisher: 'NXB Tri Thức', price: '212.000đ', oldPrice: '265.000đ', discount: '-20%', score: '1840 điểm', image: '../img/Su-Ra-Doi-Tri-Khon-O-Tre-Em-Jean-Piaget-NXB-Tri-Thuc.jpg', desc: 'Công trình nghiên cứu kinh điển của Jean Piaget về quá trình hình thành nhận thức và trí thông minh ở trẻ nhỏ.' },
            { id: 'kh5', name: 'Xây dựng trường học hạnh phúc', author: 'Nguyễn Văn Hòa', publisher: 'NXB Dân Trí', price: '187.000đ', oldPrice: '220.000đ', discount: '-15%', score: '1560 điểm', image: '../img/xay-dung-truong-hoc-hanh-phuc-con-duong-toi-di.jpg', desc: 'Chia sẻ kinh nghiệm thực tiễn và tâm huyết của những người làm giáo dục trong việc kiến tạo môi trường học đường hạnh phúc.' },
            { id: 'kh2', name: 'Triết học của giáo dục', author: 'Richard Pring', publisher: 'NXB Tri Thức', price: '184.000đ', oldPrice: '230.000đ', discount: '-20%', score: '1320 điểm', image: '../img/Triet-Hoc-Cua-Giao-Duc-Richard-Pring-NXB-Tri-Thuc.jpg', desc: 'Góc nhìn triết học sâu sắc về bản chất, mục tiêu và giá trị cốt lõi của nền giáo dục đối với sự phát triển con người.' },
            { id: 'kh6', name: 'Hồi ký người thầy xây trường', author: 'Nguyễn Văn Hòa', publisher: 'NXB Dân Trí', price: '208.250đ', oldPrice: '245.000đ', discount: '-15%', score: '980 điểm', image: '../img/Hoi-ky-nguoi-thay-xay-truong-hanh-phuc.jpg', desc: 'Những câu chuyện xúc động và truyền cảm hứng từ hồi ký của người thầy dành cả đời cống hiến cho sự nghiệp giáo dục.' }
        ]
    };

    // Hàm render nội dung Chi tiết bên phải
    function renderDetail(book) {
        detailContainer.innerHTML = `
            <img src="${book.image}" alt="${book.name}" class="bxh-detail-img">
            <div class="bxh-detail-info">
                <h2 class="bxh-detail-title">${book.name}</h2>
                <div class="bxh-detail-meta">
                    Tác giả: ${book.author} <br>
                    Nhà xuất bản: ${book.publisher}
                </div>
                <div class="bxh-detail-price">
                    <span class="bxh-current-price">${book.price}</span>
                    <span class="bxh-old-price">${book.oldPrice}</span>
                    <span class="bxh-discount">${book.discount}</span>
                </div>
                <div class="bxh-desc">
                    <h3>${book.name.toUpperCase()}</h3>
                    <p>${book.desc}</p>
                </div>
                <button onclick="location.href='product-detail.html?id=${book.id}'" style="margin-top: 15px; background: #ff4d6d; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 5px; font-weight: bold;">XEM CHI TIẾT</button>
            </div>
        `;
    }

    // Hàm render Danh sách bên trái theo chủ đề
    function renderList(category) {
        listContainer.innerHTML = ''; // Xóa list cũ
        const books = bxhData[category];
        
        books.forEach((book, index) => {
            const item = document.createElement('div');
            item.className = 'bxh-item' + (index === 0 ? ' active' : '');
            item.innerHTML = `
                <div class="bxh-rank">
                    <span class="bxh-rank-num">0${index + 1}</span>
                    <span class="bxh-rank-arrow">↑</span>
                </div>
                <img src="${book.image}" class="bxh-item-img" alt="${book.name}">
                <div class="bxh-item-info">
                    <h4>${book.name}</h4>
                    <p>${book.author}</p>
                    <span class="bxh-item-score">${book.score}</span>
                </div>
            `;

            // Hover: Hiện chi tiết bên phải
            item.addEventListener('mouseenter', () => {
                document.querySelectorAll('.bxh-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                renderDetail(book);
            });

            // Click: Sang trang chi tiết
            item.addEventListener('click', () => {
                location.href = `product-detail.html?id=${book.id}`;
            });

            listContainer.appendChild(item);
        });

        // Mặc định hiện sách top 1 của chuyên mục
        renderDetail(books[0]);
    }

    // Gắn sự kiện chuyển Tab
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Đổi style Tab đang chọn
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Render lại danh sách dựa theo data-tab
            const selectedCategory = this.getAttribute('data-tab');
            renderList(selectedCategory);
        });
    });

    // Lúc vừa mở trang: Render tab Văn học đầu tiên
    renderList('vanhoc');
});
// =========================================================
// CHỨC NĂNG ĐÁNH GIÁ SẢN PHẨM (CHUẨN FORMAT THÔNG BÁO CHỮ i)
// =========================================================

// =========================================================
// CHỨC NĂNG ĐÁNH GIÁ SẢN PHẨM (CHỜ BẤM OK CHUYỂN TRANG)
// =========================================================

window.submitReview = function(event) {
    if (event) event.preventDefault(); // Chặn load lại trang

    // 1. Gọi thẳng hàm requireLogin (Nó sẽ tự hiện thông báo chữ 'i' và chờ khách bấm OK để nhảy trang)
    if (!window.requireLogin()) return false; 

    const nameInput = document.getElementById("review-name");
    const starSelect = document.getElementById("review-star");
    const textInput = document.getElementById("review-text");

    if(!nameInput || !starSelect || !textInput) return false;

    const name = nameInput.value.trim();
    const star = starSelect.value;
    const text = textInput.value.trim();

    // 2. Kiểm tra xem có gõ nội dung chưa
    if (name === "" || text === "") {
        alert("❌ Bạn chưa nhập đủ nội dung đánh giá!"); 
        return false;
    }

    // 3. Lấy ngày tháng hiện tại
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    const currentDate = `${day}/${month}/${year}`;

    // 4. Tạo khối HTML in ra màn hình
    const reviewHTML = `
    <div class="review-item">
        <div class="review-top">
            <div>
                <strong>${name}</strong>
                <div class="review-date">${currentDate}</div>
            </div>
            <span class="review-star">${star}</span>
        </div>
        <p class="review-content">${text}</p>
    </div>
    `;

    document.getElementById("review-list").innerHTML += reviewHTML;

    // 5. Thông báo thành công và làm trống ô nhập cảm nhận (giữ nguyên tên)
    alert("✅ Đánh giá của bạn đã được gửi thành công! Cảm ơn bạn.");
    textInput.value = "";
    
    return false;
};

// =======================================================
// MỞ SUBMENU TRÊN MOBILE & XỬ LÝ ĐẶC BIỆT NÚT TÀI KHOẢN
// =======================================================
document.addEventListener('DOMContentLoaded', function() {
    const dropdownWrappers = document.querySelectorAll('.dropdown, .lang-dropdown, .account-wrapper');

    dropdownWrappers.forEach(function(wrapper) {
        wrapper.addEventListener('click', function(e) {
            // Chỉ áp dụng luật này trên màn hình điện thoại/tablet
            if (window.innerWidth <= 768) {

                // --- XỬ LÝ ĐẶC QUYỀN CHO NÚT TÀI KHOẢN (ĐÃ ĐĂNG NHẬP) ---
                // Kiểm tra xem nút đang bấm có phải là Tài khoản không và khách đã đăng nhập chưa
                const isAccountWrapper = this.classList.contains('account-wrapper');
                const isLoggedIn = localStorage.getItem('gacxen_currentUser') !== null;
                
                // Nếu bấm nút Tài khoản VÀ đã đăng nhập -> Cho phép nhảy thẳng vào trang ngay chạm đầu tiên
                if (isAccountWrapper && isLoggedIn) {
                    return; 
                }

                // --- CÁC MENU KHÁC VÀ LÚC CHƯA ĐĂNG NHẬP ---
                // Nếu bấm vào link con bên trong Submenu -> Cho phép nhảy trang luôn
                if (e.target.closest('.dropdown-menu, .account-submenu, .lang-menu')) {
                    return; 
                }

                // NẾU MENU CHƯA MỞ (Chạm lần 1)
                if (!this.classList.contains('active')) {
                    e.preventDefault(); // Chặn nhảy trang để ưu tiên hiện menu
                    
                    // Đóng các menu khác cho gọn màn hình
                    dropdownWrappers.forEach(w => { 
                        if (w !== this) w.classList.remove('active'); 
                    });
                    
                    this.classList.add('active'); // Mở menu hiện tại lên
                } 
                // NẾU MENU ĐÃ MỞ (Chạm lần 2)
                // Code sẽ tự động bỏ qua lệnh chặn, trình duyệt sẽ nhảy sang trang cha.
            }
        });
    });

    // Bấm ra vùng trống ngoài màn hình thì đóng tất cả Submenu
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const isClickInside = e.target.closest('.dropdown, .lang-dropdown, .account-wrapper');
            if (!isClickInside) {
                dropdownWrappers.forEach(w => w.classList.remove('active'));
            }
        }
    });
});