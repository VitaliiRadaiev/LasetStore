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
