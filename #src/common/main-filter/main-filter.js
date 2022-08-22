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
}