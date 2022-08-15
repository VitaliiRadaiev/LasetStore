{
    let gallerySliders = document.querySelectorAll('[data-slider="gallery-slider"]');
    if(gallerySliders.length) {
        gallerySliders.forEach(gallery => {
            let sliderData = new Swiper(gallery, {
                observer: true,
                observeParents: true,
                speed: 600,
                breakpoints: {
                    320: {
                        slidesPerView: 'auto',
                        spaceBetween: 16,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                    }
                },
            });
        })
    }
}