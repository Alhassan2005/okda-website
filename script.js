// ================= OKDA Website JavaScript =================

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Navbar effect on scroll
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

const slider = document.querySelector(".about-slider");
const images = Array.from(slider.querySelectorAll("img"));

// خلط الصور بشكل عشوائي
images.sort(() => Math.random() - 0.5);

// إعادة ترتيب الصور داخل السلايدر
images.forEach(img => {
    slider.appendChild(img);
});

const slider = document.querySelector(".about-slider");

if (slider) {
    const images = Array.from(slider.querySelectorAll("img"));

    if (images.length > 0) {

        // ترتيب الصور بشكل عشوائي عند كل تحميل للموقع
        images.sort(() => Math.random() - 0.5);

        // إعادة ترتيب الصور داخل السلايدر
        images.forEach(img => {
            slider.appendChild(img);
        });

        let currentImage = 0;

        // إظهار أول صورة
        images[currentImage].classList.add("active");

        // تغيير الصورة تلقائيًا
        setInterval(() => {

            images[currentImage].classList.remove("active");

            currentImage++;

            // يرجع لأول صورة بعد آخر صورة
            if (currentImage >= images.length) {
                currentImage = 0;
            }

            images[currentImage].classList.add("active");

        }, 4000);
    }
}
