let letters = [];
let nameToCompare;

/**
 * Initialize the contact management system.
 * Loads data, user, sets initials, sets user to contacts, sets color to contacts, renders contacts, and sets active color to UI elements.
 */
async function init() {
  await loadData();
  await loadUser();
  setUserInitials();
  setUserToContacts();
  setColorToContacts();
  renderContacts();
  setColorToActive('sidebarContacts', 'contacts-img', 'bottomBarContactsMobile', 'contactsImgMobile');
  setNumberOnContacts();
}


/**
 * Set the username in contacts list.
 * If the username exists, append "(you)" to it and add it to the contacts list.
 * @param {string} userName - The username to be added to contacts.
 */
function setUsernameInContacts(userName) {
  let userWithYou = userName + ' (you)';
  let userWithYouExistsIndex = contacts.findIndex((contact) => contact.name === userWithYou);

  if (userWithYouExistsIndex === -1) {
    contacts.push({ name: userWithYou });
  }
}


/**
 * Render the contacts in the UI.
 * Generates HTML elements for each contact and renders them in the UI based on the first letter of their name.
 */
async function renderContacts() {
  let content = document.getElementById('basic-info-wrapper');
  content.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const firstLetter = contact.name.charAt(0);

    if (!letters.includes(firstLetter)) {
      letters.push(firstLetter);
    }
  }
  letters.sort();
  renderLetters();
}


/**
 * Render the letters for contact list navigation.
 * Generates HTML elements for each unique letter in the contact list and renders them for navigation.
 */
function renderLetters() {
  let letterBox = document.getElementById('contact-list-container');
  letterBox.innerHTML = '';

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    letterBox.innerHTML += generateLettersHTML(letter);

    setContactsToFirstLetters(letter);
  }
}


/**
 * Finds the index of a user by contact name.
 * @param {string} contactName - The name of the contact to search for.
 * @returns {number} - The index of the user if found, otherwise -1.
 */
function findUserIndexByContactName(contactName) {
  for (let i = 0; i < users.length; i++) {
    if (users[i]['username'] === contactName) {
      return i;
    }
  }
  return -1;
}


/**
 * Opens the contact information panel.
 * @param {number} i - The index of the contact.
 */
async function openContactInfo(i) {
  let contact = contacts[i];
  let acronym = getFirstLetters(contact.name);
  const color = contact.color;
  let content = document.getElementById('contact-info');
  classlistRemove('contact-info', 'show-overlay-menu');
  let username = checkForUserName();
  content.innerHTML = '';
  if (contacts[i]['name'] === username) {
    setTimeout(() => (content.innerHTML += openContactInfoYouHTML(contact, acronym, color, i)), 250);
  } else {
    setTimeout(() => (content.innerHTML += openContactInfoHTML(contact, acronym, color, i)), 250);
  }
  renderChangesMobile(i);
  openContactInfoAnimations();
}


/**
 * Adds a new contact.
 * @param {string} target - The target of the contact addition.
 */
async function addContact(target, id) {
  let name = document.getElementById(`add-name-${target}`);
  let mail = document.getElementById(`add-mail-${target}`);
  let tel = document.getElementById(`add-tel-${target}`);

  contacts.push({
    name: firstLettersUppercase(name.value),
    mail: mail.value,
    phone: tel.value,
    color: '',
    isChoosen: false,
  });

  await processContactAddition(target, id, name, mail, tel);
}


/**
 * Processes the addition of a contact.
 * @param {string} target - The target of the contact addition.
 * @param {HTMLInputElement} name - The input element for the contact name.
 * @param {HTMLInputElement} mail - The input element for the contact email.
 * @param {HTMLInputElement} tel - The input element for the contact phone number.
 */
async function processContactAddition(target, id, name, mail, tel) {
  setColorToContacts();
  await saveContacts();
  await init();
  let index = findContactIndex(name.value);
  clearPopup(name, mail, tel);
  openContactInfo(index);
  clearPopup(name, mail, tel);
  await closeContactPopup(target, 'add');
  setTimeout(() => animateBannerContacts('banner-contact-created', 'banner-contact-created-mobile'), 500);
}


/**
 * Finds the index of a contact by name.
 * @param {string} name - The name of the contact.
 * @returns {number} - The index of the contact.
 */
function findContactIndex(name) {
  return contacts.findIndex((obj) => obj.name.toLowerCase() === name.toLowerCase());
}


/**
 * Clears the input fields of a popup.
 * @param {HTMLInputElement} name - The input element for the contact name.
 * @param {HTMLInputElement} mail - The input element for the contact email.
 * @param {HTMLInputElement} tel - The input element for the contact phone number.
 */
function clearPopup(name, mail, tel) {
  name.value = '';
  mail.value = '';
  tel.value = '';
}


/**
 * Edits a contact.
 * @param {number} i - The index of the contact.
 * @param {string} target - The target of the edit operation.
 */
function editContact(i, target) {
  let acronym = getFirstLetters(contacts[i].name);
  const color = contacts[i].color;
  renderEditContactDesktopOrMobile(acronym, color, i);

  let name1 = document.getElementById(`edit-name-${target}`);
  let mail = document.getElementById(`edit-mail-${target}`);
  let tel = document.getElementById(`edit-tel-${target}`);

  name1.value = contacts[i].name;
  mail.value = contacts[i].mail;
  tel.value = contacts[i].phone;

  nameToCompare = contacts[i].name;
}


/**
 * Save the edited contact after making changes.
 * Updates the contact information in the contacts array and saves it.
 * @param {number} i - The index of the contact being edited.
 * @param {string} target - The target of the edit operation (desktop or mobile).
 */
async function saveEditedContact(i, target) {
  let name = document.getElementById(`edit-name-${target}`);
  let mail = document.getElementById(`edit-mail-${target}`);
  let tel = document.getElementById(`edit-tel-${target}`);
  let newSavedName = firstLettersUppercase(name.value);

  contacts[i].name = firstLettersUppercase(name.value);
  contacts[i].mail = mail.value;
  contacts[i].phone = tel.value;

  await finalizeEditedContactSave(newSavedName, i, target);
}


/**
 * Finalizes the saving of the edited contact by performing additional actions.
 * @param {string} newSavedName - The new name of the edited contact.
 * @param {number} i - The index of the edited contact.
 * @param {string} target - The target of the edit operation (desktop or mobile).
 */
async function finalizeEditedContactSave(newSavedName, i, target) {
  await checkTasksSelectedContactNames(newSavedName);

  await saveContacts();
  init();
  await closeContactPopup(target, 'edit');
  openContactInfo(i);
}


/**
 * Check and update the selected contact names in tasks after editing a contact name.
 * @param {string} newSavedName - The new name of the contact after editing.
 */
async function checkTasksSelectedContactNames(newSavedName) {
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    for (let j = 0; j < task.selectedContacts.length; j++) {
      let selectedContact = task.selectedContacts[j];

      if (selectedContact.name == nameToCompare) {
        selectedContact.name = newSavedName;
        await setItem('tasks', JSON.stringify(tasks));
      }
    }
  }
}


/**
 * Delete a contact from the contacts array.
 * Deletes the contact at the specified index from the contacts array and saves the changes.
 * @param {number} i - The index of the contact to delete.
 */
async function deleteContact(i, target) {
  deleteUnusedLetter(i);
  deleteSelectedContact(i);
  contacts.splice(i, 1);

  if (window.innerWidth < 800) {
    closeChangesMenuMobile();
    toggleContactInfoMobile();
  }

  document.getElementById('contact-info').innerHTML = '';
  await saveContacts();
  init();
  await animateBannerContacts('banner-contact-deleted', 'banner-contact-deleted-mobile');
}


/**
 * Delete the unused letter from the letters array.
 * Removes the first letter of the contact name from the letters array if it is no longer used.
 * @param {number} i - The index of the contact being deleted.
 */
function deleteUnusedLetter(i) {
  let index = letters.indexOf(contacts[i].name.charAt(0));
  letters.splice(index, 1);
}


/**
 * Delete the selected contact from tasks when a contact is deleted.
 * Removes the deleted contact from the selected contacts in tasks array.
 * @param {number} x - The index of the contact being deleted.
 */
async function deleteSelectedContact(x) {
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    for (let j = 0; j < task.selectedContacts.length; j++) {
      let contact = task.selectedContacts[j];

      if (contact.name === contacts[x].name) {
        task.selectedContacts.splice(j, 1);
        j--;
      }
    }
  }
  await setItem('tasks', JSON.stringify(tasks));
}


/**
 * Prevent the default action of closing the event.
 * Stops the propagation of the event to prevent closing.
 * @param {Event} event - The event object.
 */
function doNotClose(event) {
  event.stopPropagation();
}


/**
 * Get the first letters of each word in a string.
 * Splits the string by spaces and returns the first letter of each word.
 * @param {string} str - The input string.
 * @returns {string} The first letters of each word.
 */
function getFirstLetters(str) {
  return str.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '');
}


/**
 * Validate a phone number input.
 * Replaces invalid characters in the input value with valid ones.
 * @param {HTMLInputElement} input - The input element containing the phone number.
 */
function validatePhoneNumber(input) {
  input.value = input.value.replace(/[^\d+\/\s-]/g, '');
}
