document.querySelector('.hamburger-menu').addEventListener('click', function () {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
});

const contentToggle = document.querySelectorAll('.toggle-content');

contentToggle.forEach(item => {
    item.addEventListener('click', function () {
        this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block';
    });
});
