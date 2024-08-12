/**
 * Renders the add task form in the main content area and the board view.
 */
function renderAddTask() {
  let contentMain = document.getElementById('main');
  let contentBoardTask = document.getElementById('boardAddTask');

  if (contentMain) {
    contentMain.innerHTML = addTaskHtml('main');
  }
  if (contentBoardTask) {
    contentBoardTask.innerHTML = addTaskHtml('boardAddTask');
  }
}

/**
 * Renders the subtask input field.
 */
function renderSubTask() {
  let container = document.getElementById('subtasks');
  container.innerHTML += subTaskInputHtml();
}

/**
 * Renders the subtask input field for big AddTask.
 */
function renderSubTaskAddTask() {
  let container = document.getElementById('subtasks');
  container.innerHTML += subTaskInputHtmlAddTask();
}

/**
 * Renders the generated subtasks in the specified container.
 * @param {string} idContainer - The ID of the container where subtasks will be rendered.
 */
function renderGeneratedSubTasks(idContainer) {
  let container = document.getElementById(idContainer);
  container.innerHTML = '';

  for (let i = 0; i < subtasks.length; i++) {
    let id = subtasks[i]['id'];
    container.innerHTML += subTasksValueHtmladdTask(id, i);
  }
}

/**
 * Edits the subtask with the given ID.
 * @param {string} id - The ID of the subtask to edit.
 */
function editSubTask(id) {
  let container = document.getElementById(id);
  let nr = findSubtaskPosition(id);
  let textContent = subtasks[nr]['subTaskInput'];
  container.innerHTML = editSubTaskHtml(textContent, id);
}

/**
 * Adds or edits a subtask at the specified index.
 * @param {number} id - The ID of the subtask to save edit.
 * @returns {void}
 */
function addEditSubTask(id, idContainer) {
  let subTaskInput = document.getElementById('editSubTaskInput');

  let nr = findSubtaskPosition(id);
  subtasks[nr]['subTaskInput'] = subTaskInput.value;
  if (subTaskInput.value.length == 0) {
    deleteSubTask(id, idContainer);
  }
  renderGeneratedSubTasks(idContainer);
}

/**
 * Displays the task form with assigned contacts.
 * @param {string} id - The ID of the container to display the task form in.
 */
async function showTaskForm(id) {
  let assignedTo = document.getElementById(id);
  assignedTo.innerHTML = showTaskFormHtml();
  sortContactsByAlphabet();

  for (let i = 0; i < contacts.length; i++) {
    let currentUser = contacts[i]['name'];
    let initials = getInitials(currentUser);
    let color = contacts[i]['color'];
    let assignedDropdown = document.getElementById('assignedDropdown');
    let username = checkForUserName();
    let contactNumber = contacts[i]['nr'];

    if (currentUser === username) {
      assignedDropdown.innerHTML += await assignedToUserYouHtml(i, color, currentUser, initials, contactNumber);
      checkIfSelectedContact(i, contactNumber);
    } else {
      assignedDropdown.innerHTML += await assignedToUserHtml(i, color, currentUser, initials, contactNumber);
      checkIfSelectedContact(i, contactNumber);
    }
  }
}

/**
 * Checks if a specific contact is selected and updates the UI accordingly.
 * @param {number} i - The index of the contact.
 * @param {number} contactNumber - The identifier of the contact.
 */
function checkIfSelectedContact(i, contactNumber) {
  let userId = document.getElementById(`user-${i}`);
  let checkboxImage = document.getElementById(`checkBox-${i}`);
  if (contacts[contactNumber]['isChoosen'] === true) {
    checkboxImage.src = './assets/img/icons/check_button-white.svg';
    userId.classList.add('selected-profile-active-item');
  }
  if (contacts[contactNumber]['isChoosen'] === false && userId.classList.contains('selected-profile-active-item')) {
    userId.classList.remove('selected-profile-active-item');
  }
}

/**
 * Filters contacts based on the search term and renders them.
 */
async function filterAddTaskContact() {
  let searchTerm = document.getElementById('search').value.toLowerCase();
  let assignedDropdown = document.getElementById('assignedDropdown');
  assignedDropdown.innerHTML = '';

  if (searchTerm === '') {
    await showTaskForm('assignedTo');
    assignedDropdown.classList.remove('d-none');
    openDropDown('assignedDropdown', 'dropdownImgArrow');
  } else {
    filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().startsWith(searchTerm));
    renderFilteredContacts(filteredContacts);
    if (filteredContacts.length === 0) {
      assignedDropdown.classList.add('d-none');
    } else {
      assignedDropdown.classList.remove('d-none');
    }
  }
}

/**
 * Renders the contacts in the assigned dropdown.
 * @param {Array} contacts - The array of contacts to render.
 */
async function renderContacts(contacts) {
  let assignedDropdown = document.getElementById('assignedDropdown');
  assignedDropdown.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    let currentUser = contacts[i]['name'];
    let initials = getInitials(currentUser);
    let color = contacts[i]['color'];
    let contactNumber = contacts[i]['nr'];

    assignedDropdown.innerHTML += await assignedToUserHtml(i, color, currentUser, initials, contactNumber);
    checkIfSelectedContact(i);
  }
}

/**
 * Renders the filtered contacts in the assigned dropdown.
 * @param {Array} filteredContacts - The array of filtered contacts to render.
 */
function renderFilteredContacts(filteredContacts) {
  let assignedDropdown = document.getElementById('assignedDropdown');
  assignedDropdown.innerHTML = '';
  let username = checkForUserName();

  for (let i = 0; i < filteredContacts.length; i++) {
    let currentUser = filteredContacts[i]['name'];
    let initials = getInitials(currentUser);
    let color = filteredContacts[i]['color'];
    let contactNumber = filteredContacts[i]['nr'];

    if (currentUser === username) {
      assignedDropdown.innerHTML += assignedToUserYouHtml(i, color, currentUser, initials, contactNumber);
      checkIfSelectedContact(i, contactNumber);
    } else {
      assignedDropdown.innerHTML += assignedToUserHtml(i, color, currentUser, initials, contactNumber);
      checkIfSelectedContact(i, contactNumber);
    }
  }
}

/**
 * Toggles the display of a dropdown menu.
 * @param {string} idDropdown - The ID of the dropdown menu to toggle.
 * @param {string} idImgArrow - The ID of the arrow icon associated with the dropdown.
 */
function openDropDown(idDropdown, idImgArrow) {
  let assignedDropdown = document.getElementById(idDropdown);
  let dropdownImgArrow = document.getElementById(idImgArrow);

  if (assignedDropdown.classList.contains('d-none')) {
    assignedDropdown.classList.remove('d-none');
    assignedDropdown.classList.add('border-active', 'dropbtn');
    dropdownImgArrow.classList.add('rotate-arrow');
  } else {
    assignedDropdown.classList.add('d-none');
    assignedDropdown.classList.remove('border-active', 'dropbtn');
    dropdownImgArrow.classList.remove('rotate-arrow');
  }
}

/**
 * Closes the dropdown menu if the corresponding elements exist in the DOM.
 */
function closeDropDown() {
  let assignedDropdown = document.getElementById('assignedDropdown');
  if (assignedDropdown) {
    assignedDropdown.classList.add('d-none');
    assignedDropdown.classList.remove('border-active', 'dropbtn');
  }

  let assignedDropdownCategory = document.getElementById('assignedDropdownCategory');
  if (assignedDropdownCategory) {
    assignedDropdownCategory.classList.add('d-none');
  }

  let assignedDropdownCategoryEdit = document.getElementById('assignedDropdownCategoryEdit');
  if (assignedDropdownCategoryEdit) {
    assignedDropdownCategoryEdit.classList.add('d-none');
  }

  let dropdownImgArrow = document.getElementById('dropdownImgArrow');
  if (dropdownImgArrow) {
    dropdownImgArrow.classList.remove('rotate-arrow');
  }

  let dropdownImgArrowCategory = document.getElementById('dropdownImgArrowCategory');
  if (dropdownImgArrowCategory) {
    dropdownImgArrowCategory.classList.remove('rotate-arrow');
  }
}

// Function to close the dropdown menu with if
document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener('click', function (event) {
    if (
      !event.target.closest('.dropdown') &&
      !event.target.closest('.dropdownEdit') &&
      !event.target.closest('.dropdownSubTaskInput') &&
      !event.target.closest('.dropdown-arrow-hover') &&
      !event.target.closest('#assignedDropdown') &&
      !event.target.closest('#assignedDropdownCategory') &&
      !event.target.closest('#assignedDropdownCategoryEdit')
    ) {
      closeDropDown();
    }
  });
});

// Function for openDropDownCategory
function openDropDownCategory() {
  let assignedDropdownCategory = document.getElementById('assignedDropdownCategory');
  let dropdownImgArrowCategory = document.getElementById('dropdownImgArrowCategory');

  if (assignedDropdownCategory.classList.contains('d-none')) {
    assignedDropdownCategory.classList.remove('d-none');
    assignedDropdownCategory.classList.add('border-category-active');
    dropdownImgArrowCategory.classList.add('rotate-arrow');
  } else {
    assignedDropdownCategory.classList.add('d-none');
    assignedDropdownCategory.classList.remove('border-category-active');
    dropdownImgArrowCategory.classList.remove('rotate-arrow');
  }
}

// Function for closing DropDownCategory
function closeDropDownCategory(event) {
  let assignedDropdownCategory = document.getElementById('assignedDropdownCategory');
  let dropdownImgArrowCategory = document.getElementById('dropdownImgArrowCategory');

  if (!event.target.closest('#assignedDropdownCategory') && !event.target.closest('#dropdownCategory')) {
    assignedDropdownCategory.classList.add('d-none');
    assignedDropdownCategory.classList.remove('border-category-active');
    dropdownImgArrowCategory.classList.remove('rotate-arrow');

    document.body.removeEventListener('click', closeDropDown);
  }
}

/**
 * Adds an assigned contact to the selected contacts list.
 * @param {number} i - The index of the contact.
 * @param {string} color - The color associated with the contact.
 */
async function addAssignedContact(i, color, contactsNumber) {
  let assignedDropdown = document.getElementById('assignedDropdown');
  let selectedContact = contacts[contactsNumber]['name'];
  let checkboxImage = document.getElementById(`checkBox-${i}`);
  let userID = document.getElementById(`user-${i}`);

  addSelectedContact(assignedDropdown, checkboxImage, userID, selectedContact, color);
  await setIsChoosenValue(contactsNumber);
  await renderSelectedContacts(i);
}

/**
 * Adds a filtered and assigned contact with specified attributes.
 * Calls helper functions to update the assigned dropdown, checkbox image, and user ID display.
 * Also sets the 'isChoosen' value of the contact and renders selected contacts.
 * @param {number} i - The index of the filtered contact.
 * @param {string} color - The color to be used for visual representation.
 * @param {number} contactsNumber - The number of contacts.
 */
async function addFilteredAssignedContact(i, color, contactsNumber) {
  let assignedDropdown = document.getElementById('assignedDropdown');
  let selectedContact = filteredContacts[i]['name'];
  let checkboxImage = document.getElementById(`checkBox-${i}`);
  let userID = document.getElementById(`user-${i}`);

  addSelectedContact(assignedDropdown, checkboxImage, userID, selectedContact, color);
  await setIsChoosenValue(contactsNumber);
  await renderSelectedContacts(i);
}

/**
 * Adds a selected contact to the list of selected contacts.
 *
 * @param {HTMLElement} assignedDropdown - The dropdown menu element where the contacts will be rendered.
 * @param {HTMLElement} checkboxImage - The checkbox image for the selected contact.
 * @param {HTMLElement} userID - The user ID of the selected contact.
 * @param {string} selectedContact - The selected contact.
 * @param {string} color - The color of the selected contact.
 */
function addSelectedContact(assignedDropdown, checkboxImage, userID, selectedContact, color) {
  const index = selectedContacts.findIndex((contact) => contact.name === selectedContact && contact.color === color);
  if (!checkIfSelectedContactExist(selectedContact, color)) {
    assignedDropdown.classList.toggle('addTask-selected');
    if (!selectedContacts.includes(selectedContact)) {
      if (index === -1) {
        selectedContacts.push({
          name: selectedContact,
          color: color,
          selectedContactsId: selectedContacts.length,
        });
      }
    }
    checkboxImage.src = './assets/img/icons/check_button-white.svg';
    userID.classList.add('selected-profile-active-item');
  } else {
    removeSelectedContact(selectedContacts[index].selectedContactsId);
  }
}

/**
 * Sets background for the selected contact based on its 'isChoosen' status.
 * Updates the visual representation of the contact with the specified div ID.
 * @param {string} divId - The ID of the HTML div element representing the contact.
 */
function backgroundForSelectedContact(divId) {
  for (let i = 0; i < contacts.length; i++) {
    let userId = document.getElementById(`user-${divId}`);
    let checkboxImage = document.getElementById(`checkBox-${divId}`);
    if (contacts[i]['isChoosen'] === true) {
      checkboxImage.src = './assets/img/icons/check_button-white.svg';
      userID.classList.add('selected-profile-active-item');
    }
    if (contacts[i]['isChoosen'] === false && userId.classList.contains('selected-profile-active-item')) {
      userId.classList.remove('selected-profile-active-item');
    }
  }
}

/**
 * Checks if the selected contact already exists in the list of selected contacts.
 *
 * @param {string} selectedContact - The selected contact.
 * @returns {boolean} - Returns true if the selected contact already exists, otherwise false.
 */
function checkIfSelectedContactExist(selectedContact, color) {
  for (let i = 0; i < selectedContacts.length; i++) {
    if (selectedContacts[i]['name'].includes(selectedContact) && selectedContacts[i]['color'].includes(color)) {
      return true;
    }
  }
}

/**
 * Renders the selected contacts in the "Assigned Contacts" section on the user interface.
 *
 * @param {number} i - The index of the currently selected contact.
 */
function renderSelectedContacts() {
  let content = document.getElementById('assignedAddedContact');
  content.innerHTML = '';

  for (let j = 0; j < selectedContacts.length; j++) {
    let contact = selectedContacts[j];
    let initials = getInitials(selectedContacts[j]['name']);
    let color = contact['color'];

    content.innerHTML += renderSelectedContactsHtml(j, initials, color);
  }
}
