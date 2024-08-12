/**
 * Generates HTML content for the sidebar.
 * @returns {string} The HTML content for the sidebar.
 */
function sideBarHtml(){
    return `
    <section class="main">
    <a href="./logIn.html">
      <div class="logo">
        <img src="assets/img/icons/logo-white.svg" alt="Join Logo" />
      </div>
    </a>
    <section class="notes">
      <a href="./privacyPolicyOffline.html" id="privacyPolicyLink" class="noteLink">Privacy Policy</a>
      <a href="./legalNoticeOffline.html" id="legalNoticeLink" class="noteLink">Legal Notice</a>
    </section>
  </section>
    `
}


/**
 * Generates HTML content for the top bar.
 * @returns {string} The HTML content for the top bar.
 */
function topBarHtml(){
return `
<section class="topbar" id="topbarSection">
        <div class="topbar-left">
          <p>Kanban Project Management Tool</p>
        </div>
      </section>

      <div id="topbar-dropdown">
        <div class="dropdown-content">
          <a href="./legalNotice.html"><p>Legal Notice</p></a>
        </div>
        <div class="dropdown-content">
          <a href="./privacyPolice.html"><p>Privacy Policy</p></a>
        </div>
        <div class="dropdown-content">
          <a href="./help.html"><p>Help</p></a>
        </div>
        <div class="dropdown-content">
          <a href="./logIn.html"><p>Log out</p></a>
        </div>
      </div>

      <section class="topbarMobile" style="display: none;">
        <div class="topbarLeftMobile">
            <a href="#">
          <img src="assets/img/icons/logo-black.svg" alt="">
        </a>
        </div>
      </section>
`
}