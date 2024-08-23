/**
 * Set assigned-to contacts dropdown options.
 */
function setAssignedToContactsDropdown() {
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    for (let j = 0; j < selectedContacts.length; j++) {
      if (contact.name === selectedContacts[j].name) {
        let userID = document.getElementById(`user-${i}`);
        let checkboxImage = document.getElementById(`checkBox-${i}`);
        userID.classList.add('selected-profile-active-item');
        checkboxImage.src = './assets/img/icons/check_button-white.svg';
      }
    }
  }
}

/**
 * Open the move to menu.
 */
function openMenuMoveTo(category) {
  let container = document.getElementById('menuMoveToMobile');
  container.classList.toggle('d-none');
  let button = document.getElementById(`btn-${category}`);
  button.classList.add('d-none');
}

/**
 * Check if subtask information is checked.
 * @param {number} i - The index of the task.
 * @returns {boolean} Whether the subtask information is checked.
 */
async function saveEditedTask(i) {
  let title = document.getElementById('taskTitleEdit');
  let description = document.getElementById('taskDescriptionEdit');
  let dueDate = document.getElementById('myDateInputEdit');
  let selectedCategoryElement = document.getElementById('showSelectedCategoryEdit');
  let selectedCategoryValue = selectedCategoryElement.textContent;

  updateTaskInformation(i, title.value, description.value, dueDate.value, selectedCategoryValue);
  closeTaskPopup();
}

/**
 * Check how many subtasks are checked.
 * @param {number} i - The index of the task.
 * @returns {number} The number of checked subtasks.
 */
function saveAddedSubtasks(i) {
  deleteExistingSubtasks(i);
  tasks[i]['subtasks'].push(subtasks);
}

/**
 * Check if a task area is empty and display a message if it is.
 */
function checkTaskAreaDisplayEmpty(boxId) {
  let dragAreas = document.getElementsByClassName('drag-area');
  let categories = ['To do', 'In progress', 'Await feedback', 'Done'];
  let containerId = boxId + 'Empty';
  for (let i = 0; i < dragAreas.length; i++) {
    let dragArea = dragAreas[i];
    let category = categories[i];

    if (dragArea.children.length < 2) {
      dragArea.innerHTML += /*html*/ `<div class="drag-area-empty">No task in "${category}"</div>`;
      dragArea.innerHTML += /*html*/ ` <div class="board-task drag-area-highlight d-none" id="${containerId}";></div>`;
    }
  }
}

/**
 * Check the active state of subtasks and update the UI.
 * @param {number} i - The index of the task.
 */
function checkSubTaskInfoChecked(i) {
  for (let j = 0; j < tasks[i]['subtasks'].length; j++) {
    const isActive = tasks[i]['subtasks'][j]['isActive'];
    let checkbox = document.getElementById('checkboxSubtask-' + j);
    if (isActive === true) {
      checkbox.checked = true;
    }
    if (isActive === false) {
      checkbox.checked = false;
    }
  }
}

/**
 * Count the number of subtasks that are checked.
 * @param {number} i - The index of the task.
 * @returns {number} The number of checked subtasks.
 */
function checkHowManySubtasksChecked(i) {
  let x = 0;
  for (let j = 0; j < tasks[i]['subtasks'].length; j++) {
    let checked = tasks[i]['subtasks'][j]['isActive'];
    if (checked === true) {
      x++;
    }
  }
  return x;
}

/**
 * Toggle the active state of a subtask.
 * @param {number} j - The index of the subtask.
 * @param {number} i - The index of the task.
 * @returns {Promise<void>}
 */
async function subTaskActive(j, i) {
  let checkbox = document.getElementById('checkboxSubtask-' + j);
  let taskId = tasks[i].id;
  console.log('After', tasks[i]['subtasks'][j]['isActive'])
  if (checkbox.checked === false) {
    checkbox.checked = true;
    tasks[i]['subtasks'][j]['isActive'] = true;
    await patchItem('tasks', taskId, tasks[i]);
    return;
  }
  if (checkbox.checked === true) {
    checkbox.checked = false;
    tasks[i]['subtasks'][j]['isActive'] = false;
    await patchItem('tasks', taskId, tasks[i]);
    return;
  }
  
}

/**
 * Update the task progress bar based on the completion of subtasks.
 * @param {number} i - The index of the task.
 * @returns {Promise<void>}
 */
async function taskProgressBar(i) {
  let x = await checkHowManySubtasksChecked(i);
  let progressBar = document.getElementById(`progress-${i}`);
  let subtaskClearIfEmpty = document.getElementById(`subtaskClearIfEmpty-${i}`);
  let allSubtasks = tasks[i]['subtasks'].length;
  let width = (100 / allSubtasks) * x;
  if (width > 0) {
    progressBar.style.width = `${width}%`;
  }
  if (allSubtasks == 0) {
    subtaskClearIfEmpty.innerHTML = '';
  }
}

/**
 * Prevent closing event propagation.
 * @param {Event} event - The event object.
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 * Move a task to a different category in mobile view.
 * @param {number} i - The index of the task.
 * @param {string} category - The category to move the task to.
 */
async function moveToMobile(i, category) {
  tasks[i]['currentState'] = category;
  await openMenuMoveTo();
  await renderBoardTasks();
}

/**
 * Filter tasks based on search input.
 */
function filterTasks() {
  let search = document.getElementById('searchTasks').value.toLowerCase();
  clearTasksContainer();
  if (search.trim() === '') {
    updateHTML();
  } else {
    for (let i = 0; i < tasks.length; i++) {
      let taskTitle = tasks[i]['taskTitle'];
      let taskDescription = tasks[i]['taskDescription'];
      if (taskTitle.toLowerCase().includes(search) || taskDescription.toLowerCase().includes(search)) {
        renderSearchedTasks(i);
      }
    }
  }
}

/**
 * Clear the task containers on the board.
 */
function clearTasksContainer() {
  document.getElementById('toDo').innerHTML = ``;
  document.getElementById('inProgress').innerHTML = ``;
  document.getElementById('awaitFeedback').innerHTML = ``;
  document.getElementById('done').innerHTML = ``;
}

/**
 * Open the category dropdown for editing a task.
 */
function openDropDownCategoryEdit() {
  let assignedDropdownCategory = document.getElementById('assignedDropdownCategoryEdit');
  let dropdownImgArrowCategory = document.getElementById('dropdownImgArrowCategoryEdit');
  assignedDropdownCategory.classList.toggle('d-none');
  dropdownImgArrowCategory.classList.toggle('rotate-arrow');
}

/**
 * Highlight a drop zone.
 * @param {string} id - The ID of the drop zone to highlight.
 */
function highlight(id) {
  let containerId = id + 'Empty';
  let container = document.getElementById(containerId);
  if (elementIsDragging === true && container.classList.contains('d-none')) {
    container.classList.remove('d-none');
  }
}

/**
 * Remove highlight from a drop zone.
 * @param {string} id - The ID of the drop zone to remove highlight from.
 */
function removeHighlight(id, event) {
  if (event.currentTarget.contains(event.relatedTarget)) {
    return;
  }
  if (id !== 'awaitFeedback') {
    let emptyId = id + 'Empty';
    let container = document.getElementById(emptyId);

    container.classList.add('d-none');
  }
}

/**
 * Select a category for editing a task.
 * @param {string} category - The selected category.
 */
function selectCategoryEdit(category) {
  const userStory = document.getElementById('userStoryEdit');
  const technicalTask = document.getElementById('otherEdit');
  const showSelectedCategory = document.getElementById('showSelectedCategoryEdit');
  const assignedDropdownCategory = document.getElementById('assignedDropdownCategoryEdit');
  selectCategoryIfElse(userStory, technicalTask, showSelectedCategory, assignedDropdownCategory, category);
}

/**
 * Allow dropping items into a drop zone.
 * @param {Event} ev - The event object.
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Move a task to a different category.
 * @param {string} category - The category to move the task to.
 */
async function moveTo(category) {
  tasks[currentDraggedElement]['currentState'] = category;
  // removeHighlight(category);
  await updateHTML();
  elementIsDragging = false;
}

/**
 * Start dragging an element.
 * @param {number} id - The ID of the element being dragged.
 */
function startDragging(id) {
  currentDraggedElement = id;
  elementIsDragging = true;
}

/**
 * Update the "To Do" area.
 */
async function doneUpdate() {
  let done = tasks.filter((t) => t['selectedCategory'] == 'done');
  document.getElementById('done').innerHTML = '';

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    await setPrioImg(i);
    document.getElementById('done').innerHTML += generateTodoHTML(element, img);
  }
}

/**
 * Update the HTML elements.
 */
async function feedbackAreaUpdate() {
  let awaitFeedback = tasks.filter((t) => t['selectedCategory'] == 'awaitFeedback');
  document.getElementById('awaitFeedback').innerHTML = '';

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    await setPrioImg(i);
    document.getElementById('awaitFeedback').innerHTML += generateTodoHTML(element, img);
  }
}

/**
 * Render the "Awaiting Feedback" tasks.
 */
async function todoAreaUpdate() {
  let todo = tasks.filter((t) => t['selectedCategory'] == 'toDo');
  document.getElementById('toDo').innerHTML = '';

  for (let index = 0; index < todo.length; index++) {
    const element = todo[index];
    await setPrioImg(i);
    document.getElementById('toDo').innerHTML += generateTodoHTML(element, img);
  }
}

/**
 * Active a subtask.
 * @param {number} j - The index of the subtask.
 * @param {number} i - The index of the task.
 */
function changePriorityEdit(idContainer, idImg, priority) {
  let prioContainer = document.getElementById(idContainer);
  let img = document.getElementById(idImg);
  resetPriorityContainers();
  prioContainer.classList.add('priority' + priority.charAt(0).toUpperCase() + priority.slice(1) + 'Active');
  img.src = './assets/img/addTask/' + priority + 'PrioActive.svg';
  selectedPrioPopupEdit = priority;
}

/**
 * Reset priority containers and images.
 */
function resetPriorityContainers() {
  document.getElementById('urgentContainerEdit').classList.remove('priorityUrgentActive');
  document.getElementById('urgentImgEdit').src = './assets/img/addTask/arrowUpPrioSign.svg';
  document.getElementById('mediumContainerEdit').classList.remove('priorityMediumActive');
  document.getElementById('mediumImgEdit').src = './assets/img/addTask/mediumPrioSignInactive.svg';
  document.getElementById('lowContainerEdit').classList.remove('priorityLowActive');
  document.getElementById('lowImgEdit').src = './assets/img/addTask/arrowDownPrioSign.svg';
}

/**
 * Update task information.
 * @param {number} i - The index of the task.
 * @param {string} taskTitle - The title of the task.
 * @param {string} taskDescription - The description of the task.
 * @param {string} taskDueDate - The due date of the task.
 * @param {string} selectedCategoryValue - The selected category of the task.
 */
async function updateTaskInformation(i, taskTitle, taskDescription, taskDueDate, selectedCategoryValue) {
  let currentTask = tasks[i];
  let taskId = tasks[i].id;
  currentTask.taskTitle = taskTitle;
  currentTask.taskDescription = taskDescription;
  currentTask.taskDueDate = taskDueDate;
  currentTask.selectedContacts = selectedContacts;
  currentTask.selectedCategory = selectedCategoryValue;
  currentTask.prio = selectedPrioPopupEdit;
  currentTask['subtasks'] = subtasks;

  currentTask = {
    taskTitle: taskTitle,
    taskDescription: taskDescription,
    selectedContacts: selectedContacts,
    taskDueDate: taskDueDate,
    selectedCategory: selectedCategoryValue,
    prio: selectedPrioPopupEdit,
    subtasks: subtasks,
  }
  await patchItem('tasks', taskId, currentTask);
}

/**
 * Task progress bar.
 * @param {number} i - The index of the task.
 */
function setPrioEdit(prio) {
  if (prio == 'low') {
    classlistAdd('lowContainerEdit', 'priorityLowActive');
    document.getElementById('lowImgEdit').src = './assets/img/addTask/lowPrioActive.svg';
  }
  if (prio == 'medium') {
    classlistAdd('mediumContainerEdit', 'priorityMediumActive');
    document.getElementById('mediumImgEdit').src = './assets/img/addTask/mediumPrioSign.svg';
  }
  if (prio == 'urgent') {
    classlistAdd('urgentContainerEdit', 'priorityUrgentActive');
    document.getElementById('urgentImgEdit').src = './assets/img/addTask/urgentPrioActive.svg';
  }
  selectedPrioPopupEdit = prio;
}

/**
 * Move a task to a different category.
 * @param {string} category - The category to move the task to.
 */
function showTaskFormEdit(id) {
  let assignedTo = document.getElementById(id);
  assignedTo.innerHTML = showTaskFormEditHtml();
  sortContactsByAlphabet();
  populateAssignedDropdown();
}

/**
 * Move a task to a different category on mobile devices.
 * @param {number} i - The index of the task.
 * @param {string} category - The category to move the task to.
 */
function changeButtonsAddTaskEdit(id, i) {
  let inputField = document.getElementById(id);

  inputField.innerHTML = changeButtonsAddTaskEditHtml(i);
  document.getElementById('subTaskInputEdit').focus();
}

/**
 * Save the edited task.
 * @param {number} i - The index of the task.
 */
function renderEditTask(i) {
  renderSubTasksInput(i);
  renderSubTasksEditable(i, 'subTaskContainer');
  showTaskFormEdit('assignedToEdit');
}

/**
 * Validate and add a subtask during task editing.
 * @param {string} subTaskInput - The input value of the subtask.
 * @param {HTMLElement} subTaskError - The element to display error messages.
 * @param {number} nr - The number of subtasks.
 * @param {string} idInput - The ID of the subtask input field.
 * @param {string} idContainer - The ID of the HTML container for subtasks.
 * @param {number} i - The index of the task.
 */
function validateAndAddSubTaskEdit(subTaskInput, subTaskError, nr, idInput, idContainer, i) {
  if (subTaskInput.trim() === '') {
    subTaskError.innerHTML = /*HTML*/ `
    Subtask bitte bei Bedarf hinzufügen.`;
  } else {
    subTaskError.innerHTML = /*HTML*/ ``;
    subtasks.push({
      subTaskInput: subTaskInput,
      id: nr,
      isActive: false,
    });

    document.getElementById(idInput).value = '';
    renderGeneratedSubTasksEdit(idContainer, i);
    resetSubTaskInputField(idInput);
  }
}
