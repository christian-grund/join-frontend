/**
 * Finds the position of a subtask with the given ID.
 *
 * @param {string} id - The ID of the subtask to find.
 * @returns {number} - The index of the subtask in the subtasks array, or -1 if not found.
 */
function findSubtaskPosition(id) {
  let nr = subtasks.findIndex((obj) => obj.id === id);
  return nr;
}


/**
 * Checks if the task form is filled with required information.
 *
 * @param {string} id - The ID of the due date input field.
 */
function checkIfFormIsFilled(id) {
  let title = document.getElementById('taskTitle');
  let dueDate = document.getElementById(id);
  if (categoryIsSelected === true && title.value > '' && dueDate.value > '') {
    document.getElementById('create-task').disabled = false;
  }
}


/**
 * Sets the value of 'isChoosen' to 'false' for all contacts in the list and saves the updated contacts.
 */
async function resetIsChoosenValue() {
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    contact['isChoosen'] = false;
  }
  await saveContacts();
}


/**
 * Toggles the 'isChoosen' value of the contact at the specified index.
 * If the value is currently true, it sets it to false, and vice versa.
 * Saves the updated contacts after toggling.
 *
 * @param {number} i - The index of the contact to toggle.
 */
async function setIsChoosenValue(i) {
  if (contacts[i]['isChoosen'] === true) {
    contacts[i]['isChoosen'] = false;
    await saveContacts();
    return;
  }
  if (contacts[i]['isChoosen'] === false) {
    contacts[i]['isChoosen'] = true;
    await saveContacts();
    return;
  }
}


/**
 * Registers an event listener for the input field with the ID 'subTaskInput',
 * to respond to the Enter key and call the function 'addSubTask' when the Enter key is pressed.
 */
window.addEventListener(
  'keydown',
  function (e) {
    if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
      if (e.target.nodeName == 'INPUT' && e.target.type == 'text' && e.target.id == 'subTaskInput') {
        e.preventDefault();
        addSubTask('subTaskInput', 'subTaskContainer');
        return false;
      } else if (e.target.nodeName == 'INPUT' && e.target.type == 'text' && e.target.id == 'subTaskInputEdit') {
        e.preventDefault();
        document.getElementById('addSubTaskEditBtn').click();
        return false;
      }
    }
  },
  true
);


/**
 * Generates initials from a contact name.
 *
 * @param {string} contactName - The full name of the contact.
 * @returns {string} The initials generated from the contact name.
 */
function getInitials(contactName) {
  const nameParts = contactName.split(' ');
  let initials = '';
  for (let i = 0; i < nameParts.length; i++) {
    initials += nameParts[i][0];
  }
  return initials.toUpperCase();
}


/**
 * Moves a popup to the center of the screen.
 *
 * @param {HTMLElement} popup - The popup element to be moved.
 */
function moveToCenter(popup) {
  popup.classList.add('moveToCenterAddTask');
}


/**
 * Sets the value of an input field back to an empty string.
 *
 * @param {string} idInput - The ID of the input field.
 * @param {string} idContainer - The ID of the container.
 */
function setValueBack(idInput, idContainer) {
  let inputField = document.getElementById(idInput);
  inputField.value = ``;
}


/**
 * Resets the input field for subtasks.
 *
 * @param {string} idContainer - The ID of the subtask input container.
 */
function resetSubTaskInputField(idContainer) {
  let inputContainer = document.getElementById(idContainer);
  inputContainer.innerHTML = subTaskInputFieldHtml();
}
