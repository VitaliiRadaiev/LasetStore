class Utils {
	slideUp(target, duration = 500) {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideDown(target, duration = 500) {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;
		if (display === 'none')
			display = 'block';

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideToggle(target, duration = 500) {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (window.getComputedStyle(target).display === 'none') {
				return this.slideDown(target, duration);
			} else {
				return this.slideUp(target, duration);
			}
		}
	}

	Android() {
		return navigator.userAgent.match(/Android/i);
	}
	BlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	}
	iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	}
	Opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	}
	Windows() {
		return navigator.userAgent.match(/IEMobile/i);
	}
	isMobile() {
		return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
	}

	scrollTrigger(el, value, callback) {
		let triggerPoint = document.documentElement.clientHeight / 100 * (100 - value);
		const trigger = () => {
			if(el.getBoundingClientRect().top <= triggerPoint && !el.classList.contains('is-show')) {
				if(typeof callback === 'function') {
					callback();
					el.classList.add('is-show')
				}
			}
		}
	
		trigger();
	
		window.addEventListener('scroll', trigger);
	}

	numberCounterAnim() {
		let counterItems = document.querySelectorAll('[data-number-counter-anim]');
		if (counterItems) {
	
			counterItems.forEach(item => {
				let animation = anime({
					targets: item,
					textContent: [0, item.innerText],
					round: 1,
					easing: 'linear',
					autoplay: false,
					duration: 1000
				});
	
				window.addEventListener('load', () => {
					this.scrollTrigger(item, 15, () => {animation.play()})
				})
			})
		}
	}

	initTruncateString() {
		function truncateString(el, stringLength = 0) {
			let str = el.innerText;
			if (str.length <= stringLength) return;
			el.innerText = [...str].slice(0, stringLength).join('') + '...';
		}

		let truncateItems = document.querySelectorAll('[data-truncate-string]');
		if(truncateItems.length) {
			truncateItems.forEach(truncateItem => {
				truncateString(truncateItem, truncateItem.dataset.truncateString);
			})
		}
	}
}


;
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".content__column-garden,992,2"
// https://github.com/FreelancerLifeStyle/dynamic_adapt

class DynamicAdapt {
	constructor(type) {
	  this.type = type;
	}
  
	init() {
	  this.??bjects = [];
	  this.daClassname = '_dynamic_adapt_';
	  this.nodes = [...document.querySelectorAll('[data-da]')];
  
	  this.nodes.forEach((node) => {
		const data = node.dataset.da.trim();
		const dataArray = data.split(',');
		const ??bject = {};
		??bject.element = node;
		??bject.parent = node.parentNode;
		??bject.destination = document.querySelector(`${dataArray[0].trim()}`);
		??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
		??bject.place = dataArray[2] ? dataArray[2].trim() : 'last';
		??bject.index = this.indexInParent(??bject.parent, ??bject.element);
		this.??bjects.push(??bject);
	  });
  
	  this.arraySort(this.??bjects);
  
	  this.mediaQueries = this.??bjects
		.map(({
		  breakpoint
		}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
		.filter((item, index, self) => self.indexOf(item) === index);
  
	  this.mediaQueries.forEach((media) => {
		const mediaSplit = media.split(',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];
  
		const ??bjectsFilter = this.??bjects.filter(
		  ({
			breakpoint
		  }) => breakpoint === mediaBreakpoint
		);
		matchMedia.addEventListener('change', () => {
		  this.mediaHandler(matchMedia, ??bjectsFilter);
		});
		this.mediaHandler(matchMedia, ??bjectsFilter);
	  });
	}
  
	mediaHandler(matchMedia, ??bjects) {
	  if (matchMedia.matches) {
		??bjects.forEach((??bject) => {
		  ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
		  this.moveTo(??bject.place, ??bject.element, ??bject.destination);
		});
	  } else {
		??bjects.forEach(
		  ({ parent, element, index }) => {
			if (element.classList.contains(this.daClassname)) {
			  this.moveBack(parent, element, index);
			}
		  }
		);
	  }
	}
  
	moveTo(place, element, destination) {
	  element.classList.add(this.daClassname);
	  if (place === 'last' || place >= destination.children.length) {
		destination.append(element);
		return;
	  }
	  if (place === 'first') {
		destination.prepend(element);
		return;
	  }
	  destination.children[place].before(element);
	}
  
	moveBack(parent, element, index) {
	  element.classList.remove(this.daClassname);
	  if (parent.children[index] !== undefined) {
		parent.children[index].before(element);
	  } else {
		parent.append(element);
	  }
	}
  
	indexInParent(parent, element) {
	  return [...parent.children].indexOf(element);
	}
  
	arraySort(arr) {
	  if (this.type === 'min') {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return -1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return 1;
			}
			return a.place - b.place;
		  }
		  return a.breakpoint - b.breakpoint;
		});
	  } else {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return 1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return -1;
			}
			return b.place - a.place;
		  }
		  return b.breakpoint - a.breakpoint;
		});
		return;
	  }
	}
}
;

class App {
	constructor() {
		this.utils = new Utils();
		this.dynamicAdapt = new DynamicAdapt('max');
		this.scrollAnimation = null;
		this.allRangeSliders = [];
	}

	init() {
		window.addEventListener('DOMContentLoaded', () => {
			if (this.utils.isMobile()) {
				document.body.classList.add('mobile');
			}
	
			if (this.utils.iOS()) {
				document.body.classList.add('mobile-ios');
			}

			document.body.classList.add('page-is-load');

			this.dynamicAdapt.init();
			this.headerHandler();
			this.slidersInit();
			this.popupHandler();
			this.initSmoothScroll();
			this.inputMaskInit();
			this.tabsInit();
			this.selectInit();
			this.spollerInit();
			this.zoomInit();
			//this.setFontSize();
			this.componentsScriptsBeforeLoad();
		});

		window.addEventListener('load', () => {
			this.setPaddingTopHeaderSize();
			
			this.componentsScriptsAfter();
		});

	}

	headerHandler() {
		let header = document.querySelector('[data-header]');
let burger = document.querySelector('[data-action="toggle-mobile-menu"]');
let mobileMenu = document.querySelector('[data-mobile-menu]');

if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--is-scroll', window.pageYOffset > 50);
    })

    if(burger && mobileMenu) {
        burger.addEventListener('click', (e) => {
            e.preventDefault();
            burger.firstElementChild.classList.toggle('active');
            header.classList.toggle('header--mobile-menu-open');
            document.body.classList.toggle('overflow-hidden');
            mobileMenu.classList.toggle('mobile-mune--show')
        })
    }
}
;
	}

	popupHandler() {
		// ==== Popup form handler====

const popupLinks = document.querySelectorAll('[data-popup="open-popup"]');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('[data-popup="lock-padding"]');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('[data-popup="close-popup"]');
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.popup--open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('popup--open');
		curentPopup.addEventListener('click', function(e) {
			if(!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup')); 
			}
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('popup--open');
		if(doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');
	if(targetPadding.length) {
		for (let index = 0; index < targetPadding.length; index++) {
			const el = targetPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	if(lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('overflow-hidden');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');

	setTimeout(function() {
		if(targetPadding.length) {
			for (let index = 0; index < targetPadding.length; index++) {
				const el = targetPadding[index];
				el.style.paddingRight = '0px';
			}
		}

		for( let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('overflow-hidden');
	}, timeout);

	unlock = false;
	setTimeout(function() { 
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if(e.which === 27) {
		const popupActive = document.querySelector('.popup.popup--open');
		popupClose(popupActive);
	}
});

// === Polyfill ===
	(function() {
		if(!Element.prototype.closest) {
			Element.prototype.closest = function(css) {
				var node = this;
				while(node) {
					if(node.matches(css)) return node;
					else node == node.parentElement;
				}
				return null;
			};
		}
	})();

	(function() {
		if(!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.mozMatchesSelector;
		}
	})();
// === AND Polyfill ===

// ???????????????????? API ???????????? ?? ?????????????????? ??????????????????
window.popup = {
	open(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupOpen(popup);
	},
	close(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupClose(popup);
	}
}
;
	}

	slidersInit() {
		{
    let carousels = document.querySelectorAll('[data-carousel]');
    if(carousels.length) {
        carousels.forEach(carousel => {
            let carouselSwiper = new Swiper(carousel.querySelector('.swiper'), {
                speed: 800,
                navigation: {
                    nextEl: carousel.querySelector('[data-action="btn-next"]'),
                    prevEl: carousel.querySelector('[data-action="btn-prev"]'),
                },
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                        autoHeight: true,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 25,
                    },
                },
            });
        })
    }
};
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
};
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
};
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
;
	}


	tabsInit() {
		let tabsContainers = document.querySelectorAll('[data-tabs]');
		if (tabsContainers.length) {
			tabsContainers.forEach(tabsContainer => {
				let triggerItems = tabsContainer.querySelectorAll('[data-tab-trigger]');
				let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));
				let select = tabsContainer.querySelector('[data-tab-select]');

				const getContentItem = (id) => {
					if (!id.trim()) return;
					return contentItems.filter(item => item.dataset.tabContent === id)[0];
				}

				if (triggerItems.length && contentItems.length) {
					// init
					let activeItem = tabsContainer.querySelector('.tab-active[data-tab-trigger]');
					if(activeItem) {
						activeItem.classList.add('tab-active');
						getContentItem(activeItem.dataset.tabTrigger).classList.add('tab-active');
					} else {
						triggerItems[0].classList.add('tab-active');
						getContentItem(triggerItems[0].dataset.tabTrigger).classList.add('tab-active');
					}

					triggerItems.forEach(item => {
						item.addEventListener('click', () => {
							item.classList.add('tab-active');
							getContentItem(item.dataset.tabTrigger).classList.add('tab-active');

							triggerItems.forEach(i => {
								if (i === item) return;

								i.classList.remove('tab-active');
								getContentItem(i.dataset.tabTrigger).classList.remove('tab-active');
							})
						})
					})
				}

				if(select) {
					select.addEventListener('change', (e) => {
						getContentItem(e.target.value).classList.add('tab-active');

						contentItems.forEach(item => {
							if(getContentItem(e.target.value) === item) return;

							item.classList.remove('tab-active');
						})
					})
				}
			})
		}
	}

	spollerInit() {
		let spollers = document.querySelectorAll('[data-spoller]');
		if (spollers.length) {
			spollers.forEach(spoller => {
				let isOneActiveItem = spoller.dataset.spoller.trim() === 'one' ? true : false;
				let triggers = spoller.querySelectorAll('[data-spoller-trigger]');
				if (triggers.length) {
					triggers.forEach(trigger => {
						let parent = trigger.parentElement;
						let content = trigger.nextElementSibling;

						// init
						if(trigger.classList.contains('active')) {
							content.style.display = 'block';
							parent.classList.add('active');
						}

						trigger.addEventListener('click', (e) => {
							e.preventDefault();
							parent.classList.toggle('active');
							trigger.classList.toggle('active');
							content && this.utils.slideToggle(content);

							if (isOneActiveItem) {
								triggers.forEach(i => {
									if (i === trigger) return;

									let parent = i.parentElement;
									let content = i.nextElementSibling;

									parent.classList.remove('active');
									i.classList.remove('active');
									content && this.utils.slideUp(content);
								})
							}
						})
					})
				}
			})
		}
	}

	inputMaskInit() {
		let items = document.querySelectorAll('[data-mask]');
		if (items.length) {
			items.forEach(item => {
				let maskValue = item.dataset.mask;
				let input = item.querySelector('input[type="text"]');

				if (input) {
					Inputmask(maskValue, {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
					}).mask(input);
				}
			})
		}
	}

	setPaddingTopHeaderSize() {
		let wrapper = document.querySelector('[data-padding-top-header-size]');
		if (wrapper) {
			let header = document.querySelector('[data-header]');
			if (header) {
				const setPedding = () => wrapper.style.paddingTop = header.clientHeight + 'px';
				setPedding();
				let id = setInterval(setPedding, 200);
				setTimeout(() => {
					clearInterval(id);
				}, 2000)
				window.addEventListener('resize', setPedding);
			}

		}
	}

	initSmoothScroll() {
		let anchors = document.querySelectorAll('a[href*="#"]:not([data-popup="open-popup"])');
		if (anchors.length) {
			let header = document.querySelector('.header');

			anchors.forEach(anchor => {
				if (!anchor.getAttribute('href').match(/#\w+$/gi)) return;

				let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');

				anchor.addEventListener('click', (e) => {
					let el = document.querySelector(`#${id}`);

					if (el) {
						e.preventDefault();

						if(el.closest('[data-tab-content]')) {
							let tabId = el.closest('[data-tab-content]').dataset.tabContent;
							let tabsContainer = el.closest('[data-tabs]');
							let triggers = tabsContainer.querySelectorAll('[data-tab-trigger]');
							let tabContentBoxes = tabsContainer.querySelectorAll('[data-tab-content]');

							triggers.forEach(i => {
								if(i.dataset.tabTrigger === tabId) {
									i.classList.add('tab-active');
								} else {
									i.classList.remove('tab-active');
								}
							})
							tabContentBoxes.forEach(i => {
								if(i.dataset.tabContent === tabId) {
									i.classList.add('tab-active');
								} else {
									i.classList.remove('tab-active');
								}
							})
						}

						let top = Math.abs(document.body.getBoundingClientRect().top) + el.getBoundingClientRect().top;

						if (header) {
							top = top - header.clientHeight;
						}

						window.scrollTo({
							top: top - 20,
							behavior: 'smooth',
						})
					} else {
						e.preventDefault();
						window.scrollTo({
							top: 0,
							behavior: 'smooth',
						})
					}
				})

			})
		}

	}

	selectInit() {
		{
    function _slideUp(target, duration = 500) {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
    function _slideDown(target, duration = 500) {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none')
            display = 'block';
    
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
    function _slideToggle(target, duration = 500) {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            if (window.getComputedStyle(target).display === 'none') {
                return _slideDown(target, duration);
            } else {
                return _slideUp(target, duration);
            }
        }
    }

    //Select
    let selects = document.getElementsByTagName('select');
    if (selects.length > 0) {
        selects_init();
    }
    function selects_init() {
        for (let index = 0; index < selects.length; index++) {
            const select = selects[index];
            select_init(select);
        }
        //select_callback();
        document.addEventListener('click', function (e) {
            selects_close(e);
        });
        document.addEventListener('keydown', function (e) {
            if (e.which == 27) {
                selects_close(e);
            }
        });
    }
    function selects_close(e) {
        const selects = document.querySelectorAll('.select');
        if (!e.target.closest('.select')) {
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_body_options = select.querySelector('.select__options');
                select.classList.remove('_active');
                _slideUp(select_body_options, 100);
            }
        }
    }
    function select_init(select) {
        const select_parent = select.parentElement;
        const select_modifikator = select.getAttribute('class');
        const select_selected_option = select.querySelector('option:checked');
        select.setAttribute('data-default', select_selected_option.value);
        select.style.display = 'none';

        select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

        let new_select = select.parentElement.querySelector('.select');
        new_select.appendChild(select);
        select_item(select);
    }
    function select_item(select) {
        const select_parent = select.parentElement;
        const select_items = select_parent.querySelector('.select__item');
        const select_options = select.querySelectorAll('option');
        const select_selected_option = select.querySelector('option:checked');
        const select_selected_text = select_selected_option.innerHTML;
        const select_type = select.getAttribute('data-type');
        const label = '<span class="select__label">Price:</span>';

        if (select_items) {
            select_items.remove();
        }

        let select_type_content = '';
        if (select_type == 'input') {
            select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="????????????" data-value="' + select_selected_text + '" class="select__input"></div>';
        } else {
            select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
        }

   
        select_parent.insertAdjacentHTML('beforeend',
            '<div class="select__item">' +
            `<div class="select__title">${(select.dataset.select === 'price') ? label : ''}` + select_type_content + '</div>' +
            '<div class="select__options">' + select_get_options(select_options) + '</div>' +
            '</div></div>');

        select_actions(select, select_parent);
    }
    function select_actions(original, select) {
        const select_item = select.querySelector('.select__item');
        const select_body_options = select.querySelector('.select__options');
        const select_options = select.querySelectorAll('.select__option');
        const select_type = original.getAttribute('data-type');
        const select_input = select.querySelector('.select__input');

        select_item.addEventListener('click', function () {
            let selects = document.querySelectorAll('.select');
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_body_options = select.querySelector('.select__options');
                if (select != select_item.closest('.select')) {
                    select.classList.remove('_active');
                    _slideUp(select_body_options, 100);
                }
            }
            _slideToggle(select_body_options, 100);
            select.classList.toggle('_active');
        });

        for (let index = 0; index < select_options.length; index++) {
            const select_option = select_options[index];
            const select_option_value = select_option.getAttribute('data-value');
            const select_option_text = select_option.innerHTML;

            if (select_type == 'input') {
                select_input.addEventListener('keyup', select_search);
            } else {
                if (select_option.getAttribute('data-value') == original.value) {
                    select_option.style.display = 'none';
                }
            }
            select_option.addEventListener('click', function () {
                for (let index = 0; index < select_options.length; index++) {
                    const el = select_options[index];
                    el.style.display = 'block';
                }
                if (select_type == 'input') {
                    select_input.value = select_option_text;
                    original.value = select_option_value;
                } else {
                    select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
                    original.value = select_option_value;
                    select_option.style.display = 'none';

                    let event = new Event("change", { bubbles: true });
                    original.dispatchEvent(event);
                }
            });
        }
    }
    function select_get_options(select_options) {
        if (select_options) {
            let select_options_content = '';
            for (let index = 0; index < select_options.length; index++) {
                const select_option = select_options[index];
                const select_option_value = select_option.value;
                if (select_option_value != '') {
                    const select_option_text = select_option.text;
                    select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
                }
            }
            return select_options_content;
        }
    }
    function select_search(e) {
        let select_block = e.target.closest('.select ').querySelector('.select__options');
        let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
        let select_search_text = e.target.value.toUpperCase();

        for (let i = 0; i < select_options.length; i++) {
            let select_option = select_options[i];
            let select_txt_value = select_option.textContent || select_option.innerText;
            if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
                select_option.style.display = "";
            } else {
                select_option.style.display = "none";
            }
        }
    }
    function selects_update_all() {
        let selects = document.querySelectorAll('select');
        if (selects) {
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                select_item(select);
            }
        }
    }

};
	}

	setFontSize() {
		let elements = document.querySelectorAll('[data-set-font-size]');
		if (elements.length) {
			elements.forEach(el => {
				const setFontSize = () => {
					if (document.documentElement.clientWidth > 992) {
						let value = 10 / 1920 * el.clientWidth;
						if (value > 10) value = 10;
						el.style.fontSize = value + 'px';
					}
				}

				setFontSize();

				window.addEventListener('resize', setFontSize);
			})
		}
	}

	zoomInit() {
		let zoomContainers = document.querySelectorAll('[data-zoom-container]');
        if (zoomContainers.length) {
            zoomContainers.forEach(container => {
				let zoomImages = container.querySelectorAll('[data-zoom-img]');
				if(zoomImages.length) {
					zoomImages.forEach(img => {
						new Drift(img, {
							paneContainer: container.querySelector('[data-zoom-zone]'),
							inlinePane: 900,
							inlineOffsetY: -85,
							containInline: true,
							hoverBoundingBox: true,
							zoomFactor: 2.5,
							sourceAttribute: 'data-zoom-img',
							touchDelay: this.utils.isMobile() ? 500 : 0,
						});
					})
				}
            })
        }
	}


	componentsScriptsAfter() {
		;
	}

	componentsScriptsBeforeLoad() {
		{
    let ratings = document.querySelectorAll('[data-rating]');
    if(ratings.length) {
        ratings.forEach(rating => {
            let count = rating.dataset.rating > 5 ? 5
                        : rating.dataset.rating ? rating.dataset.rating
                        : 0;
                        
            let starsLine = rating.querySelector('.rating__stars-1');

            starsLine.style.width = `calc(${count / 5 * 100}% - ${0.4}rem)`;
        })
    }
};
		;
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
} ;
		let description = document.querySelector('[data-description]');
if(description) {
    let collapseBox = description.querySelector('.description__collapse-box');
    let btn = description.querySelector('.description__btn-more');


    if(btn && collapseBox) {
        let btnStartText = btn.innerHTML;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            this.utils.slideToggle(collapseBox, 300);
            description.classList.toggle('description--text-show');

            if(description.classList.contains('description--text-show')) {
                btn.innerHTML = '????????????';
            } else {
                btn.innerHTML = btnStartText;
            }
        })
    }
};
		{
    let quantityAll = document.querySelectorAll('[data-quantity]');
    if(quantityAll.length) {
        quantityAll.forEach(quantity => {
            let buttons = quantity.querySelectorAll('.quantity__button');
            let input = quantity.querySelector('input');

            if(buttons.length && input) {
                buttons.forEach(button => {
                    button.addEventListener("click", function (e) {
                        let value = input.value;
                        if (button.classList.contains('quantity__button--plus')) {
                            value++;
                        } else {
                            value = value - 1;
                            if (value < 1) {
                                value = 1
                            }
                        }
                        input.value = value;
                    });
                })
            }
        })
    }
}
;
		let mainFilter = document.querySelector('[data-main-filter]');
if (mainFilter) {
    let filterSelects = mainFilter.querySelectorAll('.main-filter__row');
    if (filterSelects.length) {
        filterSelects.forEach(filterSelect => {

            let innerInputs = Array.from(filterSelect.querySelectorAll('input[type="radio"], input[type="checkbox"]'));
            let inputSearch = filterSelect.querySelector('.filter-select__search input');

            if (inputSearch && innerInputs) {
                const getFilterItems = (innerInputs) => {
                    return Array.from(innerInputs).map(input => {
                        return {
                            parent: input.closest('li'),
                            text: input.closest('.checkbox-radio').querySelector('.checkbox-radio__text').innerText
                        }
                    })
                }

                const applySearch = (allFilterItems, value) => {
                    let regExp = new RegExp(value, 'gi');

                    if(value.length > 0) {
                        allFilterItems.forEach(item => {
                            let result = item.text.search(regExp) != -1;

                            if(result) {
                                item.parent.style.display = 'block';
                            } else {
                                item.parent.style.display = 'none';
                            }
                        })
                    } else {
                        allFilterItems.forEach(item => {
                            item.parent.style.display = 'block';
                        })
                    }
                }

                let allFilterItems = getFilterItems(innerInputs);

                inputSearch.addEventListener('input', (e) => {
                    applySearch(allFilterItems, e.target.value.trim());
                })

            }
        })
    }

    let buttonsReset = mainFilter.querySelectorAll('.main-filter__btn-reset');
    if(buttonsReset.length) {
        buttonsReset.forEach(btnReset => {
            let form = btnReset.closest('form');

            form.addEventListener('reset', (e) => {

                if(this.allRangeSliders.length) {
                    this.allRangeSliders.forEach(rangeSlider => {
                        setTimeout(() => {
                            rangeSlider.slider.noUiSlider.set([+rangeSlider.min, +rangeSlider.max]);
                        },100);
                    })
                }
            })
        })

    }

    let btnOpenMobileFilter = document.querySelector('.main-search__btn-filter');
    if(btnOpenMobileFilter) {

        let mainMobileFilter = document.querySelector('[data-main-filter-mobile]');
        if(mainMobileFilter) {
            let closeBtn = mainMobileFilter.querySelector('.main-filter-mobile__arrow');

            if(closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    mainMobileFilter.classList.remove('main-filter-mobile--open');
                    document.body.classList.remove('overflow-hidden');
                })
            }

            btnOpenMobileFilter.addEventListener('click', () => {
   
                mainMobileFilter.classList.add('main-filter-mobile--open');
                document.body.classList.add('overflow-hidden');
            })

            mainMobileFilter.addEventListener('click', (e) => {
                if(e.target.closest('.main-filter-mobile__body')) return;
                mainMobileFilter.classList.remove('main-filter-mobile--open');
                document.body.classList.remove('overflow-hidden');
            })
        }
    }
};
		{
    let rangeAll = document.querySelectorAll('[data-range]');
    if (rangeAll.length) {
        rangeAll.forEach(range => {
            let min = range.dataset.min;
            let max = range.dataset.max;
            let numStart = range.dataset.start;
            let numEnd = range.dataset.end;
            let step = range.dataset.step;
            let slider = range.querySelector('.price-range__slider');
            let inputStart = range.querySelector('.price-range__input--start');
            let inputEnd = range.querySelector('.price-range__input--end');

            let qualityRange = range.dataset.range === 'quality' ? true : false;
            let oneThumb = range.dataset.range === 'one-thumb' ? true : false;

            noUiSlider.create(slider, {
                start: oneThumb ? +numStart : [+numStart, +numEnd],
                connect: oneThumb ? 'lower' : true,
                range: {
                    'min': [+min],
                    'max': [+max],
                },
                step: +step,
                tooltips: oneThumb,
                format: wNumb({
                    decimals: qualityRange ? 1 : 0,
                    thousand: oneThumb ? ',' : '',
                    prefix: oneThumb ? '$' : ''
                })
            });

            this.allRangeSliders.push({slider, min, max});

            let numFormat = wNumb({ decimals: 0,  thousand: ' ' });

            slider.noUiSlider.on('update', function (values, handle) {
               
                let value = values[handle].replace(/[,|$]/g, '');
                if (handle) {
                    if(qualityRange) {
                        inputEnd.value = value;
                    } else if(oneThumb) {
                        inputEnd.value = numFormat.to(Math.round(value));
                    } else {
                        inputEnd.value = numFormat.to(Math.round(value));
                    }
                } else {
                    if(qualityRange) {
                        inputStart.value = value;
                    } else if(oneThumb) {
                        inputStart.value = numFormat.to(Math.round(value));
                    } else {
                        inputStart.value = numFormat.to(Math.round(value));
                    }
                }
            }); 

            slider.noUiSlider.on('change', (values, handle) => {
                let value = values[handle];
                if (handle) {
                    let event = new Event("change", { bubbles: true });
                    inputEnd.dispatchEvent(event);
                } else {
                    let event = new Event("change", { bubbles: true });
                    inputStart.dispatchEvent(event);
                }

            })

            inputStart.addEventListener('change', function () {
                slider.noUiSlider.set([this.value, null]);
            });
            inputEnd.addEventListener('change', function () {
                slider.noUiSlider.set([null, this.value]);
            });
        })
    }

}
;

		document.querySelectorAll(".accordion__link").forEach((e=>{e&&e.addEventListener("click",(function(){this.classList.toggle("active");let e=this.nextElementSibling;e.style.maxHeight?e.style.maxHeight=null:e.style.maxHeight=e.scrollHeight+"px"}))})),document.querySelectorAll(".accordion__item-title").forEach((e=>{e&&e.addEventListener("click",(function(){this.classList.toggle("active");let e=this.nextElementSibling;e.style.maxHeight?e.style.maxHeight=null:e.style.maxHeight=e.scrollHeight+"px"}))}))
	}

}


let app = new App();
app.init();

