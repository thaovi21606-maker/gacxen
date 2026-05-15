document.addEventListener('DOMContentLoaded', () => {

    // 1. XỬ LÝ ĐỔI MÀU THANH MENU TỰ ĐỘNG (ACTIVE STATE)
    const currentPath = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.nav-menu > li > a');

    menuItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        item.classList.remove('active');
        if (currentPath === itemHref || (currentPath === '' && itemHref === 'homepage.html')) {
            item.classList.add('active');
        }
    });

    // 2. HIỆU ỨNG TƯƠNG TÁC CARD NHÂN SỰ
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = '0.3s';
        });
    });

    // =========================================
    // 3. XỬ LÝ HIỂN THỊ CHÍNH SÁCH DỰA VÀO URL 
    // =========================================
    const urlParams = new URLSearchParams(window.location.search);
    const policyParam = urlParams.get('policy'); // Lấy chữ 'doitra', 'baohanh',... từ URL

    if (policyParam) {
        // 1. Ẩn nội dung trang Giới thiệu chính đi
        const mainContent = document.getElementById('mainAboutContent');
        if (mainContent) mainContent.style.display = 'none';

        // 2. Hiện khu vực bao bọc Chính sách
        const policyViewer = document.getElementById('policyViewer');
        if (policyViewer) policyViewer.style.display = 'block';

        // 3. Giấu tất cả các bài chính sách (để chắc chắn)
        const allPolicies = document.querySelectorAll('.policy-data');
        allPolicies.forEach(p => p.style.display = 'none');

        // 4. Tìm và hiển thị đúng bài chính sách theo URL
        const targetPolicy = document.getElementById('policy-' + policyParam);
        if (targetPolicy) {
            targetPolicy.style.display = 'block';
            
            // 5. Cuộn mượt mà lên đầu trang để khách dễ đọc
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});