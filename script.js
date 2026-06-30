/**
 * Tech4Kids - Master Interactive Script (2026)
 * Handles Global Navigation, Form Actions, and Interactive UX Component States
 */

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. MOBILE MENU NAVIGATION (HAMBURGER TOGGLE) ---
    const hamburgerToggle = document.getElementById("hamburger-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (hamburgerToggle && navMenu) {
        hamburgerToggle.addEventListener("click", () => {
            const isExpanded = hamburgerToggle.getAttribute("aria-expanded") === "true";

            // Toggle accessibility states
            hamburgerToggle.setAttribute("aria-expanded", !isExpanded);

            // Toggle active classes for CSS animations
            hamburgerToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close mobile menu if a user clicks outside of it
        document.addEventListener("click", (event) => {
            if (!navMenu.contains(event.target) && !hamburgerToggle.contains(event.target)) {
                hamburgerToggle.setAttribute("aria-expanded", "false");
                hamburgerToggle.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    }

    // --- 2. DYNAMIC NAV LINK HIGHLIGHTING ---
    // Safely updates active menu highlighting based on current window file structures
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-menu ul li a");

    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        if (currentPath === linkHref || (currentPath === "" && linkHref === "index.html")) {
            link.classList.add("active");
        } else {
            // Remove hardcoded active classes from other pages if they clash
            if (currentPath !== "") {
                link.classList.remove("active");
            }
        }
    });

    // --- 3. INTERACTIVE FAQ ACCORDION TRANSITIONS ---
    // If you add a wrapping container with a class to your FAQs, this handles smooth click expanding
    const faqContainers = document.querySelectorAll(".faq-content div");

    faqContainers.forEach(container => {
        const questionElement = container.querySelector("h3");
        const answerElement = container.querySelector("p");

        if (questionElement && answerElement) {
            // Set up initial inline styles for transition performance
            questionElement.style.cursor = "pointer";
            questionElement.style.userSelect = "none";
            answerElement.style.display = "none";
            answerElement.style.transition = "all 0.3s ease";
            answerElement.style.marginTop = "0.5rem";
            answerElement.style.color = "#4A5568";

            questionElement.addEventListener("click", () => {
                const isHidden = answerElement.style.display === "none";

                // Toggle display parameters smoothly
                answerElement.style.display = isHidden ? "block" : "none";
                questionElement.style.opacity = isHidden ? "0.8" : "1";
            });
        }
    });

    // --- 4. VOLUNTEER & CONTACT FORM CAPTURE VALIDATION ---
    const registrationForm = document.querySelector(".form-section form, .contact-section form");

    if (registrationForm) {
        registrationForm.addEventListener("submit", (e) => {
            // Prevent the default browser page crash/refresh behavior
            e.preventDefault();

            // Gather standard input field contexts
            const userEmail = registrationForm.querySelector("input[type='email']");
            const firstName = registrationForm.querySelector("input[id='fname']");

            if (userEmail && userEmail.value.trim() !== "") {
                const nameDisplay = firstName ? firstName.value : "there";
                const formParent = registrationForm.parentElement;

                // Smoothly swap form visual parameters with success notification layouts
                formParent.innerHTML = `
                    <div class="success-message" style="
                        text-align: center; 
                        padding: 3rem 1.5rem; 
                        background: #F0BDF6; 
                        border: 2px solid var(--primary-color, #7026b8); 
                        border-radius: 8px;
                        margin: 2rem 0;
                    ">
                        <h2 style="color: var(--primary-color, #7026b8); margin-bottom: 1rem;">✨ Application Received!</h2>
                        <p style="font-size: 1.1rem; color: #2D3748;">Thank you, <strong>${nameDisplay}</strong>. We've sent a configuration overview and verification packet link directly to <strong>${userEmail.value}</strong>.</p>
                        <p style="margin-top: 1rem; font-size: 0.95rem; color: #4A5568;">Our volunteer coordinators will review your lab selections within 48 business hours.</p>
                    </div>
                `;
            }
        });
    }
});