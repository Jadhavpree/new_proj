document.addEventListener("DOMContentLoaded", () => {
    const animatedItems = document.querySelectorAll(".fade-in, .slide-up, .zoom-in");

    const options = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, options);

    animatedItems.forEach(item => observer.observe(item));
});
// Scroll To Top Button
const scrollBtn = document.getElementById("scrollTop");
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
