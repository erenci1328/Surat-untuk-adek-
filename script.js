/* =========================================
   SURAT DIGITAL — SLIDER
========================================= */

const slides = document.querySelectorAll(".slide");
const currentSlideText = document.getElementById("currentSlide");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const dotsContainer = document.getElementById("dots");

let currentSlide = 0;


/* =========================================
   CREATE DOTS
========================================= */

slides.forEach((slide, index) => {

    const dot = document.createElement("span");

    dot.classList.add("dot");

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        goToSlide(index);
    });

    dotsContainer.appendChild(dot);
});


const dots = document.querySelectorAll(".dot");


/* =========================================
   SHOW SLIDE
========================================= */

function showSlide(index) {

    slides.forEach((slide, i) => {

        slide.classList.remove("active");

        if (i === index) {
            slide.classList.add("active");

            // Kembali ke bagian atas ketika slide berubah
            slide.scrollTop = 0;
        }

    });


    dots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === index
        );

    });


    currentSlideText.textContent = index + 1;


    // Disable tombol jika di awal/akhir

    prevBtn.disabled = index === 0;

    nextBtn.disabled = index === slides.length - 1;
}


/* =========================================
   GO TO SLIDE
========================================= */

function goToSlide(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= slides.length) {
        index = slides.length - 1;
    }

    currentSlide = index;

    showSlide(currentSlide);
}


/* =========================================
   NEXT
========================================= */

function nextSlide() {

    if (currentSlide < slides.length - 1) {

        currentSlide++;

        showSlide(currentSlide);
    }
}


/* =========================================
   PREVIOUS
========================================= */

function previousSlide() {

    if (currentSlide > 0) {

        currentSlide--;

        showSlide(currentSlide);
    }
}


/* =========================================
   BUTTON EVENTS
========================================= */

nextBtn.addEventListener(
    "click",
    nextSlide
);

prevBtn.addEventListener(
    "click",
    previousSlide
);


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "ArrowRight") {
            nextSlide();
        }

        if (event.key === "ArrowLeft") {
            previousSlide();
        }

    }
);


/* =========================================
   TOUCH / SWIPE
========================================= */

const slider = document.getElementById("slider");

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


slider.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    {
        passive: true
    }
);


function handleSwipe() {

    const swipeDistance =
        touchEndX - touchStartX;

    // Geser kiri → slide berikutnya
    if (swipeDistance < -50) {

        nextSlide();

    }

    // Geser kanan → slide sebelumnya
    if (swipeDistance > 50) {

        previousSlide();

    }
}


/* =========================================
   INITIALIZE
========================================= */

showSlide(currentSlide);
