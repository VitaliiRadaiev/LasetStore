{
    let quiz = document.querySelector('[data-quiz]');
    if(quiz) {
        let progressValue = quiz.querySelector('.quiz__progress-value span');
        let sliderData = new Swiper(quiz.querySelector('.swiper'), {
            effect: 'fade',
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 600,
            touchRatio: 0,
            autoHeight: true,
            pagination: {
            	el: quiz.querySelector('.swiper-pagination'),
            	type: "progressbar",
            },
            navigation: {
                nextEl: quiz.querySelector('.quiz__btn-next'),
                prevEl: quiz.querySelector('.quiz__btn-prev'),
            },
            on: {
                slideChange: (swiperData) => {
                    if(progressValue) {
                        progressValue.innerHTML = (Math.round(swiperData.progress * 100)) + '%';
                    }

                    let progress = quiz.querySelector('.swiper-pagination-progressbar-fill');
                    if(progress) {
                        progress.style.width = (Math.round(swiperData.progress * 100)) + '%';
                    }
                }
            }
        });
    }
} 