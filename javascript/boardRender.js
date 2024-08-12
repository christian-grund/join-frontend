let currentDraggedElement;
let selectedPrioPopupEdit;
let subTaskCounter = 0;
let elementIsDragging = false;

/**
 * Initialize the board by loading data, updating HTML elements, and setting initial user settings.
 */
async function initBoard() {
  await loadData();
  await loadUser();
  await updateHTML();
  await includeHTML();
  setUserInitials();
  setUserToContacts();
  setColorToContacts();
  setColorToActive('sidebarBoard', 'board-img', 'bottomBarBoardMobile', 'boardImgMobile');
  checkTaskAreaDisplayEmpty();
  setNumberOnContacts();
  await resetIsChoosenValue();
  setupEnterKeyListener();
}

/**
 * Registers an event listener for the input field with the ID 'subTaskInput',
 * to respond to the Enter key and call the function 'addSubTask' when the Enter key is pressed.
 */
function setupEnterKeyListener() {
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('subTaskInput').addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        console.log('setupEnterKeyListener');
        addSubTask('subTaskInput', 'subTaskContainer');
        event.preventDefault();
      }
    });
  });
}

/**
 * Render the add task popup for a specific column.
 * @param {string} column - The column identifier.
 */
function renderAddTaskPopUp(column) {
  let contentBoardTask = document.getElementById('boardAddTask');
  contentBoardTask.innerHTML = addTaskPopUpHtml(column);
}

/**
 * Render the assigned contacts in the task popup.
 * @param {number} i - The index of the task.
 */
function renderAssignedToContacs(i) {
  let assingedToContainer = document.getElementById('assigned-contact-profile-container');
  assingedToContainer.innerHTML = '';

  const task = tasks[i];

  if (task.selectedContacts?.length > 0) {
    for (let j = 0; j < task.selectedContacts.length; j++) {
      const selectedContact = task.selectedContacts[j];
      const contactColor = selectedContact.color;
      const capitalLetters = getFirstLetters(selectedContact.name);
      assingedToContainer.innerHTML += renderAssignedToContacsInfoHtml(contactColor, capitalLetters, selectedContact);
    }
  }
}

/**
 * Render subtasks for a task.
 * @param {number} i - The index of the task.
 * @param {string} id - The ID of the HTML container for subtasks.
 */
async function renderSubtasks(i, id) {
  let subTaskContainer = document.getElementById(id);
  subTaskContainer.innerHTML = '';

  let task = tasks[i];

  if (task.subtasks.length > 0) {
    for (let j = 0; j < task.subtasks.length; j++) {
      let subTask = task.subtasks[j];
      subTaskContainer.innerHTML += renderSubtasksInfoHtml(j, subTask, i);
    }
  }
  await checkSubTaskInfoChecked(i);
}

/**
 * Load selected contacts for editing a task.
 * @param {number} i - The index of the task.
 */
function loadSelectedContacts(i) {
  clearSelectedContactsArray();
  addSelectedContactsFromTask(i);
  // deleteSelectedContactsFromTask(i);
  renderSelectedContactsEdit(i);
}

/**
 * Set the text content for the category element.
 * @param {number} i - The index of the task.
 * @returns {string} The text content for the category element.
 */
function setCategoryTextContent(i) {
  if (tasks[i].selectedCategory == '') {
    return 'Select task category';
  } else {
    return tasks[i].selectedCategory;
  }
}

/**
 * Add a subtask during task editing.
 * @param {string} idInput - The ID of the subtask input field.
 * @param {string} idContainer - The ID of the HTML container for subtasks.
 * @param {number} i - The index of the task.
 */
function addSubTaskEdit(idInput, idContainer, i) {
  let subTaskInput = document.getElementById(idInput).value;
  let subTaskError = document.getElementById('subTaskErrorEdit');
  let nr = subtasks.length;
  validateAndAddSubTaskEdit(subTaskInput, subTaskError, nr, idInput, idContainer, i);

  document.getElementById(idInput).value = '';
  renderGeneratedSubTasksEdit(idContainer, i);
  resetSubTaskInputField(idInput);
}

/**
 * Reset the IDs of subtasks.
 */
function resetSubTaskIDs() {
  for (let i = 0; i < subtasks.length; i++) {
    subtasks[i].id = i;
  }
}

/**
 * Render the generated subtasks for editing.
 * @param {string} idContainer - The ID of the HTML container for subtasks.
 */
function renderGeneratedSubTasksEdit(idContainer, j) {
  if (j >= 0) {
    if (tasks[j].subtasks.length > 0) {
      deleteExistingSubtasks(j);
    }
  }

  let container = document.getElementById(idContainer);
  container.innerHTML = ``;
  for (let i = 0; i < subtasks.length; i++) {
    let id = subtasks[i]['id'];
    let subTaskInput = subtasks[i]['subTaskInput'];
    container.innerHTML += subTasksValueEditHtml(id, subTaskInput, j);
  }
}

/**
 * Start dragging a task.
 * @param {string} id - The ID of the task being dragged.
 */
function renderSubTasksInput(i) {
  let container = document.getElementById('subtasksEdit');
  container.innerHTML += subTaskInputEditHtml(i);
}

/**
 * Allow dropping of a task.
 * @param {Event} ev - The drag event.
 */
function renderSubTasksEditable(i, id1) {
  let container = document.getElementById(id1);
  container.innerHTML = ``;

  let task = tasks[i];

  if (task.subtasks.length > 0) {
    for (let j = 0; j < task.subtasks.length; j++) {
      let subTask = task.subtasks[j];
      let id = task.subtasks[j]['id'];
      container.innerHTML += subTasksValueEditHtml(id, subTask.subTaskInput);
    }
  }
}

/**
 * Render the board tasks.
 */
function deleteExistingSubtasks(i) {
  let task = tasks[i];
  task.subtasks.splice(0, task.subtasks.length);
}

/**
 * Render the "To Do" tasks.
 */
function setCategoryBackground(category, id) {
  if (category == 'user-story' || category == 'User Story') {
    document.getElementById(id).classList.add('board-task-epic-green');
  }
  if (category === 'technical-task' || category === 'Technical Task') {
    document.getElementById(id).classList.add('board-task-epic-blue');
  }
}

/**
 * Render the "In Progress" tasks.
 */
function updateHTML() {
  todoAreaUpdate();
  inProgressUpdate();
  feedbackAreaUpdate();
  doneUpdate();
  renderBoardTasks();
}

/**
 * Render the "Done" tasks.
 */
async function inProgressUpdate() {
  let inProgress = tasks.filter((t) => t['selectedCategory'] == 'inProgress');
  document.getElementById('inProgress').innerHTML = '';

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    await setPrioImg(i);
    document.getElementById('inProgress').innerHTML += generateTodoHTML(element, img);
  }
}

/**
 * Render tasks on the board for all categories.
 */
async function renderBoardTasks() {
  await renderToDoTasks();
  await renderInProgressTasks();
  await renderAwaitFeedbackTasks();
  await renderDoneTasks();
  await checkTaskAreaDisplayEmpty();
  await setItem('tasks', JSON.stringify(tasks));
}

/**
 * Render tasks in the "To do" category.
 */
async function renderToDoTasks() {
  let contentBoxToDo = document.getElementById('toDo');
  contentBoxToDo.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]['currentState'] == 'toDo' && tasks[i]['currentState'].length > 0) {
      let img = await setPrioImg(i);
      let x = await checkHowManySubtasksChecked(i);
      contentBoxToDo.innerHTML += generateTodoHTML(i, img, x);
      renderContactsInBoardTask(i);
      setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
      await taskProgressBar(i);
    }
  }
  contentBoxToDo.innerHTML += moveBoxTasksHtml('toDo');
}

/**
 * Render tasks in the "In progress" category.
 */
async function renderInProgressTasks() {
  let contentBoxToDo = document.getElementById('inProgress');
  contentBoxToDo.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]['currentState'] == 'inProgress' && tasks[i]['currentState'].length > 0) {
      let img = await setPrioImg(i);
      let x = await checkHowManySubtasksChecked(i);
      contentBoxToDo.innerHTML += generateTodoHTML(i, img, x);
      renderContactsInBoardTask(i);
      setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
      await taskProgressBar(i);
    }
  }
  contentBoxToDo.innerHTML += moveBoxTasksHtml('inProgress');
}

/**
 * Render tasks in the "Await feedback" category.
 */
async function renderAwaitFeedbackTasks() {
  let contentBoxToDo = document.getElementById('awaitFeedback');
  contentBoxToDo.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]['currentState'] == 'awaitFeedback' && tasks[i]['currentState'].length > 0) {
      let img = await setPrioImg(i);
      let x = await checkHowManySubtasksChecked(i);
      contentBoxToDo.innerHTML += await generateTodoHTML(i, img, x);
      renderContactsInBoardTask(i);
      setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
      await taskProgressBar(i);
    }
  }
  contentBoxToDo.innerHTML += moveBoxTasksHtml('awaitFeedback');
}

/**
 * Render tasks in the "Done" category.
 */
async function renderDoneTasks() {
  let contentBoxToDo = document.getElementById('done');
  contentBoxToDo.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]['currentState'] == 'done' && tasks[i]['currentState'].length > 0) {
      let img = await setPrioImg(i);
      let x = await checkHowManySubtasksChecked(i);
      contentBoxToDo.innerHTML += await generateTodoHTML(i, img, x);
      renderContactsInBoardTask(i);
      setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
      await taskProgressBar(i);
    }
  }
  contentBoxToDo.innerHTML += moveBoxTasksHtml('done');
}

/**
 * Render contacts associated with a task on the board.
 * @param {number} x - The index of the task.
 */
function renderContactsInBoardTask(x) {
  let container = document.getElementById('contactsInBoardTask' + x);
  container.innerHTML = '';
  if (tasks[x]['selectedContacts'].length > 0) {
    for (let i = 0; i < 4; i++) {
      if (tasks[x]['selectedContacts'][i]) {
        let contact = getFirstLetters(tasks[x]['selectedContacts'][i]['name']);
        const contactColor = tasks[x]['selectedContacts'][i]['color'];

        container.innerHTML += renderContactsInBoardTaskHtml(contact, contactColor);
      }
    }
  }
  renderIfMoreContactsThanFour(x);
}

/**
 * Render additional contacts count if more than four contacts associated with a task.
 * @param {number} x - The index of the task.
 */
function renderIfMoreContactsThanFour(x) {
  let container = document.getElementById('contactsInBoardTask' + x);

  if (tasks[x]['selectedContacts'].length > 4) {
    let additionalContactLength = '+' + (tasks[x]['selectedContacts'].length - 4);

    container.innerHTML += renderIfMoreContactsThanFourHtml(additionalContactLength);
  }
}

/**
 * Render searched tasks.
 * @param {number} i - The index of the task.
 */
function renderSearchedTasks(i) {
  if (tasks[i]['currentState'] == 'toDo') {
    renderSearchedTasksToDo(i);
  }
  if (tasks[i]['currentState'] == 'inProgress') {
    renderSearchedTasksInProgress(i);
  }
  if (tasks[i]['currentState'] == 'awaitFeedback') {
    renderSearchedTasksAwaitFeedback(i);
  }
  if (tasks[i]['currentState'] == 'done') {
    renderSearchedTasksDone(i);
  }
  checkTaskAreaDisplayEmpty();
}

/**
 * Render searched tasks in the "To do" category.
 * @param {number} i - The index of the task.
 */
async function renderSearchedTasksToDo(i) {
  let contentBoxToDo = document.getElementById('toDo');
  let img = await setPrioImg(i);
  let x = await checkHowManySubtasksChecked(i);
  contentBoxToDo.innerHTML = '';
  contentBoxToDo.innerHTML += generateTodoHTML(i, img, x);
  setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
  await taskProgressBar(i);
}

/**
 * Render searched tasks in the "In progress" category.
 * @param {number} i - The index of the task.
 */
async function renderSearchedTasksInProgress(i) {
  let contentBoxInProress = document.getElementById('inProgress');
  let img = await setPrioImg(i);
  let x = await checkHowManySubtasksChecked(i);
  contentBoxInProress.innerHTML = '';
  contentBoxInProress.innerHTML += generateTodoHTML(i, img, x);
  setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
  await taskProgressBar(i);
}

/**
 * Render searched tasks in the "Await feedback" category.
 * @param {number} i - The index of the task.
 */
async function renderSearchedTasksAwaitFeedback(i) {
  let contentBoxAwaitFeedback = document.getElementById('awaitFeedback');
  let img = await setPrioImg(i);
  let x = await checkHowManySubtasksChecked(i);
  contentBoxAwaitFeedback.innerHTML = '';
  contentBoxAwaitFeedback.innerHTML += generateTodoHTML(i, img, x);
  setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
  await taskProgressBar(i);
}

/**
 * Render searched tasks in the "Done" category.
 * @param {number} i - The index of the task.
 */
async function renderSearchedTasksDone(i) {
  let contentBoxDone = document.getElementById('done');
  let img = await setPrioImg(i);
  let x = await checkHowManySubtasksChecked(i);
  contentBoxDone.innerHTML = '';
  contentBoxDone.innerHTML += generateTodoHTML(i, img, x);
  setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
  await taskProgressBar(i);
}
