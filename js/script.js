import { offerSlidesData } from '../data/offer-data.js';
import { productSlidesData } from '../data/product-data.js';
import { awardSlidesData } from '../data/award-data.js';

function loadComponent(url, placeholderId, callback) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById(placeholderId).innerHTML = data;
      if (callback) {
        callback();
      }
    })
    .catch((error) => console.error('Error loading component:', error));
}

function initDropdowns() {
  const dropdownContent = {
    products: `
        <a href="#" class="header_dropdown-link">პროდუქტების მიმოხილვა</a>
        <a href="#" class="header_dropdown-link">ნაკრები</a>
        <a href="#" class="header_dropdown-link">პირადი ბანკირი</a>
      `,
    offers: `
        <a href="#" class="header_dropdown-link">მიმოხილვა</a>
        <a href="#" class="header_dropdown-link">შეთავაზებები</a>
        <a href="#" class="header_dropdown-link">ღონისძიებები</a>
      `,
    concept: `
        <a href="#" class="header_dropdown-link">მიმოხილვა</a>
        <a href="#" class="header_dropdown-link">კაფე</a>
        <a href="#" class="header_dropdown-link">ბიბლიოთეკა</a>
        <a href="#" class="header_dropdown-link">კონცეპტ ფილიალები</a>
      `,
  };

  const toggles = document.querySelectorAll('.header_dropdown-toggle');
  const unifiedDropdownContainer = document.querySelector(
    '.unified_dropdown_container'
  );
  const dropdownLinksContainer = document.querySelector('.dropdown_links');

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const dropdownType = this.dataset.dropdown;

      if (
        unifiedDropdownContainer.style.display === 'flex' &&
        unifiedDropdownContainer.dataset.activeDropdown === dropdownType
      ) {
        unifiedDropdownContainer.style.display = 'none';
        unifiedDropdownContainer.dataset.activeDropdown = '';
      } else {
        dropdownLinksContainer.innerHTML = dropdownContent[dropdownType];
        unifiedDropdownContainer.style.display = 'flex';
        unifiedDropdownContainer.dataset.activeDropdown = dropdownType;
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (
      !e.target.closest('.header_dropdown') &&
      !e.target.closest('.unified_dropdown_container')
    ) {
      unifiedDropdownContainer.style.display = 'none';
      unifiedDropdownContainer.dataset.activeDropdown = '';
    }
  });
}

function initFooterDropdowns() {
  const dropdownToggles = document.querySelectorAll('.footer_dropdown-toggle');

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const dropdownList = this.nextElementSibling;
      dropdownList.classList.toggle('show');
      this.classList.toggle('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  Promise.all([
    new Promise((resolve) => {
      loadComponent(
        'components/main/main.html',
        'main-placeholder',
        function () {
          resolve();
        }
      );
    }),
    new Promise((resolve) => {
      loadComponent(
        'components/header/header.html',
        'header-placeholder',
        function () {
          initDropdowns();
          resolve();
        }
      );
    }),
    new Promise((resolve) => {
      loadComponent(
        'components/footer/footer.html',
        'footer-placeholder',
        function () {
          initFooterDropdowns();
          resolve();
        }
      );
    }),
  ]).then(() => {
    initSwiper();
  });
});

function initSwiper() {
  const swiperOffers = new Swiper('.swiper-offers', {
    cssMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
  });

  const swiperProducts = new Swiper('.swiper-products', {
    cssMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
  });

  const swiperAwards = new Swiper('.swiper-awards', {
    cssMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
  });

  fetchSlides('offers', swiperOffers);
  fetchSlides('products', swiperProducts);
  fetchSlides('awards', swiperAwards);
}

function fetchSlides(type, swiper) {
  let slidesData;
  let swiperWrapperClass;
  switch (type) {
    case 'products':
      slidesData = productSlidesData;
      swiperWrapperClass = 'swiper-wrapper-products';
      break;
    case 'offers':
      slidesData = offerSlidesData;
      swiperWrapperClass = 'swiper-wrapper-offers';
      break;
    case 'awards':
      slidesData = awardSlidesData;
      swiperWrapperClass = 'swiper-wrapper-awards';
      break;
    default:
      console.error('Unknown slide type:', type);
      return;
  }

  const swiperWrapper = document.querySelector(`.${swiperWrapperClass}`);

  if (!swiperWrapper) {
    console.error(`Swiper wrapper for ${type} not found.`);
    return;
  }

  swiperWrapper.innerHTML = '';

  slidesData.forEach((slide) => {
    const slideElement = document.createElement('div');
    slideElement.classList.add('swiper-slide');

    const contentHTML =
      type === 'awards'
        ? `
      <div class="award">
        
        <div class="product-card_content">
          <img src="${slide.imgSrc}" class="award_logo" alt="Award Image">

          <h3 class="card-title">${slide.title}</h3>
          <p class="card-description">${slide.description}</p>
        </div>
      </div>
    `
        : `
      <div class="product-card">
        <div class="product-card_img-wrapper">
          <img src="${slide.imgSrc}" alt="${
            type === 'products' ? 'Product Image' : 'Offer Image'
          }">
          ${
            slide.logo
              ? `<div class="logo"><img src="${slide.logo}" alt="logo"></div>`
              : ''
          }
        </div>
        <div class="product-card_content">
          <h3 class="card-title">${slide.title}</h3>
          <div class="category-wrap">
            <p class="card-category">${slide.category || slide.description}</p>
          </div>
        </div>
      </div>
    `;

    slideElement.innerHTML = contentHTML;
    swiperWrapper.appendChild(slideElement);
  });

  swiper.update();
}
