'use strict';

// Initialize EmailJS
emailjs.init('zEgOQ3Hjh_7WX4y6v');

// Helper function to toggle the 'active' class
const toggleClass = (elem, className) => elem.classList.toggle(className);

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => sidebar.classList.toggle("active"));

// Modal variables
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Open modal function
const openModal = (imgSrc, imgAlt, title, text) => {
  modalImg.src = imgSrc;
  modalImg.alt = imgAlt;
  modalTitle.textContent = title;
  modalText.textContent = text;
  modalContainer.classList.add('active');
  overlay.classList.add('active');
};


// Function to close the modal
const closeModal = () => {
  modalContainer.classList.remove('active'); // Hide modal
  overlay.classList.remove('active'); // Hide overlay
};

// Event listeners for opening and closing the modal
document.querySelectorAll('.modal-trigger').forEach(trigger => {
  trigger.addEventListener('click', function() {
    const modalId = this.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    const img = this.closest('figure').querySelector('img.expandable-image');
    const modalImg = modal.querySelector('.modal-content');

    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

document.querySelectorAll('.modal-close').forEach(closeBtn => {
  closeBtn.addEventListener('click', function() {
    const modal = this.closest('.modal');
    modal.style.display = "none";
  });
});

window.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = "none";
  }
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


// Attach event listeners to project images
const projectImages = document.querySelectorAll('.project-image');
projectImages.forEach(image => {
  image.addEventListener('click', () => {
    const imgSrc = image.src;
    const imgAlt = image.alt;
    const title = image.closest('.project-item').querySelector('.project-title').textContent;
    const text = image.closest('.project-item').querySelector('.project-category').textContent;
    openModal(imgSrc, imgAlt, title, text);
  });
});


// Ensure the modal closes when the close button or overlay is clicked
modalCloseBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
