
let burgerMenu = document.querySelector('.burgerMenu');

function toggleMenu (event) {
    this.classList.toggle('is-active');
    document.querySelector( ".navBurger" ).classList.toggle("is_active");
    event.preventDefault();
}

  // event
burgerMenu.addEventListener('click', toggleMenu, false);