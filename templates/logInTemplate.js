/**
 * Generates HTML content for the login screen.
 * @returns {string} The HTML content for the login screen.
 */
function logInHtml() {
  return /*html*/ ` 
  <form action="" id="loginScreenBody" class="loginScreenBody" onsubmit="loadUser(); return false" name="logIn">
    <div class="h1Box dp-flex fd-colum">
      <h1>Log in</h1>
      <img src="./assets/img/icons/blueUnderline.svg" alt="" class="blueUnderline"/>
     </div>
    <div class="dp-flex fd-colum InputAndRememberBox" id="inputMainBox">
      <div class="logInInputFieldContainer">
        <div class="inputFieldBox">
          <input type="email" class="logInInputField" placeholder="Email" id="email" minlength="5" required />
          <img src="./assets/img/icons/mail.svg" alt="" class="logInInputImgMail"/>
        </div>
        <div class="inputFieldBox">
          <input type="password" class="logInInputField" placeholder="Password" autocomplete="on" id="password" minlength="1" required />
          <img src="./assets/img/icons/lock.svg" alt="" class="logInInputImgLock" id="passwordIcon" onclick="toggleShowPassword('password', 'passwordIcon')">
        </div>  
      </div>
      <div class="passwordIsntCorrect d-none" id="passwordDontMatch">Wrong password Ups! Try again.</div>
      <div class="checkboxBox" id="checkboxBox">
        <div class="gap8 dp-flex remembermeWidth">
          <input type="checkbox" id="checkboxSavePassword" class="checkboxSavePassword" />
          <label for="checkboxSavePassword" ></label>
          <p class="rememberMeFont">Remember me</p>
        </div>
      </div>
    </div>
    <div class="ButtonBox dp-flex">
      <button class="buttonGrey buttonLogin" id="logInBtn">
        Log in
      </button>
      <button class="buttonWhite buttonLogin" onclick="logInGuest()">
        Guest Log in
      </button>
    </div>
    </form>
  `;
}


/**
 * Generates HTML content for the signup form.
 * @returns {string} The HTML content for the signup form.
 */
function signupHtml() {
  return /*html*/ `
    <form action="" id="signUpBody" class="signUpBody" onsubmit="signUp(); return false">
      <img src="./assets/img/icons/blueArrowLeft.svg" class="arrowLeftIcon" onclick="loadLogIn()">   
      <div class="h1Box dp-flex fd-colum">
          <h1>Sign up</h1>
          <img src="./assets/img/icons/blueUnderline.svg" alt="" class="blueUnderline" />
      </div>
      <div class="dp-flex fd-colum InputAndRememberBox">
          <div class="inputFieldContainerSignUp" id="inputFieldContainerSignUp">
              <div class="inputFieldBox">
                  <input type="text" class="logInInputField" placeholder="Name" id="userName" autocomplete="on" required/>
                  <img src="./assets/img/icons/person.svg" alt="" class="logInInputImgMail" />
              </div>
              <div class="inputFieldBox">
                  <input type="email" class="logInInputField" placeholder="Email" id="emailSignUp" autocomplete="on" required/>
                  <img src="./assets/img/icons/mail.svg" alt="" class="logInInputImgMail" />
              </div>
              <div class="inputFieldBox">
                  <input type="password" class="logInInputField" placeholder="Password" id="passwordSignUp" autocomplete="on" required/>
                  <img src="./assets/img/icons/lock.svg" alt="" class="logInInputImgLock1" id="signUpPasswordIcon1" onclick="toggleShowPassword('passwordSignUp', 'signUpPasswordIcon1')"/>
              </div>
              <div class="inputFieldBox">
                  <input type="password" class="logInInputField" placeholder="Confirm Password" id="checkPasswordSignUp" autocomplete="on" required onkeyup="checkMatchPassword();"/>
                  <img src="./assets/img/icons/lock.svg" alt="" class="logInInputImgLock1" id="signUpPasswordIcon2" onclick="toggleShowPassword('checkPasswordSignUp', 'signUpPasswordIcon2')" />
              </div> 
          </div>
          <div class="passwordDontMatch d-none" id="passwordDontMatch">Ups! your password don't match</div>
      </div>
      <div class="checkboxPrivacyPolicy dp-flex">
              <input type="checkbox" id="checkboxPrivatPolicy" name="checkboxPrivatPolicy" class="checkboxSavePassword" onclick="enableButton()"/>
              <label for="checkboxPrivatPolicy"></label>
              <p class="acceptPrivacyGrey">i accept the 
                  <a href="./privacyPolicyOffline.html" target=”_blank” class="privacyPolicyLink
                  ">Privacy policy</a>
              </p>
          </div>
      <div class="ButtonBox dp-flex">
          <button class="buttonGrey buttonLogin" id="signUpButton" disabled>Sign up</button>
      </div>
    </form>`;
}
