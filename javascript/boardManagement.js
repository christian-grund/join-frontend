/**
 * Set the minimum date for a date input field to today.
 * @param {string} inputIdPopup - The ID of the date input field.
 */
function setMinDateTodayPopup(inputIdPopup) {
  var today = new Date().toISOString().split('T')[0];
  document.getElementById(inputIdPopup).setAttribute('min', today);
  document.getElementById(inputIdPopup).addEventListener('input', function () {
    var selectedDate = this.value;
    var currentDate = new Date().toISOString().split('T')[0];
    if (selectedDate < currentDate) {
      this.value = today;
    }
  });
}

/**
 * Open the add task popup for a specific column.
 * @param {string} column - The column identifier.
 */
async function openAddTaskPopup(column) {
  await resetIsChoosenValue();
  await renderAddTaskPopUp(column);
  changePrioToMedium('mediumContainer', 'mediumImg');
  await renderSubTask();
  await showTaskForm('assignedTo');
  setMinDateTodayPopup('myDateInputPopup');
  document.getElementById('addTaskPopupWrapper').classList.remove('d-none');
  document.getElementById('addTaskPopup').classList.remove('d-none');
  document.getElementById('addTaskPopup').classList.remove('slide-out');
  document.getElementById('addTaskPopup').classList.add('slide-in');
  subtasks = [];
  selectedContacts = [];
}

/**
 * Add a task popup.
 * @param {string} id - The task identifier.
 * @param {string} section - The section of the task.
 */
async function addTaskPopUp(id, section) {
  await pushAddTask(id, section);
  await renderBoardTasks();
  closeAddTaskPopup();
}

/**
 * Close the add task popup.
 */
function closeAddTaskPopup() {
  let addTaskPopup = document.getElementById('addTaskPopup');
  addTaskPopup.classList.remove('slide-in');
  addTaskPopup.classList.add('slide-out');

  addTaskPopup.addEventListener('animationend', function onAnimationEnd() {
    addTaskPopup.removeEventListener('animationend', onAnimationEnd);
    addTaskPopup.classList.add('d-none');
    document.getElementById('addTaskPopupWrapper').classList.add('d-none');
    subtasks = [];
  });
}

/**
 * Open a task popup for editing.
 * @param {number} i - The index of the task.
 */
function openTaskPopup(i) {
  let aTPopupBg = document.getElementById('aTPopupBg');
  let taskPopup = document.getElementById('aTPopupWrapper');
  taskPopup.classList.remove('slide-in');
  taskPopup.classList.remove('slide-out');
  taskPopup.classList.remove('d-none');
  aTPopupBg.classList.remove('d-none');
  taskPopup.classList.add('slide-in');
  taskPopup.classList.add('d-block');

  let img = setPrioImg(i);
  let date = convertDateFormat(tasks[i].taskDueDate);
  taskPopup.innerHTML = '';
  taskPopup.innerHTML = generateTaskPopupHTML(i, img, date);

  setupTaskPopup(i);
}

/**
 * Setup the task popup by setting category background, checking subtasks, and rendering assigned contacts and subtasks.
 * @param {number} i - The index of the task.
 */
function setupTaskPopup(i) {
  setCategoryBackground(tasks[i]['selectedCategory'], `aTPopupCategory${i}`);
  checkSubtasksExisting(i);
  renderAssignedToContacs(i);
  renderSubtasks(i, 'subtaskContainerPopup');
}

/**
 * Close the task popup.
 */
async function closeTaskPopup() {
  let taskPopup = document.getElementById('aTPopupWrapper');
  let aTPopupBg = document.getElementById('aTPopupBg');

  taskPopup.classList.add('slide-out');

  await new Promise((resolve) => {
    taskPopup.addEventListener('animationend', function onAnimationEnd() {
      taskPopup.removeEventListener('animationend', onAnimationEnd);

      taskPopup.classList.add('d-none');
      aTPopupBg.classList.add('d-none');
      updateHTML();
      subtasks = [];
      resolve();
    });
  });
}

/**
 * Event listener to close the add task popup when clicking outside of it.
 * @listens click
 * @param {Event} event - The click event.
 */
document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener('click', function (event) {
    let addTaskPopup = document.getElementById('addTaskPopupWrapper');
    if(addTaskPopup){
    if (!addTaskPopup.classList.contains('d-none')) {
      let dropdownClose = document.getElementById('dropdownClose');
      if (!dropdownClose.contains(event.target)) {
        closeAddTaskPopup();
        closeTaskPopup();
      }
    }
  }});
});

/**
 * Check if subtasks exist for a task and update the display accordingly.
 * @param {number} i - The index of the task.
 */
function checkSubtasksExisting(i) {
  let container = document.getElementById(`aTPopupSubtasks${i}`);

  if (tasks[i].subtasks.length === 0) {
    container.classList.add('d-none');
  } else {
    container.classList.remove('d-none');
  }
}

/**
 * Get the color of a contact by its name.
 * @param {string} selectedContactName - The name of the contact.
 * @returns {string} The color of the contact.
 */
function getContactColor(selectedContactName) {
  let index = contacts.findIndex((contact) => contact.name === selectedContactName);
  if (index !== -1) {
    return contacts[index].color;
  }
}

/**
 * Set the priority image for a task.
 * @param {number} i - The index of the task.
 * @returns {string} The URL of the priority image.
 */
function setPrioImg(i) {
  if (tasks[i]['prio'] == 'low') {
    let img = 'assets/img/addTask/arrowDownPrioSign.svg';
    return img;
  }
  if (tasks[i]['prio'] == 'medium') {
    let img = 'assets/img/addTask/mediumPrioSignInactive.svg';
    return img;
  }
  if (tasks[i]['prio'] == 'urgent') {
    let img = 'assets/img/addTask/arrowUpPrioSign.svg';
    return img;
  }
}

/**
 * Convert the date format from YYYY-MM-DD to DD/MM/YYYY.
 * @param {string} date - The date in YYYY-MM-DD format.
 * @returns {string} The date in DD/MM/YYYY format.
 */
function convertDateFormat(date) {
  let parts = date.split('-');
  let newDate = parts[2] + '/' + parts[1] + '/' + parts[0];
  return newDate;
}

/**
 * Delete a task.
 * @param {number} i - The index of the task to delete.
 */
function deleteTask(i) {
  tasks.splice(i, 1);
  closeTaskPopup();
}

/**
 * Delete a subtask during task editing.
 * @param {string} id - The ID of the subtask.
 * @param {string} idContainer - The ID of the HTML container for subtasks.
 * @param {string} subTaskInput - The input field of the subtask.
 */
function deleteSubTaskEdit(id, idContainer, subTaskInput) {
  let taskIndex = findTaskEdit(subTaskInput);
  let nr = findSubtaskPositionEdit(id);
  if (subtasks.length == 0 && taskIndex >= 0) {
    pushCurrentSubtasksInArray(taskIndex);
  }
  subtasks.splice(nr, 1);
  renderGeneratedSubTasksEdit(idContainer, taskIndex);
}

/**
 * Find the index of a task based on the subtask input field.
 * @param {string} subTaskInput - The input field of the subtask.
 * @returns {number} The index of the task.
 */
function findTaskEdit(subTaskInput) {
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    for (let j = 0; j < task.subtasks.length; j++) {
      let subtask = task.subtasks[j];
      if (subtask.subTaskInput === subTaskInput) {
        return i;
      }
    }
  }
  return -1;
}

/**
 * Find the position of a subtask based on its ID.
 * @param {string} id - The ID of the subtask.
 * @returns {number} The position of the subtask.
 */
function findSubtaskPositionEdit(id) {
  let nr = subtasks.findIndex((obj) => obj.id === id);
  if (nr == -1) {
  }

  return nr;
}

/**
 * Edit a task.
 * @param {number} i - The index of the task to edit.
 */
async function editTask(i) {
  let popupInfo = document.getElementById('aTPopup');
  let popupEdit = document.getElementById('aTPopupEdit');
  let addTaskPopUpForm = document.getElementById('addTaskPopUpForm');
  if(addTaskPopUpForm){
  document.getElementById('addTaskPopUpForm').remove();};

  popupEdit.classList.remove('d-none');
  popupInfo.classList.add('d-none');

  setEditTaskValues(i);
  renderEditTask(i);
  await pushTasksSubtasks(i);
  setMinDateTodayPopup('myDateInputEdit');
  await loadSelectedContacts(i);
  setAssignedToContactsDropdown();
}

/**
 * Set the values for editing a task.
 * @param {number} i - The index of the task.
 */
function setEditTaskValues(i) {
  let title = document.getElementById('taskTitleEdit');
  let description = document.getElementById('taskDescriptionEdit');
  let dueDate = document.getElementById('myDateInputEdit');
  let selectedCategoryElement = document.getElementById('showSelectedCategoryEdit');

  title.value = tasks[i].taskTitle;
  description.value = tasks[i].taskDescription;
  dueDate.value = tasks[i].taskDueDate;
  selectedCategoryElement.textContent = setCategoryTextContent(i);
  setPrioEdit(tasks[i].prio);
  selectedPrioPopupEdit = tasks[i].prio;
}

/**
 * Push subtasks of a task into the subtasks array.
 * @param {number} i - The index of the task.
 */
function pushTasksSubtasks(i) {
  for (let j = 0; j < tasks[i]['subtasks'].length; j++) {
    let subTask = tasks[i]['subtasks'][j];

    subtasks.push({
      subTaskInput: subTask['subTaskInput'],
      id: subTask['id'],
      isActive: subTask['isActive'],
    });
  }
}

/**
 * Clear the selected contacts array.
 */
function clearSelectedContactsArray() {
  if (selectedContacts.length > 0) {
    selectedContacts = [];
  }
}

/**
 * Add selected contacts from a task to the selected contacts array.
 * @param {number} i - The index of the task.
 */
function addSelectedContactsFromTask(i) {
  let task = tasks[i];

  if (tasks[i].selectedContacts.length > 0) {
    for (let j = 0; j < task.selectedContacts.length; j++) {
      let selectedContact = task.selectedContacts[j];
      selectedContacts.push(selectedContact);
    }
  }
}

/**
 * Delete selected contacts from a task.
 * @param {number} i - The index of the task.
 */
function deleteSelectedContactsFromTask(i) {
  let task = tasks[i];

  for (let j = task.selectedContacts.length - 1; j >= 0; j--) {
    task.selectedContacts.splice(j, 1);
  }
}

/**
 * Render selected contacts for editing a task.
 * @param {number} i - The index of the task.
 */
function renderSelectedContactsEdit(i) {
  let content = document.getElementById('assignedAddedContact');
  content.innerHTML = '';

  for (let j = 0; j < selectedContacts.length; j++) {
    let contact = selectedContacts[j];
    let initials = getInitials(selectedContacts[j]['name']);
    let color = contact['color'];
    content.innerHTML += renderSelectedContactsEditHtml(j, color, initials);
  }
}

/**
 * Remove a selected contact from a task.
 * @param {number} i - The index of the task.
 * @param {number} j - The index of the selected contact.
 */
function removeSelectedContact(i, j) {
  selectedContacts.splice(j, 1);
  renderSelectedContactsEdit(i);
}

/**
 * Populate the assigned dropdown menu with contacts.
 */
function populateAssignedDropdown() {
  for (let i = 0; i < contacts.length; i++) {
    let currentUser = contacts[i]['name'];
    let initials = getInitials(currentUser);
    let color = contacts[i]['color'];
    let assignedDropdownEdit = document.getElementById('assignedDropdown');
    let username = checkForUserName();
    let contactNumber = contacts[i]['nr'];

    if (contacts[i]['name'] === username) {
      assignedDropdown.innerHTML += assignedToUserYouHtml(i, color, currentUser, initials, contactNumber);
    } else {
      assignedDropdown.innerHTML += assignedToUserHtml(i, color, currentUser, initials, contactNumber);
    }
  }
}

