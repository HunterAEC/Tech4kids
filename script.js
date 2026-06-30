// Wait until the DOM content is fully parsed and loaded
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            // Toggle active classes for animation styles
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");

            // Update accessibility attribute state
            const isExpanded = hamburger.classList.contains("active");
            hamburger.setAttribute("aria-expanded", isExpanded);
        });
    }
});