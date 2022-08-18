let productPreviewSliderThumbs = document.querySelector('[data-slider="product-images-thumbs"]');
let productPreviewSliderImages = document.querySelector('[data-slider="product-images-slider"]');
if (productPreviewSliderThumbs && productPreviewSliderImages) {

    let swiperProductPreviewSliderThumbs = new Swiper(productPreviewSliderThumbs.querySelector('.swiper'), {
        spaceBetween: 15,
        direction: 'vertical',
        slidesPerView: 5,
        slidesPerGroup: 2,
        freeMode: true,
        navigation: {
            nextEl: productPreviewSliderThumbs.querySelector('[data-action="slider-next"]'),
        },
    });

    let swiperProductPreviewSliderImages = new Swiper(productPreviewSliderImages.querySelector('.swiper'), {
        spaceBetween: 20,
        thumbs: {
            swiper: swiperProductPreviewSliderThumbs
        },
        preloadImages: false,
        pagination: {
        	el: productPreviewSliderImages.querySelector('.swiper-pagination'),
        	clickable: true,
        },
    });
}