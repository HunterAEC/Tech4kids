// Wait until the web document structure is completely parsed and loaded
document.addEventListener("DOMContentLoaded", () => {

    /* --- 1. Top Hamburger Menu Interaction Logic --- */
    const hamburger = document.getElementById("hamburger-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            // Toggles active CSS status classes for animated visuals
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");

            // Updates modern browser accessibility states automatically
            const isExpanded = hamburger.classList.contains("active");
            hamburger.setAttribute("aria-expanded", isExpanded);
        });

        // Optimization: Close mobile navigation overlay if a user clicks outside of it
        document.addEventListener("click", (event) => {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            }
        });
    }

    /* --- 2. FAQ Page Hide/Show Accordion Interaction Logic --- */
    const accordionTriggers = document.querySelectorAll(".accordion-trigger");

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener("click", function () {
            // Toggle active visual class on the button itself
            this.classList.toggle("active");

            // Reference the immediate adjacent answer panel div
            const panel = this.nextElementSibling;

            if (panel) {
                if (panel.style.maxHeight) {
                    // Panel is currently open, contract it to zero height (Hide)
                    panel.style.maxHeight = null;
                    panel.style.paddingTop = "0";
                    panel.style.paddingBottom = "0";
                } else {
                    // Panel is currently closed, calculate natural height fluidly (Show)
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    panel.style.paddingTop = "1em";
                    panel.style.paddingBottom = "1em";
                }
            }
        });
    });
});