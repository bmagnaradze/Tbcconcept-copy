document.addEventListener('DOMContentLoaded', function () {
  loadComponent(
    'components/header/header.html',
    'header-placeholder',
    function () {
      initDropdowns();
    }
  );
  loadComponent('components/main/main.html', 'main-placeholder');
  loadComponent(
    'components/footer/footer.html',
    'footer-placeholder',
    function () {
      initFooterDropdowns();
    }
  );
});

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
