/**
 * Initializes text-based sites by loading data, including HTML files, checking for empty arrays, and setting user initials.
 * @returns {void}
 */
async function initTextSites() {
  await loadData();
  await loadUser();
  await includeHTML();
  await checkIfArrayIsEmpty();
  setUserInitials();
}


/**
 * Initializes the legal notice page.
 * @returns {void}
 */
async function initLegalNotice() {
  await initTextSites();
  loadLegalNoticeH1Html();
  loadLegalNoticeContent();
  setMenuColorToActive('legalNoticeLink');
}


/**
 * Initializes the legal notice page when offline.
 * @returns {void}
 */
async function initLegalNoticeOffline() {
  await includeHTML();
  await loadLegalNoticeH1Html();
  await loadLegalNoticeContent();
  initSideBar();
  initTopBar();
  hideArrow();
  setMenuColorToActive('legalNoticeLink');
}


/**
 * Initializes the help page.
 * @returns {void}
 */
function initHelp() {
  loadHelpH1Html();
  loadHelpContent();
}


/**
 * Initializes the privacy policy page.
 * @returns {void}
 */
async function initPrivacyPolice() {
  await initTextSites();
  loadPrivacyPolicyH1Html();
  loadPrivacyPolicyContent();
  setMenuColorToActive('privacyPolicyLink');
}


/**
 * Initializes the privacy policy page when offline.
 * @returns {void}
 */
async function initPrivacyPolicyOffline() {
  await includeHTML();
  await loadPrivacyPolicyH1Html();
  await loadPrivacyPolicyContent();
  initSideBar();
  initTopBar();
  hideArrow();
  setMenuColorToActive('privacyPolicyLink');
}


/**
 * Loads the legal notice page's main headline.
 * @returns {void}
 */
function loadLegalNoticeH1Html() {
  let smallContainer = document.getElementById('legalNoticeHeadline');
  smallContainer.innerHTML = legalNoticeH1Html();
}


/**
 * Loads the content of the legal notice page.
 * @returns {void}
 */
function loadLegalNoticeContent() {
  let container = document.getElementById('legalNoticeContentHTML');
  container.innerHTML = legalNoticeHtmlMain();
}


/**
 * Loads the help page's main headline.
 * @returns {void}
 */
function loadHelpH1Html() {
  let smallContainer = document.getElementById('helpHeadline');
  smallContainer.innerHTML = helpH1Html();
}


/**
 * Loads the content of the help page.
 * @returns {void}
 */
function loadHelpContent() {
  let container = document.getElementById('helpContentHTML');
  container.innerHTML = helpHtmlMain();
}


/**
 * Loads the privacy policy page's main headline.
 * @returns {void}
 */
function loadPrivacyPolicyH1Html() {
  let smallContainer = document.getElementById('privacyPoliceHeadline');
  smallContainer.innerHTML = privacyPolicyH1Html();
}


/**
 * Loads the content of the privacy policy page.
 * @returns {void}
 */
function loadPrivacyPolicyContent() {
  let container = document.getElementById('privacyPoliceContentHTML');
  container.innerHTML = privacyPolicyHtmlMain();
}


/**
 * Checks if the user array is empty and hides sidebar elements accordingly.
 * @returns {void}
 */
function checkIfArrayIsEmpty() {
  if (!user.length > 0) {
    document.getElementById('sidebarMenu').classList.add('d-none');
    document.getElementById('arrowContainer').classList.add('d-none');
  }
}


/**
 * Initializes the sidebar by populating it with HTML content.
 * @returns {void}
 */
function initSideBar() {
  let container = document.getElementById('sideBarContainer');
  container.innerHTML = sideBarHtml();
}


/**
 * Initializes the top bar by populating it with HTML content.
 * @returns {void}
 */
function initTopBar() {
  let container = document.getElementById('topBarContainer');
  container.innerHTML = topBarHtml();
}


/**
 * Hides the arrow container.
 * @returns {void}
 */
function hideArrow() {
  let arrowContainer = document.getElementById('arrowContainer');
  arrowContainer.classList.add('d-none');
}
