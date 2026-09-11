
/* =========================================================
   SCRIPT PRINCIPAL
   Inicializa todas as funcionalidades do projeto
   ========================================================= */

import { initMenuToggle } from "./src/js/nav.js";
import { initTestimonials } from "./src/js/testimonials.js";

/**
 * Inicializa as funcionalidades da página.
 */
function initApp() {
    try {
        initMenuToggle();
    } catch (error) {
        console.error("Erro ao inicializar o menu:", error);
    }

    try {
        initTestimonials();
    } catch (error) {
        console.error("Erro ao inicializar os depoimentos:", error);
    }
}

/**
 * Aguarda o carregamento do HTML antes de iniciar
 * as funcionalidades.
 */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

