document.addEventListener('DOMContentLoaded', function () {
  loadComponent('components/header.html', 'header-placeholder');
  loadComponent('components/main.html', 'main-placeholder');
  loadComponent('components/footer.html', 'footer-placeholder');

  document
    .getElementById('changeTextButton')
    .addEventListener('click', function () {
      alert('Button clicked!');
    });
});

function loadComponent(url, placeholderId) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById(placeholderId).innerHTML = data;
    })
    .catch((error) => console.error('Error loading component:', error));
}
