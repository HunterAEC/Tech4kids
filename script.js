document.addEventListener("DOMContentLoaded", () => {
    const hamburgerToggle = document.getElementById("hamburger-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (hamburgerToggle && navMenu) {
        hamburgerToggle.addEventListener("click", () => {
            const isExpanded = hamburgerToggle.getAttribute("aria-expanded") === "true";
            hamburgerToggle.setAttribute("aria-expanded", !isExpanded);
            hamburgerToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.addEventListener("click", (event) => {
            if (!navMenu.contains(event.target) && !hamburgerToggle.contains(event.target)) {
                hamburgerToggle.setAttribute("aria-expanded", "false");
                hamburgerToggle.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    }

    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-menu ul li a");

    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        if (currentPath === linkHref || (currentPath === "" && linkHref === "index.html")) {
            link.classList.add("active");
        } else if (currentPath !== "") {
            link.classList.remove("active");
        }
    });

    const faqContainers = document.querySelectorAll(".faq-section .faq-item");

    faqContainers.forEach(container => {
        const questionElement = container.querySelector("h3");
        const answerElement = container.querySelector("p");

        if (questionElement && answerElement) {
            questionElement.style.cursor = "pointer";
            questionElement.style.userSelect = "none";
            answerElement.style.display = "none";
            answerElement.style.transition = "all 0.3s ease";
            answerElement.style.marginTop = "0.5rem";
            answerElement.style.color = "#4A5568";

            questionElement.addEventListener("click", () => {
                const isHidden = answerElement.style.display === "none";
                answerElement.style.display = isHidden ? "block" : "none";
                questionElement.style.opacity = isHidden ? "0.8" : "1";
            });
        }
    });

    const registrationForm = document.querySelector(".form-section form, .contact-section form");

    if (registrationForm) {
        registrationForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const userEmail = registrationForm.querySelector("input[type='email']");
            const firstName = registrationForm.querySelector("input[id='fname']");

            if (userEmail && userEmail.value.trim() !== "") {
                const nameDisplay = firstName ? firstName.value : "there";
                const formParent = registrationForm.parentElement;

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