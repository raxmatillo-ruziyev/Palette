const items = document.querySelectorAll("[data-reveal]");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
} else {
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                el.style.animationDelay = (el.dataset.delay || 0) + "ms";
                el.classList.add("is-visible");
                io.unobserve(el);
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((el) => io.observe(el));
}