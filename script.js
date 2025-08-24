document.addEventListener("DOMContentLoaded", function () {
    // vars
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");

    const carousel = document.querySelector(".projects-carousel");
    const cards = document.querySelectorAll(".project-card");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const dotsContainer = document.querySelector(".carousel-dots");
    const carouselControls = document.querySelector(".carousel-controls");

    // events
    window.addEventListener("scroll", updateActiveNav);

    /* saber en que section estoy*/
    function updateActiveNav() {
        let current = "";
        const scrollY = window.pageYOffset;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    }

    /*el peor carrusel de proyectos de la historia*/
    function initCarousel() {
        if (!carousel || cards.length === 0) return;

        let currentIndex = 0;

        dotsContainer.innerHTML = "";
        cards.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll(".dot");

        function updateCarousel() {
            const cardWidth = cards[0].offsetWidth + 20;
            carousel.scrollTo({
                left: currentIndex * cardWidth,
                behavior: "smooth",
            });

            dots.forEach((dot, i) =>
                dot.classList.toggle("active", i === currentIndex)
            );
        }

        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, cards.length - 1));
            updateCarousel();
        }

        function nextSlide() {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        }

        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }

        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);

        let startX = 0;
        carousel.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener("touchend", (e) => {
            let endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) nextSlide();
            if (endX - startX > 50) prevSlide();
        });

        window.addEventListener("resize", updateCarousel);

        updateCarousel();
    }

    initCarousel();
});
