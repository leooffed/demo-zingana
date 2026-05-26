// --- Scroll Animations (Intersection Observer) ---
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(".fade-in-up");
  animatedElements.forEach((el) => observer.observe(el));
});

// --- Navbar Sticky & Mobile Toggle ---
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

navToggle.addEventListener("click", () => {
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
  } else {
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = "column";
    navLinks.style.position = "absolute";
    navLinks.style.top = "70px";
    navLinks.style.left = "0";
    navLinks.style.width = "100%";
    navLinks.style.background = "#111827";
    navLinks.style.padding = "20px";
    navLinks.style.textAlign = "center";
  }
});

// --- Booking Logic ---
function scrollToBooking() {
  const bookingSection = document.getElementById("booking");
  bookingSection.scrollIntoView({ behavior: "smooth" });
}

function prefillBooking(roomType) {
  const select = document.getElementById("roomSelect");
  select.value = roomType;
  scrollToBooking();
  showToast(`Selected: ${roomType}`);
}

function handleBooking(e) {
  e.preventDefault();
  // In a real app, this would send data to a server
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.innerText;

  btn.innerText = "Processing...";
  btn.disabled = true;

  setTimeout(() => {
    showToast("Reservation Request Sent Successfully!");
    e.target.reset();
    btn.innerText = originalText;
    btn.disabled = false;
  }, 1500);
  // open whatsapp logic could go here, for now we just show a toast
  showToast("Opening WhatsApp...");
  // Example WhatsApp link (replace with actual number and message)
  window.open("https://wa.me/237671809395?text=I%20would%20like%20to%20book%20a%20room!", "_blank");
}

// --- Lightbox Logic ---
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

function openLightbox(element) {
  const imgParams = element.querySelector("img").src;
  // Get higher res image logic could go here, for now we use same src
  lightboxImg.src = imgParams;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeLightbox(event) {
  // Close if clicked on overlay or close button
  if (event.target !== lightboxImg) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// --- Toast Notification ---
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.className = "show";
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

// --- Date Defaults (Set min date to today) ---
const today = new Date().toISOString().split("T")[0];
document.getElementById("checkInHero").setAttribute("min", today);
document.getElementById("checkInFull").setAttribute("min", today);
