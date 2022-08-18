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
                btn.innerHTML = 'Скрыть';
            } else {
                btn.innerHTML = btnStartText;
            }
        })
    }
}