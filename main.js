(function() {

  var _className = "dm-enabled";
  const _css = `
    .${_className} {
      filter:invert(100%);
    }

    .${_className} #docs-branding-container,
    .${_className} #docs-titlebar-share-client-button,
    .${_className} .app-switcher-button-icon-container,
    .${_className} .onegoogle-material-minibar,
    .${_className} .docs-sheet-tab-name,
    .${_className} #docs-butterbar-container,
    .${_className} #docs-titlebar-share-client-button,
    .${_className} .waffle-assistant-entry-label,
    .${_className} .docs-icon-img-container docs-icon-img docs-icon-explore-green,
    .${_className} .docs-action-new-badge,
    .${_className} .docs-sheet-tab-dropdown,
    .${_className} .docs-action-updated-dot,
    .${_className} button,
    .${_className} img {
      filter:invert(100%);
    }
  `;

  var _containerSelector = ".docs-titlebar-badges"
  var _starSelector = ".docs-star-container"
  var _theme = "default";

  var _storageKey = "sheets-dark-mode-enabled";

  let _styleElement = document.createElement("style");
  _styleElement.innerText = _css;


  var _toolbarButtonContainer = document.createElement("div");
  _toolbarButtonContainer.className = "goog-inline-block";

  var _enterModeButton = document.createElement("div");
  _toolbarButtonContainer.appendChild(_enterModeButton);
  _enterModeButton.style = `
    background: transparent;
    border: 0;
    font-size: 18px;
    line-height: 26px;
    opacity: 0.5;
    color: #737373;
    cursor: pointer;
  `;
  _enterModeButton.className = "goog-inline-block"
  _enterModeButton.innerText = "☾";
  _enterModeButton.dataset.tooltip = "Enter dark mode";
  _enterModeButton.addEventListener("mouseover", function() {
    this.style.opacity = 1;
  });
  _enterModeButton.addEventListener("mouseout", function() {
    this.style.opacity = 0.5;
  });
  _enterModeButton.addEventListener("click", toggleMode);

  function toggleMode() {
    document.body.classList.toggle(_className);
    if (document.body.classList.contains(_className)) {
      localStorage.setItem(_storageKey, true)
    } else {
      localStorage.removeItem(_storageKey)
    } 
  }

  function handleOnLoad() {
    document.head.appendChild(_styleElement);
    let containerElement = document.querySelector(_containerSelector);
    let starElement = document.querySelector(_starSelector);
    if (containerElement && starElement && window.location.href.indexOf("spreadsheet") != -1) {
      setTimeout(function() {
        containerElement.insertBefore(_toolbarButtonContainer, starElement.nextSibling);
      }, 500)
    }

    if (localStorage.getItem(_storageKey)) {
      document.body.classList.add(_className);
    }
  }

  document.addEventListener("DOMContentLoaded", handleOnLoad);
  if (document.body) {
    handleOnLoad();
  }
})();