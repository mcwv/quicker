// content.js

(function() {
  window.addEventListener('load', () => {
    const dl = document.querySelector('a[href*="/download/"]');
    if (dl) {
      window.location.href = dl.href;
      setTimeout(() => window.close(), 5000);
    }
  });
})();
