
export function initMenuToggle() {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    // Verifica se os elementos existem antes de continuar
    if (!menuToggle || !navMenu) {
        return;
    }

    // Define o estado inicial do menu
    menuToggle.setAttribute("aria-expanded", "false");

    // Abre e fecha o menu
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");

        // Atualiza a acessibilidade
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Fecha o menu ao clicar em qualquer link
    const navLinks = navMenu.querySelectorAll(".nav-links a");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // Fecha o menu ao pressionar a tecla Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.focus();
        }
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", (event) => {
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            navMenu.classList.contains("active")
        ) {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}

