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
