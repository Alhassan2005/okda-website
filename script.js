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

const sliderImages = slider.querySelectorAll("img");

let currentImage = 0;

// أول صورة
sliderImages[currentImage].classList.add("active");

// تغيير الصورة كل 4 ثواني
setInterval(() => {

    sliderImages[currentImage].classList.remove("active");

    currentImage++;

    if (currentImage >= sliderImages.length) {
        currentImage = 0;
    }

    sliderImages[currentImage].classList.add("active");

}, 4000);