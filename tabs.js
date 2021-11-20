const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

let tabFocus = 0;

function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  const keyPressed = e.keyCode;

  if (keyPressed === keydownLeft || keyPressed === keydownRight) {
    tabs[tabFocus % tabs.length].setAttribute("tabindex", -1);

    if (keyPressed === keydownLeft) {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    } else if (keyPressed === keydownRight) {
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    }

    tabs[tabFocus % tabs.length].setAttribute("tabindex", 0);
    tabs[tabFocus % tabs.length].focus();
  }
}

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetImage = targetTab.getAttribute("data-image");

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  // Tab selected
  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);
  targetTab.setAttribute("aria-selected", true);

  // Content swap
  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);

  // Image swap
  hideContent(mainContainer, 'picture');
  showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute('hidden');
}
