"use strict";
/* =======================
   Variables Section
========================== */
const menuIcon = document.querySelector("#menuIcon");
const overlay = document.querySelector(".overlay");
const navIcons = document.querySelector(".nav_icons");
const closeButton = document.querySelector(".close_button");
const authIcon = document.querySelector("#authIcon");
const logoutIcon = document.querySelector("#logoutIcon");
const productItems = document.querySelectorAll(".product_item");
const heroHeadphone = document.querySelectorAll(".hero_headphone")
const heroContent = document.querySelectorAll(".hero_content")
const body = document.body;
const token = localStorage.getItem("token");
const imageElement = document.querySelector(".slider_img img");
const images = [
  "../assets/images/Mouse/Leonardo_Phoenix_A_highly_detailed_closeup_and_centrallyframed_1.jpg",
  "../assets/images/Mouse/Leonardo_Phoenix_A_highly_detailed_closeup_image_of_a_Razer_Ye_2.jpg",
  "../assets/images/Mouse/Leonardo_Phoenix_A_highly_detailed_closeup_image_of_a_Razer_ga_3.jpg",
  "../assets/images/Mouse/Leonardo_Phoenix_A_highly_detailed_realistic_illustration_of_a_1.jpg"
];

let currentIndex = 0;

/* =======================
   Functions Section
========================== */

function changeImage() {
  currentIndex = (currentIndex + 1) % images.length;

  setTimeout(() => {
    imageElement.src = images[currentIndex];
  }, 500);
}

// Show the sidebar menu
const showSidebar = () => {
  navIcons.classList.add("show-icons");
  overlay.classList.add("show-overlay");
};

// Hide the sidebar menu
const hideSidebar = () => {
  navIcons.classList.remove("show-icons");
  overlay.classList.remove("show-overlay");
};

// Handle window resize to hide sidebar if width exceeds 500px
const handleResize = () => {
  if (window.innerWidth > 500) {
    hideSidebar();
  }
};

// Handle logout functionality
const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "Auth/index.html";
};

// Initialize token-dependent UI
const initializeAuthIcons = () => {
  if (token) {
    authIcon.style.display = "none";
    logoutIcon.style.display = "block";
  }
};

// Show product items one by one when scrolling
const initializeProductAnimations = () => {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }, index * 300);
        }
      });
    },
    { threshold: 0.2 }
  );

  heroContent.forEach((item) => observer.observe(item))
  heroHeadphone.forEach((item) => observer.observe(item))
  productItems.forEach((item) => observer.observe(item));
};

/* =======================
   Event Listeners Section
========================== */

menuIcon.addEventListener("click", showSidebar);
closeButton.addEventListener("click", hideSidebar);
overlay.addEventListener("click", hideSidebar);
window.addEventListener("resize", handleResize);
logoutIcon.addEventListener("click", handleLogout);

/* =======================
   Initialization Section
========================== */

initializeAuthIcons();
initializeProductAnimations();
setInterval(changeImage, 3000);