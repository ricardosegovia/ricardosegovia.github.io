(function () {
  var storageKey = "site-language";
  var supported = ["en", "es"];
  var root = document.documentElement;
  var segments = document.querySelectorAll("[data-lang]");
  var tabs = document.querySelectorAll("[data-set-language]");

  function isSupported(language) {
    return supported.indexOf(language) !== -1;
  }

  function preferredLanguage() {
    var saved = null;

    try {
      saved = window.localStorage.getItem(storageKey);
    } catch (error) {
      saved = null;
    }

    if (isSupported(saved)) {
      return saved;
    }

    if (window.navigator.language && window.navigator.language.toLowerCase().indexOf("es") === 0) {
      return "es";
    }

    return "en";
  }

  function setLanguage(language) {
    if (!isSupported(language)) {
      return;
    }

    root.setAttribute("lang", language);
    root.setAttribute("data-language", language);

    try {
      window.localStorage.setItem(storageKey, language);
    } catch (error) {
      // The selector still works for the current page when storage is unavailable.
    }

    Array.prototype.forEach.call(segments, function (segment) {
      segment.hidden = segment.getAttribute("data-lang") !== language;
    });

    Array.prototype.forEach.call(tabs, function (tab) {
      var isActive = tab.getAttribute("data-set-language") === language;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  Array.prototype.forEach.call(tabs, function (tab) {
    tab.addEventListener("click", function () {
      setLanguage(tab.getAttribute("data-set-language"));
    });
  });

  setLanguage(preferredLanguage());
})();
