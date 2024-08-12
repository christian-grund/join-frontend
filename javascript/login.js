/**
 * Initializes the application.
 * Loads HTML content, data, login form, and local storage data.
 * @async
 */
async function init() {
  await includeHTML();
  await loadData();
  await loadLogIn();
  await loadLocalStorageData();
}


/**
 * Loads the login form HTML content and displays it.
 * @async
 */
async function loadLogIn() {
  let container = document.getElementById("formBody");
  let headerRight = document.getElementById("headerRightBox");
  container.innerHTML = await logInHtml();
  if (headerRight.classList.contains("d-none")) {
  }
  headerRight.classList.remove("d-none");
}


/**
 * Loads the sign-up form HTML content and hides the login form.
 */
function loadSignUpHtml() {
  let container = document.getElementById("formBody");
  document.getElementById("headerRightBox").classList.add("d-none");
  container.innerHTML = signupHtml();
}


/**
 * Handles the sign-up process.
 * Checks privacy policy acceptance and password match.
 * Updates local storage with user data upon successful sign-up.
 * @async
 */
async function signUp() {
  if (checkIfPrivatPolicyIsChecked() && checkPasswordsAreSame()) {
    users.push({
      username: userName.value,
      email: emailSignUp.value,
      password: passwordSignUp.value,
      checkPassword: checkPasswordSignUp.value,
    });
    await setItem("users", JSON.stringify(users));

    loadLogIn();
    showAnimation("signedUpMassage");
  }
  if (!checkIfPrivatPolicyIsChecked()) {
    showAnimation("acceptPrivacyPolicy");
  }
}


/**
 * Checks if the confirmed password matches the original password during sign-up.
 * Updates UI accordingly.
 */
function checkMatchPassword() {
  if (
    document.getElementById("passwordSignUp").value ===
    document.getElementById("checkPasswordSignUp").value
  ) {
    document.getElementById("checkPasswordSignUp").classList.remove("inputRequired");
    document.getElementById("passwordDontMatch").classList.add("d-none");
    document.getElementById("inputFieldContainerSignUp").classList.remove("padding-none");
  } else {
    document.getElementById("checkPasswordSignUp").classList.add("inputRequired");
    document.getElementById("passwordDontMatch").classList.remove("d-none");
    document.getElementById("inputFieldContainerSignUp").classList.add("padding-none");
  }
}


/**
 * Loads user data upon login.
 * Redirects to the summary page if login is successful.
 * @async
 */
async function loadUser() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  await setItem("users", JSON.stringify(users));
  if (searchForEmail(email, password)) {
    await rememberMe();
    let user = await setUser(email);
    window.location.href = "./summary.html";
  }
}


/**
 * Sets user data in local storage based on the provided email.
 * @param {string} email - User's email.
 */
function setUser(email) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      user = [];
      user.push(i);
      let userAsText = JSON.stringify(user);
      localStorage.setItem("user", userAsText);
    }
  }
}


/**
 * Searches for a user's email and password in the user data.
 * Handles password mismatch scenarios.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {boolean} True if email and password match, false otherwise.
 */
function searchForEmail(email, password) {
  for (let i = 0; i < users.length; i++) {
    if (
      users[i]["email"] === email &&
      users[i]["password"] === password
    ) {
      return true;
    }
  }
  passwordDontMatch();
}


/**
 * Resets the login form.
 */
function resetForm() {
  email.value = "";
  password.value = "";
}


/**
 * Logs in the guest user with predefined credentials.
 * Redirects to the summary page upon successful login.
 */
function logInGuest() {
  let email = "Guest@web.de";
  let password = "Admin123";
  user.push("2");
  let userAsText = JSON.stringify(user);
  localStorage.setItem("user", userAsText);
  if (searchForEmail(email, password)) {
    window.location.href = "./summary.html";
  }
}


/**
 * Handles the 'Remember Me' functionality.
 * Stores login credentials in local storage if the checkbox is checked.
 */
function rememberMe() {
  let checkbox = document.getElementById("checkboxSavePassword");
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  if (checkbox.checked) {
    localStorage.setItem("useremail", email);
    localStorage.setItem("userpassword", password);
    localStorage.setItem("rememberMe", "on");
  } else {
    localStorage.removeItem("useremail");
    localStorage.removeItem("userpassword");
    localStorage.removeItem("rememberMe");
    resetForm();
  }
}


/**
 * Loads data from local storage into the login form.
 */
function loadLocalStorageData() {
  let userEmail = localStorage.getItem("useremail");
  let userPassword = localStorage.getItem("userpassword");
  if (userEmail && userPassword) {
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    let checkbox = document.getElementById("checkboxSavePassword");
    emailInput.value = userEmail;
    passwordInput.value = userPassword;
    checkbox.checked = true;
  }
}


/**
 * Toggles password visibility for a given password field.
 * @param {string} passwordId - ID of the password field.
 * @param {string} passwordIconId - ID of the password visibility icon.
 */
function toggleShowPassword(passwordId, passwordIconId) {
  let passwordField = document.getElementById(passwordId);
  let passwordIcon = document.getElementById(passwordIconId);

  if (passwordField.type === "password") {
    passwordField.type = "text";
    passwordIcon.src = "./assets/img/icons/visibilityOff.svg";
  } else {
    passwordField.type = "password";
    passwordIcon.src = "./assets/img/icons/lock.svg";
    passwordIcon.classList.add("inputImgLock");
  }
}


/**
 * Checks if the privacy policy checkbox is checked.
 * @returns {boolean} True if checked, false otherwise.
 */
function checkIfPrivatPolicyIsChecked() {
  let checkButton = document.getElementById("checkboxPrivatPolicy");
  if (checkButton.checked) {
    return true;
  }
}


/**
 * Enables the sign-up button.
 */
function enableButton() {
  let button = document.getElementById("signUpButton");
  button.disabled = false;
}


/**
 * Shows an animation for a specified duration.
 * @param {string} id - ID of the element to animate.
 */
function showAnimation(id) {
  let button = document.getElementById(id);
  button.classList.remove("d-none");
  setTimeout(() => moveToCenter(button), 200);
  setTimeout(() => addDNone(button), 2000);
}


/**
 * Moves an element to the center of the screen.
 * @param {HTMLElement} button - Element to move.
 */
function moveToCenter(button) {
  button.classList.add("moveToCenter");
}


/**
 * Adds the 'd-none' class to hide an element.
 * @param {HTMLElement} button - Element to hide.
 */
function addDNone(button) {
  button.classList.add("d-none");
}


/**
 * Animates the logo by hiding it after a delay.
 */
function animateLogo() {
  setTimeout(function () {
    document.getElementById("logo").classList.add("d-none"),
      document.getElementById("logo-bg-animation").classList.add("d-none");
  }, 1000);
}


/**
 * Displays a message indicating password mismatch.
 */
function passwordDontMatch() {
  document.getElementById("passwordDontMatch").classList.remove("d-none");
  document.getElementById("checkboxBox").style.paddingTop = "16px";
  document.getElementById("password").style.borderColor = "#ff3d00";
}


/**
 * Reverses the password mismatch message and styling.
 */
function passwordDontMatchReverse() {
  document.getElementById("passwordDontMatch").classList.add("d-none");
  document.getElementById("checkboxBox").style.paddingTop = "28px";
  document.getElementById("password").style.borderColor = "#000";
}


/**
 * Checks if the passwords during sign-up match.
 * @returns {boolean} True if matched, false otherwise.
 */
function checkPasswordsAreSame() {
  let password = document.getElementById("passwordSignUp").value;
  let confirmedPassword = document.getElementById("checkPasswordSignUp").value;
  if (password === confirmedPassword) {
    return true;
  }
}