const allProducts = {
    ...window.products_kt,
    ...window.products_kh,
    ...window.products_tl,
    ...window.products_vh
};

function showDetail(id) {
    const product = allProducts[id];

    if (!product) {
        alert("Không tìm thấy sản phẩm!");
        return;
    }

    document.getElementById("shop-list").style.display = "none";
    document.getElementById("product-detail").style.display = "block";

    document.querySelector(".detail-content").innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}">
        <p style="color:red;font-size:22px">${product.price}</p>
        <div>${product.content}</div>
    `;
}

// =========================
// GOOGLE TRANSLATE
// =========================

function googleTranslateElementInit() {

    new google.translate.TranslateElement(
    {
        pageLanguage: 'vi',
        autoDisplay: false
    },
    'google_translate_element'
    );

    // giữ ngôn ngữ khi chuyển trang
    const savedLang =
    localStorage.getItem("siteLang");

    if(savedLang){

        setTimeout(() => {

            changeLanguage(savedLang);

        }, 1000);
    }
}

function changeLanguage(lang){

    localStorage.setItem("siteLang", lang);

    const interval = setInterval(() => {

        const select =
        document.querySelector(".goog-te-combo");

        if(select){

            select.value = lang;

            select.dispatchEvent(
                new Event("change")
            );

            clearInterval(interval);
        }

    }, 500);
}