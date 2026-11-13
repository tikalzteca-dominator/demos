(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setNav(open) {
    if (!toggle || !nav) {
      return;
    }
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    var label = toggle.querySelector(".nav-toggle-label");
    if (label) {
      label.textContent = open ? "Close" : "Menu";
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (!event.target.closest("a")) {
        return;
      }
      // Close after the browser follows the anchor. Hiding the link
      // during the click cancels that navigation.
      window.requestAnimationFrame(function () {
        setNav(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        toggle.focus();
      }
    });
  }

  var form = document.getElementById("notify-form");
  var input = document.getElementById("email");
  var error = document.getElementById("email-error");
  var thanks = document.getElementById("thanks");

  if (!form || !input || !error || !thanks) {
    return;
  }

  input.addEventListener("input", function () {
    if (input.getAttribute("aria-invalid") === "true") {
      input.removeAttribute("aria-invalid");
      error.hidden = true;
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var value = input.value.trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!valid) {
      error.textContent = value.length
        ? "That does not look like an email address. Use a format such as name@example.com."
        : "Enter an email address to continue.";
      error.hidden = false;
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }

    error.hidden = true;
    input.removeAttribute("aria-invalid");
    form.hidden = true;
    thanks.hidden = false;

    var heading = thanks.querySelector("h3");
    if (heading) {
      heading.focus();
    }
  });
})();
