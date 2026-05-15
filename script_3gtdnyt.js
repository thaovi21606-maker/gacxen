// =========================================
// SCRIPT CHUNG CHO 3 TRANG: YÊU THÍCH - GIỎ HÀNG - ĐƠN HÀNG
// File: script_3gtdnyt.js
// =========================================

// =========================================
// TÍNH NĂNG MỚI: PHÂN LẬP DỮ LIỆU & CHẶN TRUY CẬP KHI CHƯA ĐĂNG NHẬP
// =========================================
function getCurrentUserEmail() {
    var user = localStorage.getItem('gacxen_currentUser');
    return user ? JSON.parse(user).email : 'guest';
}

function getIsolatedKey(baseKey) {
    return baseKey + '_' + getCurrentUserEmail();
}

document.addEventListener("DOMContentLoaded", () => {
    var isGuest = getCurrentUserEmail() === 'guest';
    
    // 1. Chặn truy cập trực tiếp bằng link
    var currentPath = window.location.pathname.toLowerCase();
    if (isGuest && (currentPath.includes("giohang.html") || currentPath.includes("donhang.html") || currentPath.includes("yeuthich.html"))) {
        alert("⚠️ Bạn phải đăng nhập để xem trang này! Đang chuyển hướng...");
        setTimeout(() => { window.location.replace("dangnhap.html"); }, 2000);
    }

    // 2. Chặn click vào các nút trên menu
    var protectedLinks = document.querySelectorAll('a[href*="giohang.html"], a[href*="donhang.html"], a[href*="yeuthich.html"]');
    protectedLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (getCurrentUserEmail() === 'guest') {
                e.preventDefault(); 
                alert("⚠️ Bạn phải đăng nhập để sử dụng chức năng này!");
                setTimeout(() => { window.location.href = 'dangnhap.html'; }, 5000);
            }
        });
    });
});

window.requireLogin = function() {
    if (getCurrentUserEmail() === 'guest') {
        alert("⚠️ Bạn phải đăng nhập để thực hiện hành động này!");
        setTimeout(() => { window.location.href = 'dangnhap.html'; }, 2000);
        return false;
    }
    return true;
};
// =========================================

var dataMaster = {
    vh1: { name: "Thư cho em", price: "105.000đ", image: "../img/Thu-cho-em.jpg", oldPrice: "150.000đ" },
    vh2: { name: "Vì cậu là bạn nhỏ của tớ", price: "136.000đ", image: "../img/Vi-cau-la-ban-nho-cua-to.jpg", oldPrice: "170.000đ" },
    vh3: { name: "Vòng tay học trò", price: "119.000đ", image: "../img/Vong-tay-hoc-tro.jpg", oldPrice: "140.000đ" },
    vh4: { name: "Vui vẻ không quạu nha", price: "84.000đ", image: "../img/Vui-ve-khong-quau-nha.jpg", oldPrice: "120.000đ" },
    vh5: { name: "Phải lòng với cô đơn", price: "144.000đ", image: "../img/Phai-long-voi-co-don.jpg", oldPrice: "180.000đ" },
    vh6: { name: "Cuộc đời ngắn lắm đừng ôm muộn phiền", price: "170.000đ", image: "../img/Cuoc-doi-ngan-lam-dung-om-muon-phiên.jpg", oldPrice: "200.000đ" },
    sp1: { name: "Combo Profit First", price: "334.400đ", image: "../img/Combo-Toi-Uu-Loi-Nhuan-amp-Doanh-Thu-Profit-First-Dung-Ban-San-Pham-Hay-Ban-Giai-Phap.jpg", oldPrice: "418.000đ" },
    sp2: { name: "Nhân dân quyền lực", price: "199.750đ", image: "../img/Nhan-Dan-Quyen-Luc-Va-Loi-Nhuan-Joseph-E-Stiglitz-NXB-Tri-Thuc.jpg", oldPrice: "235.000đ" },
    sp3: { name: "Combo Marketing Công Nghệ", price: "542.400đ", image: "../img/Cong-Thuc-Tech-Biz-Chien-Luoc-Marketing-Cho-Thi-Truong-Cong-Nghe-Nghe-Thuat-Thiet-Ke-Game.jpg", oldPrice: "678.000đ" },
    sp4: { name: "Combo Tư Duy Kiếm Tiền", price: "295.800đ", image: "../img/Combo-Tu-Duy-Trieu-Phu-Tu-Than-Thay-Doi-Ti-Hon-R-I-C-H-Mua-Ban-Doanh-Nghiep.jpg", oldPrice: "348.000đ" },
    sp5: { name: "Tinh Thần Nghiệp Chủ", price: "96.000đ", image: "../img/Tinh-Than-Nghiep-Chu-Eamonn-Butler-NXB-Tri-Thuc.jpg", oldPrice: "120.000đ" },
    sp6: { name: "Tài Chính Doanh Nghiệp", price: "472.600đ", image: "../img/tai-chinh-doanh-nghiep.jpg", oldPrice: "556.000đ" },
    kh1: { name: "Sự ra đời trí khôn", price: "212.000đ", image: "../img/Su-Ra-Doi-Tri-Khon-O-Tre-Em-Jean-Piaget-NXB-Tri-Thuc.jpg", oldPrice: "265.000đ" },
    kh2: { name: "Triết học của giáo dục", price: "184.000đ", image: "../img/Triet-Hoc-Cua-Giao-Duc-Richard-Pring-NXB-Tri-Thuc.jpg", oldPrice: "230.000đ" },
    kh3: { name: "1000 bộ não", price: "320.000đ", image: "../img/1000 Bo-nao-ly-thuyet-moi-ve-tri-tue-con-nguoi.jpg", oldPrice: "400.000đ" },
    kh4: { name: "Tiến hóa văn hóa", price: "161.500đ", image: "../img/mot-goc-nhin-ve-tien-hoa-van-hoa.jpg", oldPrice: "190.000đ" },
    kh5: { name: "Trường học hạnh phúc", price: "187.000đ", image: "../img/xay-dung-truong-hoc-hanh-phuc-con-duong-toi-di.jpg", oldPrice: "220.000đ" },
    kh6: { name: "Hồi ký người thầy", price: "208.250đ", image: "../img/Hoi-ky-nguoi-thay-xay-truong-hanh-phuc.jpg", oldPrice: "245.000đ" },
    tl1: { name: "Tư duy nhanh và chậm", price: "212.000đ", image: "../img/Tu-duy-nhanh-va-cham.jpg", oldPrice: "265.000đ" },
    tl2: { name: "Thuật ngữ tâm lý học", price: "340.000đ", image: "../img/Thuat-Ngu-Tam-Li-Hoc-Anh-Viet-Duc-Phap.jpg", oldPrice: "400.000đ" },
    tl3: { name: "Liệu pháp chiến lược", price: "161.000đ", image: "../img/Lieu-Phap-Tam-Li-Tri-Lieu-Chien-Luoc-Jay-Haley-amp-Madeleine.jpg", oldPrice: "230.000đ" },
    tl4: { name: "Flashcard tư duy lãnh đạo", price: "152.000đ", image: "../img/Flashcard-Tu-Duy-Lanh-Dao.jpg", oldPrice: "190.000đ" },
    tl5: { name: "Phản biện luật sư", price: "182.750đ", image: "../img/Tu-duy-phan-bien-nhu-mot-luat-su.jpg", oldPrice: "215.000đ" },
    tl6: { name: "Combo liệu pháp tâm hồn", price: "245.000đ", image: "../img/Combo-lieu-phap-tam-hon-lap-day-trong-rong-thien-tri-thuc.jpg", oldPrice: "350.000đ" }
};

// ====================== CƠ SỞ DỮ LIỆU VOUCHER ======================
var voucherDatabase = {
    // Voucher hệ thống
    "GXFREESHIP25": { type: "ship", value: 25000, minOrder: 200000, desc: "Freeship 25K (Đơn từ 200K)" },
    "GX10KT05": { type: "cash", value: 10000, minOrder: 0, desc: "Giảm giá 10.000đ" },
    "GX30KT05": { type: "cash", value: 30000, minOrder: 499000, desc: "Giảm giá 30.000đ (Đơn từ 499K)" },
    "GACXENNEW": { type: "cash", value: 50000, minOrder: 0, desc: "Giảm giá 50.000đ cho bạn mới" },
    "GXFLASH20": { type: "cash", value: 20000, minOrder: 0, desc: "Giảm giá Flash Sale 20.000đ" },
    
    // Voucher đối tác
    "NHANAM15": { type: "percent", value: 0.15, max: 30000, minOrder: 0, desc: "Giảm 15% tối đa 30K (Nhã Nam)" },
    "NXBTRE250": { type: "gift", value: 0, minOrder: 250000, desc: "Tặng 01 sổ tay NXB Trẻ" },
    "KIMDONG20K": { type: "ship", value: 20000, minOrder: 0, desc: "Giảm 20K phí ship (Kim Đồng)" },
    "ALPHA50K": { type: "cash", value: 50000, minOrder: 0, desc: "Giảm giá 50.000đ (Alpha Books)" }
};

// ====================== TRANG ĐƠN HÀNG ======================
var currentFilter = 'Tất cả';

window.changeTab = function(element, status) {
    document.querySelectorAll('.filter-tabs .tab').forEach(function(t) {
        t.classList.remove('active');
    });
    element.classList.add('active');
    currentFilter = status;
    loadOrders();
};

window.buyAgain = function(orderId) {
    if(!window.requireLogin()) return; // Kiểm tra đăng nhập trước khi mua lại
    
    var orders = JSON.parse(localStorage.getItem(getIsolatedKey('gacxen_orders'))) || [];
    var order = orders.find(o => o.orderId === orderId);
    if (!order) return;

    var cart = JSON.parse(localStorage.getItem(getIsolatedKey('gacxen_cart'))) || [];
    var itemsAdded = 0;

    order.items.forEach(function(item) {
        var productId = null;
        for (var key in dataMaster) {
            if (dataMaster[key].image === item.image || dataMaster[key].name === item.name) {
                productId = key;
                break;
            }
        }
        if (productId) {
            var existing = cart.find(c => c.id === productId);
            if (existing) {
                existing.qty += item.qty;
            } else {
                cart.push({ id: productId, qty: item.qty });
            }
            itemsAdded++;
        }
    });

    if (itemsAdded > 0) {
        localStorage.setItem(getIsolatedKey('gacxen_cart'), JSON.stringify(cart));
        if (typeof window.updateGlobalCounters === 'function') window.updateGlobalCounters();
        alert("✅ Đã thêm các sản phẩm trong đơn hàng này vào giỏ hàng thành công!");
        window.location.href = 'giohang.html';
    } else {
        alert("❌ Không thể thêm sản phẩm vào giỏ hàng. Sản phẩm có thể đã ngừng bán!");
    }
};

function loadOrders() {
    var orders = JSON.parse(localStorage.getItem(getIsolatedKey('gacxen_orders'))) || [];
    var list = document.getElementById('orders-list');
    if (!list) return;

    document.getElementById('totalOrders').innerText = orders.length;
    var pendingCount = 0;
    var cancelCount = 0;
    
    orders.forEach(function(o) { 
        if(o.status === 'Chờ xác nhận') pendingCount++; 
        if(o.status === 'Đã hủy') cancelCount++;
    });
    document.getElementById('pendingOrders').innerText = pendingCount;
    document.getElementById('cancelOrders').innerText = cancelCount;

    var displayOrders = orders;
    if (currentFilter !== 'Tất cả') {
        displayOrders = orders.filter(o => o.status === currentFilter);
    }

    if(displayOrders.length === 0) { 
        list.innerHTML = '<div style="text-align:center; padding:80px 0; background:#fff; border-radius:15px; box-shadow: 0 4px 15px rgba(0,0,0,0.02);"><i class="fas fa-box-open" style="font-size: 60px; color: #eee; margin-bottom: 20px;"></i><h3 style="color:#777;">Chưa có đơn hàng nào</h3><a href="category-tatcasanpham.html" style="color:#ff4d6d; font-weight:bold; margin-top: 10px; display:inline-block;">Bắt đầu mua sắm</a></div>'; 
        return; 
    }

    var html = '';
    displayOrders.slice().reverse().forEach(function(o) {
        var items = o.items.map(function(it) {
            var imgPath = it.image || "../img/logo1.jpg";
            return '<div class="item-row"><img src="'+imgPath+'"><div class="item-desc"><h4>'+it.name+'</h4><p>Số lượng: x'+it.qty+'</p></div><div class="item-pq">'+it.price+'</div></div>';
        }).join('');
        
        var statusClass = 'status-pending';
        var statusIcon = '<i class="fas fa-hourglass-half"></i> ';
        if(o.status === 'Đã hủy') {
            statusClass = 'status-cancel';
            statusIcon = '<i class="fas fa-times-circle"></i> ';
        } else if(o.status !== 'Chờ xác nhận') {
            statusClass = 'status-success';
            statusIcon = '<i class="fas fa-check-circle"></i> ';
        }

        var actionButtons = '';
        if(o.status === 'Chờ xác nhận') {
            actionButtons += '<button class="btn-outline" onclick="cancelOrder(\''+o.orderId+'\')">Hủy đơn</button>';
        }
        actionButtons += '<button class="btn-fill" onclick="buyAgain(\''+o.orderId+'\')">Mua lại</button>';

        html += '<div class="order-card">' +
                    '<div class="order-header">' +
                        '<div class="order-id">MÃ ĐƠN HÀNG: <span style="color:#ff4d6d;">#'+o.orderId+'</span><br><span style="font-size:13px; color:#888; font-weight:normal; margin-top:5px; display:block;"><i class="far fa-clock"></i> Đặt lúc: '+o.date+'</span></div>' +
                        '<div class="order-status '+statusClass+'">'+statusIcon+o.status+'</div>' +
                    '</div>' +
                    '<div class="order-items">'+items+'</div>' +
                    '<div class="order-footer">' +
                        '<div class="cust-info">' +
                            '<p><strong><i class="fas fa-user"></i> Người nhận:</strong> '+o.customer.name+' ('+o.customer.phone+')</p>' +
                            '<p><strong><i class="fas fa-map-marker-alt"></i> Địa chỉ:</strong> '+o.customer.address+'</p>' +
                            '<p><strong><i class="fas fa-truck"></i> Giao hàng:</strong> '+(o.shipping || 'Tiêu chuẩn')+' | <strong><i class="fas fa-wallet"></i> Thanh toán:</strong> '+o.payment+'</p>' +
                            (o.customer.note ? '<p><strong><i class="fas fa-comment-dots"></i> Ghi chú:</strong> '+o.customer.note+'</p>' : '') +
                        '</div>' +
                        '<div class="final-price-box">' +
                            '<span style="font-weight:700; color:#555; font-size: 14px;">TỔNG THANH TOÁN</span>' +
                            '<strong class="final-price">'+o.total+'</strong>' +
                            '<span style="display: block; font-size: 13px; color: #27ae60; font-weight: 700; margin-top: 5px; margin-bottom: 15px;">+2 xu khi đơn hàng nhận thành công</span>' +
                            '<div class="btn-action-group">' + actionButtons + '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
    });
    list.innerHTML = html;
}

window.cancelOrder = function(orderId) {
    if(window.showGacxenConfirm) {
        window.showGacxenConfirm("XÁC NHẬN HỦY", "Bạn có chắc chắn muốn hủy đơn hàng #" + orderId + " không?", function() {
            executeCancel(orderId);
        });
    } else if(confirm("Bạn có chắc chắn muốn hủy đơn hàng #" + orderId + " không?")) {
        executeCancel(orderId);
    }
};

function executeCancel(orderId) {
    var orders = JSON.parse(localStorage.getItem(getIsolatedKey('gacxen_orders'))) || [];
    for(var i=0; i<orders.length; i++) {
        if(orders[i].orderId === orderId) {
            orders[i].status = 'Đã hủy'; 
            break;
        }
    }
    localStorage.setItem(getIsolatedKey('gacxen_orders'), JSON.stringify(orders));
    alert("✅ Đã hủy đơn hàng thành công!");
    loadOrders(); 
}

// ====================== TRANG GIỎ HÀNG ======================
var rawSubTotal = 0;
var discount = 0;
var userCoins = parseInt(localStorage.getItem(getIsolatedKey('gacxen_coins'))) || 0; 
var coinDiscount = 0;
var coinValueRate = 1000;

window.processOrder = function() {
    var cartKey = getIsolatedKey('gacxen_cart');
    var cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    if(cart.length === 0) return alert("Giỏ hàng của bạn đang trống!");

    // Tách mảng: Hàng ĐƯỢC TICK (để mua) và Hàng KHÔNG TICK (để giữ lại trong giỏ)
    var itemsToBuy = [];
    var itemsToKeep = [];

    cart.forEach(function(item) {
        if (item.selected !== false) {
            itemsToBuy.push(item);
        } else {
            itemsToKeep.push(item);
        }
    });

    // Chặn nếu khách chưa tick chọn món nào
    if (itemsToBuy.length === 0) {
        return alert("❌ Vui lòng tick chọn ít nhất 1 sản phẩm để thanh toán!");
    }

    var name = document.getElementById('orderName').value.trim();
    var phone = document.getElementById('orderPhone').value.trim();
    var addr = document.getElementById('orderAddress').value.trim();
    
    document.querySelectorAll('.error-msg').forEach(function(el){ el.style.display = 'none'; });
    var isValid = true;

    if(name.length < 1) { document.getElementById('errName').style.display = 'block'; isValid = false; }
    if(!/^(0[2|3|5|7|8|9])+([0-9]{8})$/.test(phone)) { document.getElementById('errPhone').style.display = 'block'; isValid = false; }
    if(addr.length < 15) { document.getElementById('errAddress').style.display = 'block'; isValid = false; }

    if(!isValid) return alert("❌ Vui lòng kiểm tra lại thông tin nhận hàng!");

    var orders = JSON.parse(localStorage.getItem(getIsolatedKey('gacxen_orders'))) || [];
    orders.push({
        orderId: 'GX' + Date.now().toString().slice(-6),
        date: new Date().toLocaleString('vi-VN'),
        customer: { name: name, phone: phone, address: addr, note: document.getElementById('orderNote').value },
        shipping: document.querySelector('input[name="ship"]:checked').getAttribute('data-name'),
        payment: document.querySelector('input[name="payment"]:checked').getAttribute('data-name'),
        // Chỉ lưu thông tin những món được chọn mua
        items: itemsToBuy.map(it => { var p = dataMaster[it.id]; return { name: p.name, price: p.price, qty: it.qty, image: p.image }; }),
        total: document.getElementById('finalTotal').innerText,
        status: 'Chờ xác nhận'
    });

    // 1. Lưu lại đơn hàng
    localStorage.setItem(getIsolatedKey('gacxen_orders'), JSON.stringify(orders));
    // 2. Chỉ xóa những món đã mua, GIỮ LẠI các món khách chưa tick
    localStorage.setItem(cartKey, JSON.stringify(itemsToKeep)); 
    
    if(document.getElementById('useCoinCb').checked) localStorage.setItem(getIsolatedKey('gacxen_coins'), 0);
    document.getElementById('successModal').style.display = 'flex';
};
// --- HÀM TẢI GIỎ HÀNG (ĐÃ CÓ CHECKBOX TÍNH TIỀN) ---
window.loadCart = function() {
    var cart = JSON.parse(localStorage.getItem(getIsolatedKey('gacxen_cart'))) || [];
    var container = document.getElementById('cart-items-container');
    if (!container) return;

    var totalQty = 0;
    cart.forEach(function(item) { totalQty += item.qty; });
    var cartPageCountEl = document.getElementById('cartPageCount');
    if(cartPageCountEl) cartPageCountEl.innerText = totalQty;
    
    var userCoinSpan = document.getElementById('userCoinSpan');
    if(userCoinSpan) userCoinSpan.innerText = userCoins;
    var coinValueSpan = document.getElementById('coinValueSpan');
    if(coinValueSpan) coinValueSpan.innerText = (userCoins * coinValueRate).toLocaleString('vi-VN') + 'đ';
    
    if (userCoins <= 0) {
        var useCoinCb = document.getElementById('useCoinCb');
        if(useCoinCb) useCoinCb.disabled = true;
        var coinLabel = document.getElementById('coinLabel');
        if(coinLabel) coinLabel.style.opacity = "0.5";
    }

    if(cart.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding: 40px;"><h3 style="color:#999; border-left:none; padding-left:0;">Giỏ hàng của bạn đang trống!</h3></div>';
        rawSubTotal = 0; updateTotal(); return;
    }

    var allChecked = cart.every(function(item) { return item.selected !== false; });
    var checkAllHtml = allChecked ? 'checked' : '';

    var html = '<div class="cart-table-header">' +
               '<div class="col-cb"><input type="checkbox" id="checkAll" class="cart-checkbox" '+checkAllHtml+' onchange="toggleCheckAll()"></div>' +
               '<div class="col-sp">Sản phẩm</div><div class="col-dg">Đơn giá</div><div class="col-sl">Số lượng</div><div class="col-tt">Thành tiền</div></div>';
    
    cart.forEach(function(item, i) {
        var p = dataMaster[item.id];
        if(p) {
            var price = parseInt(p.price.replace(/\D/g,""));
            var itemTotal = price * item.qty;
            var checkedHtml = item.selected !== false ? 'checked' : ''; 

            html += '<div class="cart-item">' +
                    '<div class="col-cb"><input type="checkbox" class="cart-checkbox item-checkbox" '+checkedHtml+' onchange="updateCheckState('+i+', this.checked)"></div>' +
                    '<div class="item-info"><img src="'+p.image+'"><a href="product-detail.html?id='+item.id+'" class="item-name">'+p.name+'</a></div>' +
                    '<div class="item-price">'+p.price+'</div>' +
                    '<div class="qty-box"><button onclick="chgQty('+i+',-1)">-</button><input type="text" value="'+item.qty+'" readonly><button onclick="chgQty('+i+',1)">+</button></div>' +
                    '<div class="item-total">'+itemTotal.toLocaleString()+'đ</div>' +
                    '<button class="btn-remove" onclick="rmv('+i+')"><i class="fas fa-times"></i></button></div>';
        }
    });
    container.innerHTML = html;
    calculateCheckedTotal(); 
};

window.updateCheckState = function(index, isChecked) {
    var cartKey = getIsolatedKey('gacxen_cart');
    var cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    if (cart[index]) {
        cart[index].selected = isChecked;
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }
    loadCart(); 
};

window.toggleCheckAll = function() {
    var isChecked = document.getElementById('checkAll').checked;
    var cartKey = getIsolatedKey('gacxen_cart');
    var cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    cart.forEach(function(item) { item.selected = isChecked; });
    localStorage.setItem(cartKey, JSON.stringify(cart));
    loadCart();
};

window.calculateCheckedTotal = function() {
    var cart = JSON.parse(localStorage.getItem(getIsolatedKey('gacxen_cart'))) || [];
    var total = 0;
    cart.forEach(function(item) {
        if (item.selected !== false) { 
            var p = dataMaster[item.id];
            if (p) {
                var price = parseInt(p.price.replace(/\D/g,""));
                total += price * item.qty;
            }
        }
    });
    rawSubTotal = total;
    updateTotal();
};

window.chgQty = function(i, c) {
    var cart = JSON.parse(localStorage.getItem(getIsolatedKey('gacxen_cart')));
    cart[i].qty += c; 
    if(cart[i].qty < 1) cart[i].qty = 1;
    localStorage.setItem(getIsolatedKey('gacxen_cart'), JSON.stringify(cart));
    loadCart(); 
    if (typeof window.updateGlobalCounters === 'function') window.updateGlobalCounters();
};

window.rmv = function(i) {
    var cart = JSON.parse(localStorage.getItem(getIsolatedKey('gacxen_cart')));
    cart.splice(i, 1);
    localStorage.setItem(getIsolatedKey('gacxen_cart'), JSON.stringify(cart));
    loadCart(); 
    if (typeof window.updateGlobalCounters === 'function') window.updateGlobalCounters();
};

// HÀM ÁP DỤNG VOUCHER ĐÃ CẬP NHẬT
function applyVoucher() {
    var code = document.getElementById('voucherCode').value.trim().toUpperCase();
    var msg = document.getElementById('vchMsg');
    var voucher = voucherDatabase[code];

    if (!voucher) {
        discount = 0;
        msg.innerText = "❌ Mã giảm giá không hợp lệ hoặc đã hết hạn!";
        msg.style.color = "#e74c3c";
    } else if (rawSubTotal < voucher.minOrder) {
        discount = 0;
        msg.innerText = "❌ Chưa đủ điều kiện! Mã yêu cầu đơn từ " + voucher.minOrder.toLocaleString() + "đ";
        msg.style.color = "#e74c3c";
    } else {
        // Hợp lệ -> Tính số tiền giảm dựa trên loại voucher
        if (voucher.type === "ship") {
            var shipFee = parseInt(document.querySelector('input[name="ship"]:checked').value);
            // Giảm tối đa bằng giá trị voucher hoặc tối đa bằng phí ship đang có
            discount = Math.min(voucher.value, shipFee);
            msg.innerText = "✅ Đã áp dụng: " + voucher.desc;
        } else if (voucher.type === "percent") {
            var pctDiscount = rawSubTotal * voucher.value;
            discount = Math.min(pctDiscount, voucher.max);
            msg.innerText = "✅ Đã áp dụng: " + voucher.desc;
        } else if (voucher.type === "gift") {
            discount = 0; // Quà tặng vật lý không trừ tiền mặt
            msg.innerText = "🎁 " + voucher.desc;
        } else {
            discount = voucher.value;
            msg.innerText = "✅ Đã áp dụng: " + voucher.desc;
        }
        msg.style.color = "#27ae60";
    }
    updateTotal();
}

function toggleCoin() {
    var cb = document.getElementById('useCoinCb');
    if(cb.checked && userCoins > 0) {
        coinDiscount = userCoins * coinValueRate;
        document.getElementById('coinRow').style.display = 'flex';
    } else {
        coinDiscount = 0;
        document.getElementById('coinRow').style.display = 'none';
    }
    updateTotal();
}

function updateTotal() {
    var ship = rawSubTotal > 0 ? parseInt(document.querySelector('input[name="ship"]:checked').value) : 0;
    
    // Nếu dùng mã freeship, discount được gán trực tiếp ở applyVoucher, 
    // nhưng nếu đổi ship khác, ta cần đảm bảo discount ship không vượt tiền ship mới
    var code = document.getElementById('voucherCode').value.trim().toUpperCase();
    var voucher = voucherDatabase[code];
    var actualDiscount = discount;
    if(voucher && voucher.type === "ship") {
        actualDiscount = Math.min(voucher.value, ship);
    }

    var final = rawSubTotal + ship - actualDiscount - coinDiscount;
    if(final < 0) final = 0;

    document.getElementById('subTotal').innerText = rawSubTotal.toLocaleString('vi-VN') + 'đ';
    document.getElementById('shipFee').innerText = ship.toLocaleString('vi-VN') + 'đ';
    document.getElementById('vchDiscount').innerText = '-' + actualDiscount.toLocaleString('vi-VN') + 'đ';
    
    if(document.getElementById('coinDiscountAmt')) {
        document.getElementById('coinDiscountAmt').innerText = '-' + coinDiscount.toLocaleString('vi-VN') + 'đ';
    }
    document.getElementById('finalTotal').innerText = final.toLocaleString('vi-VN') + 'đ';
}

// ----------------------------------------------------
// TỰ ĐỘNG ĐIỀN THÔNG TIN TÀI KHOẢN VÀO TRANG GIỎ HÀNG
// ----------------------------------------------------
function autoFillShippingInfo() {
    var orderNameEl = document.getElementById('orderName');
    var orderPhoneEl = document.getElementById('orderPhone');
    var orderAddressEl = document.getElementById('orderAddress');

    if (!orderNameEl || !orderPhoneEl || !orderAddressEl) return;

    var savedUser = localStorage.getItem('gacxen_currentUser');
    if (savedUser) {
        var currentUser = JSON.parse(savedUser);

        var fName = currentUser.firstName || '', lName = currentUser.lastName || '';
        if (currentUser.address && (currentUser.address.firstName || currentUser.address.lastName)) {
            fName = currentUser.address.firstName || '';
            lName = currentUser.address.lastName || '';
        }
        var fullName = (lName + ' ' + fName).trim();
        if (fullName && !orderNameEl.value) orderNameEl.value = fullName;

        var phone = (currentUser.address && currentUser.address.phone) ? currentUser.address.phone : (currentUser.phone || '');
        if (phone && !orderPhoneEl.value) orderPhoneEl.value = phone;

        if (currentUser.address && !orderAddressEl.value) {
            var addrParts = [currentUser.address.detail, currentUser.address.ward, currentUser.address.district, currentUser.address.city].filter(Boolean);
            orderAddressEl.value = addrParts.join(', ');
        }
    }
}

window.processOrder = function() {
    var cart = JSON.parse(localStorage.getItem(getIsolatedKey('gacxen_cart'))) || [];
    if(cart.length === 0) return alert("Giỏ hàng của bạn đang trống!");

    var name = document.getElementById('orderName').value.trim();
    var phone = document.getElementById('orderPhone').value.trim();
    var addr = document.getElementById('orderAddress').value.trim();
    
    document.querySelectorAll('.error-msg').forEach(function(el){ el.style.display = 'none'; });
    var isValid = true;

    if(name.length < 1) { document.getElementById('errName').style.display = 'block'; isValid = false; }
    if(!/^(0[2|3|5|7|8|9])+([0-9]{8})$/.test(phone)) { document.getElementById('errPhone').style.display = 'block'; isValid = false; }
    if(addr.length < 15) { document.getElementById('errAddress').style.display = 'block'; isValid = false; }

    if(!isValid) return alert("❌ Vui lòng kiểm tra lại thông tin!");

    var orders = JSON.parse(localStorage.getItem(getIsolatedKey('gacxen_orders'))) || [];
    orders.push({
        orderId: 'GX' + Date.now().toString().slice(-6),
        date: new Date().toLocaleString('vi-VN'),
        customer: { name: name, phone: phone, address: addr, note: document.getElementById('orderNote').value },
        shipping: document.querySelector('input[name="ship"]:checked').getAttribute('data-name'),
        payment: document.querySelector('input[name="payment"]:checked').getAttribute('data-name'),
        items: cart.map(it => { var p = dataMaster[it.id]; return { name: p.name, price: p.price, qty: it.qty, image: p.image }; }),
        total: document.getElementById('finalTotal').innerText,
        status: 'Chờ xác nhận'
    });

    localStorage.setItem(getIsolatedKey('gacxen_orders'), JSON.stringify(orders));
    localStorage.setItem(getIsolatedKey('gacxen_cart'), JSON.stringify([])); // Làm trống giỏ sau khi đặt
    if(document.getElementById('useCoinCb').checked) localStorage.setItem(getIsolatedKey('gacxen_coins'), 0);
    document.getElementById('successModal').style.display = 'flex';
};

// ====================== TRANG YÊU THÍCH ======================
function loadFavorites() {
    var favs = JSON.parse(localStorage.getItem(getIsolatedKey('gacxen_favorites'))) || [];
    var container = document.getElementById('favorites-list');
    
    if (!container) return; // Nếu không ở trang yêu thích thì bỏ qua

    if (favs.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 100px 0;"><i class="fas fa-heart-broken" style="font-size: 60px; color: #eee; margin-bottom: 20px;"></i><h3 style="color:#777;">Danh sách yêu thích đang trống</h3><button onclick="window.location.href=\'category-tatcasanpham.html\'" style="margin-top:20px; background:#ff4d6d; color:#fff; border:none; padding:10px 25px; border-radius:25px; font-weight:800; cursor:pointer;">KHÁM PHÁ NGAY</button></div>';
        return;
    }

    var html = '';
    for(var i = 0; i < favs.length; i++) {
        var id = favs[i];
        if (dataMaster[id]) {
            var product = dataMaster[id];
            var oldPriceHtml = product.oldPrice ? '<span class="fav-old-price">' + product.oldPrice + '</span>' : '<span class="fav-old-price" style="visibility: hidden;">0</span>';
            
            html += '<div class="fav-item" id="fav-item-' + id + '">' +
                    '<button title="Bỏ yêu thích" class="btn-del-fav" onclick="removeFromFav(\'' + id + '\')">' +
                        '<i class="fas fa-times"></i>' +
                    '</button>' +
                    '<img src="' + product.image + '" alt="' + product.name + '">' +
                    '<h3 title="' + product.name + '">' + product.name + '</h3>' +
                    '<div class="fav-price-box">' +
                        '<span class="fav-curr-price">' + product.price + '</span>' +
                        oldPriceHtml +
                    '</div>' +
                    '<button class="btn-go-detail" onclick="window.location.href=\'product-detail.html?id=' + id + '\'">' +
                        'XEM CHI TIẾT' +
                    '</button>' +
                '</div>';
        }
    }
    container.innerHTML = html;
}

window.removeFromFav = function(id) {
    var favs = JSON.parse(localStorage.getItem(getIsolatedKey('gacxen_favorites'))) || [];
    var newFavs = [];
    for(var i=0; i<favs.length; i++) {
        if(favs[i] !== id) newFavs.push(favs[i]);
    }
    localStorage.setItem(getIsolatedKey('gacxen_favorites'), JSON.stringify(newFavs));
    
    if(typeof window.updateGlobalCounters === 'function') {
        window.updateGlobalCounters(); 
    }
    loadFavorites();
};

// ====================== KHỞI TẠO TỰ ĐỘNG ======================
// ====================== KHỞI TẠO TỰ ĐỘNG ======================
window.onload = function() {
    if (document.getElementById('orders-list')) loadOrders();
    if (document.getElementById('cart-items-container')) {
        loadCart();
        autoFillShippingInfo();
    }
    if (document.getElementById('favorites-list')) loadFavorites();

    if (typeof window.updateGlobalCounters === 'function') window.updateGlobalCounters();

    const btnAccount = document.getElementById('btn-account-header');
    const savedUser = localStorage.getItem('gacxen_currentUser');
    if (btnAccount && savedUser) {
        const u = JSON.parse(savedUser);
        
        // --- ĐÃ SỬA Ở ĐÂY: Lấy đầy đủ cả Họ và Tên ---
        const ho = u.lastName ? u.lastName + ' ' : '';
        const ten = u.firstName ? u.firstName : 'Khách';
        const fullName = ho + ten;
        
        btnAccount.innerHTML = `<img src="${u.avatar || '../img/tk.png'}" style="width:25px; height:25px; border-radius:50%; vertical-align:middle; margin-right:5px;"> <strong style="font-size: 14px;">${fullName.trim()}</strong>`;
        btnAccount.href = "taikhoan.html";
        const submenu = document.getElementById('accountSubmenu');
        if (submenu) submenu.remove();
    }
};

function applyLanguage(lang){
    const currentBtn = document.getElementById("currentLangBtn");

    if(lang === "en"){
        /* menu */
        setTextByClass("lang-home", "Home");
        setTextByClass("lang-sale", "Flash Sale");
        setTextByClass("lang-about", "About");
        setTextByClass("lang-contact", "Contact");
        /* user actions */
        setTextByClass("lang-account", "Account");
        setTextByClass("lang-order", "Orders");
        setTextByClass("lang-fav", "Wishlist");
        setTextByClass("lang-cart", "Cart");
        /* newsletter */
        setTextByClass("lang-newsletter", "NEWSLETTER");
        setTextByClass("lang-subscribe", "Subscribe");
        setTextByClass("lang-unsubscribe", "Unsubscribe");
        /* footer */
        setTextByClass("lang-category", "Categories");
        setTextByClass("lang-policy", "Support Policies");
        setTextByClass("lang-myaccount", "My Account");
        setTextByClass("lang-contactinfo", "Contact Info");
        /* đổi cờ */
        if(currentBtn){
            currentBtn.innerHTML = `
                <img src="../img/en-flag.jpg" class="flag-icon">
                <i class="fas fa-chevron-down" style="font-size:10px;"></i>
            `;
        }
    } else {
        /* menu */
        setTextByClass("lang-home", "Trang chủ");
        setTextByClass("lang-sale", "Flashsale");
        setTextByClass("lang-about", "Giới thiệu");
        setTextByClass("lang-contact", "Liên hệ");
        /* user actions */
        setTextByClass("lang-account", "Tài khoản");
        setTextByClass("lang-order", "Đơn hàng");
        setTextByClass("lang-fav", "Yêu thích");
        setTextByClass("lang-cart", "Giỏ hàng");
        /* newsletter */
        setTextByClass("lang-newsletter", "ĐĂNG KÝ NHẬN BẢN TIN");
        setTextByClass("lang-subscribe", "Đăng ký");
        setTextByClass("lang-unsubscribe", "Hủy đăng ký");
        /* footer */
        setTextByClass("lang-category", "Danh mục");
        setTextByClass("lang-policy", "Chính sách hỗ trợ");
        setTextByClass("lang-myaccount", "Tài khoản của tôi");
        setTextByClass("lang-contactinfo", "Thông tin liên hệ");
        /* đổi cờ */
        if(currentBtn){
            currentBtn.innerHTML = `
                <img src="../img/vn-flag.jpg" class="flag-icon">
                <i class="fas fa-chevron-down" style="font-size:10px;"></i>
            `;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("language") || "vi";
    applyLanguage(savedLang);
});
// =========================================================
// CÁC HÀM XỬ LÝ NÚT Ở TRANG CHI TIẾT SẢN PHẨM (MUA NGAY, YÊU THÍCH, THÊM GIỎ)
// =========================================================
// =========================================================
// CÁC HÀM XỬ LÝ NÚT Ở TRANG CHI TIẾT SẢN PHẨM & CẬP NHẬT BỘ ĐẾM
// =========================================================

// HÀM MỚI: Đè lại hàm đếm số lượng để sử dụng chuẩn dữ liệu đã phân lập theo User
window.updateGlobalCounters = function() {
    var cartKey = getIsolatedKey('gacxen_cart');
    var favKey = getIsolatedKey('gacxen_favorites');
    
    var cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    var favs = JSON.parse(localStorage.getItem(favKey)) || [];

    var cartCountEl = document.getElementById('cartCount');
    var favCountEl = document.getElementById('favCount');
    var cartPageCountEl = document.getElementById('cartPageCount');

    // Tính tổng số lượng tất cả sản phẩm có trong giỏ
    var totalItems = 0;
    cart.forEach(function(item) {
        totalItems += item.qty;
    });

    if (cartCountEl) cartCountEl.innerText = totalItems;
    if (favCountEl) favCountEl.innerText = favs.length;
    // Trên trang giỏ hàng thì hiện số lượng đầu sách (cart.length) hoặc tổng tùy ý
    if (cartPageCountEl) cartPageCountEl.innerText = totalItems; 
};

// 1. Hàm Thêm vào giỏ hàng
window.addToCart = function(productId, event) {
    if (event) event.preventDefault(); // Chặn reload trang
    if (!window.requireLogin()) return false; 
    
var qtyInput = document.getElementById('soluong');
    var qty = qtyInput ? parseInt(qtyInput.value) : 1;
    if (isNaN(qty) || qty < 1) qty = 1;

    var cartKey = getIsolatedKey('gacxen_cart'); 
    var cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    var existing = cart.find(function(c) { return c.id === productId; });
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: productId, qty: qty });
    }
    
    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.updateGlobalCounters(); // Gọi hàm đã fix ở trên
    alert("✅ Đã thêm sản phẩm vào giỏ hàng của bạn!");
    return false;
};

// 2. Hàm Mua Ngay (Lưu vào giỏ và chuyển thẳng sang trang giỏ hàng)
window.buyNow = function(productId, event) {
    if (event) event.preventDefault(); // Bắt buộc: Chặn reload trang để JS có thời gian chạy
    if (!window.requireLogin()) return false; 
    
var qtyInput = document.getElementById('soluong');    var qty = qtyInput ? parseInt(qtyInput.value) : 1;
    if (isNaN(qty) || qty < 1) qty = 1;

    var cartKey = getIsolatedKey('gacxen_cart'); 
    var cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    var existing = cart.find(function(c) { return c.id === productId; });
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: productId, qty: qty });
    }
    
    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.updateGlobalCounters();
    
    // Dùng setTimeout để đảm bảo localStorage ghi xong trước khi nhảy trang
    setTimeout(function() {
        window.location.href = 'giohang.html';
    }, 150);
    
    return false;
};

// 3. Hàm Thêm Yêu Thích (Trái tim)
window.addToFav = function(productId, event) {
    if (event) event.preventDefault();
    if (!window.requireLogin()) return false;

    var favKey = getIsolatedKey('gacxen_favorites');
    var favs = JSON.parse(localStorage.getItem(favKey)) || [];
    
    if (!favs.includes(productId)) {
        favs.push(productId);
        localStorage.setItem(favKey, JSON.stringify(favs));
        alert("❤️ Đã thêm sản phẩm vào danh sách yêu thích!");
    } else {
        alert("Sản phẩm này đã có trong danh sách yêu thích của bạn!");
    }
    
    window.updateGlobalCounters();
    return false;
};