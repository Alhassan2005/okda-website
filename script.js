// OKDA — responsive interactions and subtle motion
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');

// Mobile navigation
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuBtn.classList.toggle('is-open', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      menuBtn.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });
}

// Header state and reading progress
function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = `${progress}%`;
  if (navbar) navbar.classList.toggle('is-scrolled', window.scrollY > 35);
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

// Fade-in sections when they enter the viewport
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// About image slider: random order, supports any number of images
const aboutSlider = document.getElementById('aboutSlider');
if (aboutSlider) {
  const slides = Array.from(aboutSlider.querySelectorAll('img'));
  if (slides.length > 0) {
    // Fisher-Yates shuffle avoids biased random ordering
    for (let i = slides.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [slides[i], slides[j]] = [slides[j], slides[i]];
    }
    slides.forEach((slide) => aboutSlider.appendChild(slide));

    let activeIndex = 0;
    const counter = document.querySelector('.story-media__caption span');
    const showSlide = (index) => {
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === index);
      });
      if (counter) counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    };
    showSlide(activeIndex);
    if (slides.length > 1) {
      window.setInterval(() => {
        activeIndex = (activeIndex + 1) % slides.length;
        showSlide(activeIndex);
      }, 4200);
    }
  }
}

// Dynamic copyright year
document.getElementById('year')?.replaceChildren(String(new Date().getFullYear()));


// Product detail image viewer: opens the original image without cropping.
const productImageTrigger = document.querySelector('.product-image-trigger');
if (productImageTrigger) {
  const sourceImage = productImageTrigger.querySelector('img');
  const viewer = document.createElement('div');
  viewer.className = 'product-image-viewer';
  viewer.hidden = true;
  viewer.setAttribute('role', 'dialog');
  viewer.setAttribute('aria-modal', 'true');
  viewer.setAttribute('aria-label', 'عرض صورة السجادة بالحجم الكامل');
  viewer.innerHTML = `
    <button type="button" class="product-image-viewer__close" aria-label="إغلاق الصورة">&times;</button>
    <img class="product-image-viewer__image" alt="">
    <p class="product-image-viewer__hint">اضغط خارج الصورة أو على علامة × للإغلاق</p>
  `;
  document.body.appendChild(viewer);

  const fullImage = viewer.querySelector('.product-image-viewer__image');
  const closeButton = viewer.querySelector('.product-image-viewer__close');
  let previousFocus = null;

  const openImageViewer = () => {
    previousFocus = document.activeElement;
    fullImage.src = sourceImage.currentSrc || sourceImage.src;
    fullImage.alt = sourceImage.alt || 'صورة سجادة من عُقدة';
    viewer.hidden = false;
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  };

  const closeImageViewer = () => {
    viewer.hidden = true;
    document.body.style.overflow = '';
    fullImage.removeAttribute('src');
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  };

  productImageTrigger.addEventListener('click', openImageViewer);
  closeButton.addEventListener('click', closeImageViewer);
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) closeImageViewer();
  });
  document.addEventListener('keydown', (event) => {
    if (!viewer.hidden && event.key === 'Escape') closeImageViewer();
  });
}
