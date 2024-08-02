'use strict';

// Initialize EmailJS
emailjs.init('zEgOQ3Hjh_7WX4y6v');

// Helper function to toggle the 'active' class
const toggleClass = (elem, className) => elem.classList.toggle(className);

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => toggleClass(sidebar, "active"));

// Modal variables
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Function to open the modal
const openModal = (imgSrc, imgAlt, title, text) => {
  console.log('Opening modal with:', imgSrc, imgAlt, title, text); // Debugging line
  modalImg.src = imgSrc;
  modalImg.alt = imgAlt;
  modalTitle.innerHTML = title;
  modalText.innerHTML = text;
  modalContainer.classList.add('active'); // Show modal
  overlay.classList.add('active'); // Show overlay
};

// Function to close the modal
const closeModal = () => {
  modalContainer.classList.remove('active'); // Hide modal
  overlay.classList.remove('active'); // Hide overlay
};

// Add click event to project items
document.querySelectorAll("[data-modal-trigger]").forEach(item => {
  item.addEventListener("click", () => {
    console.log('Clicked modal trigger'); // Debugging line
    const img = item.closest('figure').querySelector('img');
    openModal(
      img.src,
      img.alt,
      item.closest('li').querySelector(".project-title").innerHTML,
      item.closest('li').querySelector(".project-category").innerHTML
    );
  });
});

// Add click event to modal close button and overlay
modalCloseBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");

// Function to handle select box toggle
const handleSelectToggle = () => toggleClass(select, "active");

// Function to handle filtering
const filterFunc = (selectedValue) => {
  document.querySelectorAll("[data-filter-item]").forEach(item => {
    const category = item.dataset.category.toLowerCase();
    item.classList.toggle("active", selectedValue === "all" || selectedValue === category);
  });
};

// Add event to select box and items
select.addEventListener("click", handleSelectToggle);
selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const selectedValue = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    handleSelectToggle();
    filterFunc(selectedValue);
  });
});

// Add event to filter buttons
let lastClickedBtn = filterBtns[0];
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedValue = btn.innerText.toLowerCase();
    selectValue.innerText = btn.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    btn.classList.add("active");
    lastClickedBtn = btn;
  });
});

// Contact form variables
const form = document.querySelector("[data-form]");
const formBtn = document.querySelector("[data-form-btn]");

// Enable button when form is valid
form.addEventListener("input", () => {
  formBtn.disabled = !form.checkValidity();
});

// Handle form submission
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  // Use EmailJS to send the email
  emailjs.sendForm('service_b2wrdpt', 'template_43gcfah', form)
    .then(function(response) {
      console.log('Success:', response);
      alert('Your message has been sent successfully!');
      form.reset(); // Clear the form fields after submission
    }, function(error) {
      console.error('Error:', error);
      alert('There was an error sending your message. Please try again later.');
    });
});

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav links
navigationLinks.forEach(link => {
  link.addEventListener("click", () => {
    const pageToShow = link.innerHTML.toLowerCase();
    pages.forEach(page => {
      if (pageToShow === page.dataset.page) {
        page.classList.add("active");
        link.classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks.forEach(navLink => navLink.classList.remove("active"));
      }
    });
  });
});

// Add click event to testimonial items
const testimonialsItems = document.querySelectorAll('.testimonials-item');
testimonialsItems.forEach(item => {
  item.addEventListener('click', () => {
    const text = item.querySelector('.testimonials-text');
    text.classList.toggle('expanded');
  });
});
