let tiktokVideosSlider = document.querySelector('[data-slider="tiktok-videos"]');
if(tiktokVideosSlider) {
    let sliderData = new Swiper(tiktokVideosSlider, {
        observer: true,
        observeParents: true,
        speed: 600,
        breakpoints: {
            320: {
                slidesPerView: 'auto',
                spaceBetween: 16,
            },
            992: {
                slidesPerView: 6,
                spaceBetween: 16,
            }
        },
    });
}
