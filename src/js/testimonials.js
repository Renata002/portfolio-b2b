
const avatarImages = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
];

const API_URL = "https://jsonplaceholder.typicode.com/users";

/**
 * Inicializa a seção de depoimentos.
 */
export async function initTestimonials() {
    const cardsContainer = document.getElementById("testimonials-cards");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    // Impede erros caso a seção não exista na página.
    if (!cardsContainer) {
        return;
    }

    // Carrega e renderiza os depoimentos.
    await loadTestimonials(cardsContainer);

    // Configura os controles do carrossel.
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            scrollCarousel(cardsContainer, "prev");
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            scrollCarousel(cardsContainer, "next");
        });
    }

    // Atualiza o card ativo quando o tamanho da janela muda.
    window.addEventListener("resize", () => {
        updateActiveCard(cardsContainer);
    });
}

/**
 * Busca os usuários na API e cria os cards.
 */
async function loadTestimonials(cardsContainer) {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const users = await response.json();
        const firstFiveUsers = users.slice(0, 5);

        if (firstFiveUsers.length === 0) {
            showErrorMessage(cardsContainer);
            return;
        }

        cardsContainer.innerHTML = "";

        firstFiveUsers.forEach((user, index) => {
            cardsContainer.insertAdjacentHTML(
                "beforeend",
                createCardHTML(user, index)
            );
        });

        initCarouselFocus(cardsContainer);

    } catch (error) {
        console.error("Erro na seção de depoimentos:", error);
        showErrorMessage(cardsContainer);
    }
}

/**
 * Cria o HTML de cada depoimento.
 */
function createCardHTML(user, index) {
    const avatarUrl =
        avatarImages[index] ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
        )}&background=9333EA&color=fff`;

    return `
        <article class="testimonial-card">
            <div class="card-company">
                <span class="company-name">
                    ${escapeHTML(user.company.name)}
                </span>
            </div>

            <p class="card-text">
                "${escapeHTML(user.company.catchPhrase)}. 
                ${escapeHTML(user.company.bs)}."
            </p>

            <div class="card-author">
                <img
                    src="${avatarUrl}"
                    alt="Foto de ${escapeHTML(user.name)}"
                    class="author-avatar"
                    loading="lazy"
                />

                <div class="author-info">
                    <h4 class="author-name">
                        ${escapeHTML(user.name)}
                    </h4>

                    <span class="author-role">
                        Co-founder / ${escapeHTML(user.address.city)}
                    </span>
                </div>
            </div>
        </article>
    `;
}

/**
 * Escapa caracteres especiais antes de inserir dados
 * externos no HTML.
 */
function escapeHTML(value) {
    const element = document.createElement("div");
    element.textContent = value ?? "";
    return element.innerHTML;
}

/**
 * Move o carrossel para o card anterior ou próximo.
 */
function scrollCarousel(cardsContainer, direction) {
    const cards = cardsContainer.querySelectorAll(".testimonial-card");

    if (!cards.length) {
        return;
    }

    const activeCard = cardsContainer.querySelector(".testimonial-card.active");

    let currentIndex = Array.from(cards).indexOf(activeCard);

    if (currentIndex === -1) {
        currentIndex = 0;
    }

    let targetIndex;

    if (direction === "next") {
        targetIndex = Math.min(currentIndex + 1, cards.length - 1);
    } else {
        targetIndex = Math.max(currentIndex - 1, 0);
    }

    centerCard(cardsContainer, cards[targetIndex]);
}

/**
 * Centraliza um card específico dentro do carrossel.
 */
function centerCard(cardsContainer, card) {
    if (!card) {
        return;
    }

    const containerCenter =
        cardsContainer.clientWidth / 2;

    const cardCenter =
        card.offsetLeft + card.offsetWidth / 2;

    const scrollPosition =
        cardCenter - containerCenter;

    cardsContainer.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: "smooth"
    });

    // Atualiza imediatamente o estado visual.
    cardsContainer
        .querySelectorAll(".testimonial-card")
        .forEach((item) => {
            item.classList.remove("active");
        });

    card.classList.add("active");
}

/**
 * Identifica qual card está mais próximo do centro.
 */
function updateActiveCard(cardsContainer) {
    const cards =
        cardsContainer.querySelectorAll(".testimonial-card");

    if (!cards.length) {
        return;
    }

    const containerRect =
        cardsContainer.getBoundingClientRect();

    const containerCenter =
        containerRect.left + containerRect.width / 2;

    let closestCard = null;
    let minDistance = Infinity;

    cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();

        const cardCenter =
            cardRect.left + cardRect.width / 2;

        const distance = Math.abs(
            containerCenter - cardCenter
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestCard = card;
        }
    });

    cards.forEach((card) => {
        card.classList.remove("active");
    });

    if (closestCard) {
        closestCard.classList.add("active");
    }
}

/**
 * Inicializa o carrossel.
 */
function initCarouselFocus(cardsContainer) {
    const cards =
        cardsContainer.querySelectorAll(".testimonial-card");

    if (!cards.length) {
        return;
    }

    // Começa pelo card central quando houver pelo menos 3.
    const initialIndex =
        cards.length >= 3
            ? 2
            : Math.floor(cards.length / 2);

    requestAnimationFrame(() => {
        centerCard(
            cardsContainer,
            cards[initialIndex]
        );

        updateActiveCard(cardsContainer);
    });

    // Atualiza o card ativo durante o scroll.
    let scrollTimeout;

    cardsContainer.addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            updateActiveCard(cardsContainer);
        }, 80);
    });
}

/**
 * Exibe uma mensagem caso a API não esteja disponível.
 */
function showErrorMessage(cardsContainer) {
    cardsContainer.innerHTML = `
        <article class="testimonial-card active">
            <p class="card-text">
                Não foi possível carregar os depoimentos no momento.
                Tente novamente mais tarde.
            </p>
        </article>
    `;
}
