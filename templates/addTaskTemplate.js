/**
 * Generates HTML for the task addition form.
 * @returns {string} The HTML content for the task addition form.
 */
function addTaskHtml() {
  return /*html*/ `
    <form onsubmit="addTask(event, 'myDateInput', 'toDo')" class="formAddTask">
      <section class="container-left-right-wrapper">
        <section class="container-left">   
          <div class="headline-add-task"><h1 class="headline-h1-add-task">Add Task</h1></div>
          <div id="title-add-task">
            <p>Title<span class="span-required">*</span></p>
            <input id="taskTitle" required type="text" maxlength="100" class="border-focus" placeholder="Enter a title" onkeydown="checkIfFormIsFilled('myDateInput')"/>
          </div>
          <div id="description">
            <p>Description</p>
            <textarea id="taskDescription" class="border-focus" maxlength="200" placeholder="Enter a description"></textarea>
          </div>
          <p class="text-padding">Assigned to</p>
          <div id="assignedTo">
          </div>
          <div class="assinged-contact-wrapper">
            <div id="assignedAddedContact" class="assinged-contact">
            </div>
          </div>
        </section>
        <div class="vertical-line-add-task"></div>
        <section class="container-right">
          <p>Due Date<span class="span-required">*</span></p>
          <div id="due-date">
            <label for="myDateInput"></label>
            <input id="myDateInput" type="date" required oninput="checkIfFormIsFilled('myDateInput')">
          </div>
          <div class="priority">
            <p>Prio</p>
            <div class="priority-options">
              <div id="urgentContainer" onclick="changePrioToUrgent('urgentContainer', 'urgentImg')">
                <p>Urgent</p>
                <img src="assets/img/addTask/arrowUpPrioSign.svg" alt="Prio High" id="urgentImg" />
              </div>
              <div id="mediumContainer" onclick="changePrioToMedium('mediumContainer', 'mediumImg')">
                <p>Medium</p>
                <img src="assets/img/addTask/mediumPrioSignInactive.svg" alt="Prio Medium" id="mediumImg" />
              </div>
              <div id="lowContainer" onclick="changePrioToLow('lowContainer', 'lowImg')">
                <p>Low</p>
                <img src="assets/img/addTask/arrowDownPrioSign.svg" alt="Prio Low" id="lowImg" />
              </div>
            </div>
          </div>
          <div class="category">
            <p>Category<span class="span-required">*</span></p>
            <div id="dropdownCategory" class="dropdown" onclick="openDropDownCategory()" >
              <div id="showSelectedCategory" data-value="">Select task category</div>
              <img id="dropdownImgArrowCategory" class="rotate-arrow dropdown-arrow-hover" src="assets/img/addTask/arrow_drop.svg" alt="">
            </div>
            <div id="assignedDropdownCategory" class="category-dropdown d-none">
              <div id="userStory" class="flex-checkbox" data-value="user-story" onclick="selectCategory('User Story', 'myDateInput')">User Story</div>
              <div id="other" class="flex-checkbox" data-value="technical-task" onclick="selectCategory('Technical Task', 'myDateInput')">Technical Task</div>
            </div>
          </div>
          <div id="subtasks"> </div>
          <ul id="subTaskContainer" class="subtask-div ulContainer" > </ul> 
          <div class="bottom-add-task-mobile">
            <div class="requirement-mobile">
              <p><span class="span-required">*</span>This field is required</p>
            </div>
            <div class="btns-add-task-mobile-wrapper">
              <button onclick="clearInputValue()" id="clear-mobile" class="buttonWhite" >
                Clear <img src="assets/img/addTask/cancel.svg" alt="Clear Icon"
              /></button>
              <button id="create-task-mobile" class="buttonGrey">
                Create Task <img src="assets/img/addTask/check_white.svg" alt="Check Icon"
              /></button>  
            </div>      
          </div>
        </section>
      </section>
        <div class="btns-down-add-task">
          <div class="requirement-desktop-addTask">
            <p class="p-required"><span class="span-required">*</span>This field is required</p>
          </div>
          <div class="btns-down-right-add-task">
            <button onclick="clearInputValue()" id="clear" class="buttonWhite" >
              Clear <img src="assets/img/addTask/cancel.svg" alt="Clear Icon"
            /></button>
            <button  id="create-task" class="buttonGrey" disabled>
              Create Task <img src="assets/img/addTask/check_white.svg" alt="Check Icon"
            /></button>
          </div>
        </div> 
    </form>
  `;
}

/**
 * Generates HTML for the subtask input field.
 * @returns {string} The HTML content for the subtask input field.
 */
function subTaskInputHtml() {
  return /*html*/ `
    <p>Subtasks</p>
    <div class="inputFieldBox" id="inputFieldBox">
      <input id="subTaskInput" class="dropdownSubTaskInput" type="text" placeholder="Add new subtask" onclick="changeButtonsAddTask('inputFieldBox'), doNotClose(event)" />
      <img onclick="addSubTask('subTaskInput', 'subTaskContainer')" class="inputImgPlus" src="assets/img/addTask/plus.svg" alt="Add Icon" />
    </div>
    <div id="subTaskError" class="subtask-div-error"></div>
  `;
}

/**
 * Generates HTML for the subtask input field for Big AddTask.
 * @returns {string} The HTML content for the subtask input field.
 */
function subTaskInputHtmlAddTask() {
  return /*html*/ `
    <p>Subtasks</p>
    <div class="inputFieldBox" id="inputFieldBox">
      <input id="subTaskInput" class="dropdownSubTaskInput" type="text" placeholder="Add new subtask" onclick="changeButtonsAddTask('inputFieldBox')" />
      <img onclick="addSubTask('subTaskInput', 'subTaskContainer')" class="inputImgPlus" src="assets/img/addTask/plus.svg" alt="Add Icon" />
    </div>
    <div id="subTaskError" class="subtask-div-error"></div>
  `;
}

/**
 * Generates HTML for the subtask input field.
 * @returns {string} The HTML content for the subtask input field.
 */
function subTaskInputFieldHtml() {
  return /*html*/ `
    <input id="subTaskInput" type="text" placeholder="Add new subtask" onclick="changeButtonsAddTask('inputFieldBox')" />
    <img onclick="addSubTask('subTaskInput', 'inputFieldBox')" class="inputImgPlus" src="assets/img/addTask/plus.svg" alt="Add Icon" />
  `;
}

/**
 * Generates HTML for a subtask item.
 * @param {string} id - The ID of the subtask item.
 * @param {number} i - The index of the subtask.
 * @returns {string} The HTML content for the subtask item.
 */
function subTasksValueHtml(id, i) {
  return /*html*/ `
    <li id="${id}" class="subtask-div-list" onclick="doNotClose(event)" ondblclick="editSubTask(${id})"><div class="subtask-div-text">${subtasks[i]['subTaskInput']}</div>
      <div class="subtask-div-list-hover-items">
        <img class="subtask-div-btn" onclick="editSubTask(${id})" src="assets/img/icons/edit.svg" alt=""><span class="subTaskInputImg-vertical-added"></span>
        <img class="subtask-div-btn" onclick="deleteSubTask(${id}, 'subTaskContainer')" src="assets/img/icons/delete.svg" alt="">
      </div>
    </li>`;
}

/**
 * Generates HTML for a subtask item big AddTask.
 * @param {string} id - The ID of the subtask item.
 * @param {number} i - The index of the subtask.
 * @returns {string} The HTML content for the subtask item.
 */
function subTasksValueHtmladdTask(id, i) {
  return /*html*/ `
    <li id="${id}" class="subtask-div-list" onclick="doNotClose(event)" ondblclick="editSubTask(${id})"><div class="subtask-div-text">${subtasks[i]['subTaskInput']}</div>
      <div class="subtask-div-list-hover-items">
        <img class="subtask-div-btn" onclick="editSubTask(${id})" src="assets/img/icons/edit.svg" alt=""><span class="subTaskInputImg-vertical-added"></span>
        <img class="subtask-div-btn" onclick="deleteSubTask(${id}, 'subTaskContainer')" src="assets/img/icons/delete.svg" alt="">
      </div>
    </li>`;
}

/**
 * Generates HTML for editing a subtask.
 * @param {string} textContent - The text content of the subtask.
 * @param {string} id - The ID of the subtask item.
 * @returns {string} The HTML content for editing a subtask.
 */
function editSubTaskHtml(textContent, id) {
  return /*html*/ `
    <div class="test-2">
      <input id="editSubTaskInput" type="text" placeholder=${textContent} value=${textContent} />
      <div class="editSubTaskButtonBox">
        <img src="assets/img/icons/delete.svg" alt="Clear Icon" class="inputImgTrash" onclick="deleteSubTask(${id}, 'subTaskContainer')"/>
        <span class="subTaskInputImg-vertical-edit"></span>
        <img src="assets/img/icons/checkAddTask.svg" alt="check" class="inputImgTrash" onclick="addEditSubTask(${id}, 'subTaskContainer')"/>
        <!-- <button id="addEditSubTaskBtn" alt="check" class="inputImgTrash" onclick="addEditSubTask(${id}, 'subTaskContainer')"><img src="assets/img/icons/checkAddTask.svg"></button> -->
      </div>
    </div>
  `;
}

/**
 * Generates HTML for displaying a message when a task is added to the board.
 * @returns {string} The HTML content for the task added to board message.
 */
function addedTaskToBoardHtml() {
  return /*html*/ `
    <div class="signedUpMassage d-none" id="addedTaskToBoard">
      <p class="p-whiteText">Task Added to board</p>
      <img class="addTasktoBoard" src="assets/img/icons/board_icon_white.svg">
    </div>
  `;
}

/**
 * Generates HTML for the task form to add assigned contacts.
 * @returns {string} The HTML content for the task form to add assigned contacts.
 */
function showTaskFormHtml() {
  return /*html*/ `
    <div name="assigned">
      <div id="dropdown" class="dropdown" onclick="openDropDown('assignedDropdown', 'dropdownImgArrow')">
        <input class="contact-searchbar" onkeyup="filterAddTaskContact()" type="text" id="search" placeholder="Select contacts to assign" />
        <img id="dropdownImgArrow" class="rotate-arrow dropdown-arrow-hover dropdown-arrow-hover" src="assets/img/addTask/arrow_drop.svg" alt="">
      </div>
    </div>
    <div id="assignedDropdown" class="d-none">
      <div id="assignedAddedContacts"></div>
    </div>
  `;
}

/**
 * Generates HTML for displaying assigned contacts.
 * @param {number} i - The index of the contact.
 * @param {string} color - The color of the contact.
 * @param {string} currentUser - The name of the contact.
 * @param {string} initials - The initials of the contact.
 * @param {boolean} isChoosen - Indicates if the contact is chosen.
 * @returns {string} The HTML content for displaying assigned contacts.
 */
function assignedToUserHtml(i, color, currentUser, initials, contactNumber) {
  return /*html*/ `
    <div id="user-${i}" class="flex-checkbox selected-profile" onclick="addAssignedContact('${i}', '${color}', ${contactNumber})" data-value="${currentUser}">
      <div class="selected-profile">
        <div class="assinged-contact-profile" style="background-color:${color}">${initials}</div>
        <span class="assigned-name">${currentUser}</span>
      </div>
      <img id="hoverCheckbox" class="hover-checkbox" src="assets/img/icons/checkBoxWhite.svg" alt="">
      <img id="checkBox-${i}" class="flex-checkbox-img" src="assets/img/icons/checkBox.svg" alt="">
    </div>
  `;
}

/**
 * Generates HTML for displaying assigned contacts for the current user.
 * @param {number} i - The index of the contact.
 * @param {string} color - The color of the contact.
 * @param {string} currentUser - The name of the contact.
 * @param {string} initials - The initials of the contact.
 * @param {boolean} isChoosen - Indicates if the contact is chosen.
 * @returns {string} The HTML content for displaying assigned contacts for the current user.
 */
function assignedToUserYouHtml(i, color, currentUser, initials, contactNumber) {
  return /*html*/ `
    <div id="user-${i}" class="flex-checkbox selected-profile" onclick="addAssignedContact(${i}, '${color}', ${contactNumber})" data-value="${currentUser}">
      <div class="selected-profile"><div class="assinged-contact-profile" style="background-color:${color}">${initials}</div>
      <span class="assigned-name">${currentUser} (you)</span>
    </div>
    <img id="hoverCheckbox" class="hover-checkbox" src="assets/img/icons/checkBoxWhite.svg" alt="">
    <img id="checkBox-${i}" class="flex-checkbox-img"src="assets/img/icons/checkBox.svg" alt="">
  `;
}

/**
 * Generates HTML for subtasks after deletion.
 * @param {number} i - The index of the subtask.
 * @param {string} nr - The number of the subtask.
 * @param {string} idContainer - The ID of the subtask container.
 * @returns {string} The HTML content for subtasks after deletion.
 */
function subtasksAfterDeletionHtml(i, nr, idContainer) {
  return /*html*/ `
    <li id="${nr}" class="subtask-div-list test" ondblclick="editSubTask(${nr})"><div class="subtask-div-text">${subtasks[i]['subTaskInput']}</div>
      <div class="subtask-div-list-hover-items">
        <img class="subtask-div-btn" onclick="editSubTask(${nr})" src="assets/img/icons/edit.svg" alt=""><span class="subTaskInputImg-vertical-added"></span>
        <img class="subtask-div-btn" onclick="deleteSubTask(${nr}, '${idContainer}')" src="assets/img/icons/delete.svg" alt="">
      </div>
    </li>
  `;
}

/**
 * Generates HTML for rendering selected contacts.
 * @param {number} contactsIndex - The index of the contact.
 * @param {string} initials - The initials of the contact.
 * @param {string} color - The color of the contact.
 * @returns {string} The HTML content for rendering selected contacts.
 */
function renderSelectedContactsHtml(contactsIndex, initials, color) {
  return /*html*/ `
    <div class="assinged-contact-overview" style="background-color:${color}">${initials}</div>
  `;
}

/**
 * Generates HTML for changing buttons in the task form.
 * @returns {string} The HTML content for changing buttons in the task form.
 */
function changeButtonsAddTaskHtml() {
  return /*html*/ `
    <input id="subTaskInput" type="text" placeholder="Add new subtask" onclick="" class="PosRel" />
    <div class="subTaskInputButtons">
      <img class="subTaskInputImg" onclick="setValueBack('subTaskInput')" src="assets/img/icons/close.svg" alt="">
      <span class="subTaskInputImg-vertical"></span>
      <img class="subTaskInputImg checkImg" id="subTaskInputImgAdd" onclick="addSubTask('subTaskInput', 'subTaskContainer')" src="assets/img/icons/checkAddTask.svg" alt="">
    </div>
  `;
}
