/**
 * Generates HTML for a todo item.
 * @param {number} i - The index of the todo item.
 * @param {string} img - The image source.
 * @param {number} x - The value of x.
 * @returns {string} The HTML string for the todo item.
 */
function generateTodoHTML(i, img, x) {
  return /*html*/ `
    <div class="wobble-container">
      <div draggable="true"  ondragstart="startDragging(${i})"  class="board-task wobble-element" onclick="openTaskPopup(${i})" ontouchstart="startDragging(${i})">
            <div class="board-task-epic" id="board-task-epic${i}">
                ${tasks[i]['selectedCategory']}
            </div>
                <div class="board-task-title">${tasks[i]['taskTitle']}</div>
                <div class="board-task-description">
                ${tasks[i]['taskDescription']}
                </div>
                <div id="subtaskClearIfEmpty-${i}" class="board-task-subtask">
                  <div class="board-task-subtask-progress">
                    <div
                      class="progress-done"
                      id="progress-${i}"
                      style="width: 0%"></div>
                  </div>
                  <div class="sboard-task-subtask-counter">${x}/${tasks[i]['subtasks'].length}</div>
                </div>
                <div class="board-task-member">
                  <div class="board-task-member" id="contactsInBoardTask${i}">
                  </div>
                  <div class="board-task-member-prio">
                    <img src="${img}" alt="" id="taskImg${i}"/>
                </div>`;
}

/**
 * Generates HTML for subtasks.
 * @param {string} id - The ID of the subtask.
 * @param {number} i - The index of the subtask.
 * @returns {string} The HTML string for the subtask.
 */
function subTasksValueHtml(id, i) {
  return /*html*/ `
    <li id="${id}" class="subtask-div-list" ondbclick="editSubTask(${id})"><p>${subtasks[i]['subTaskInput']}</p>
      <div class="d-hover" >
        <img class="subtask-div-btn" onclick="editSubTask(${id})" src="./assets/img/icons/edit.svg" alt="">
        <span class="subTaskInputImg-vertical-1"></span>
        <img class="subtask-div-btn" onclick="deleteSubTask(${id}, 'subTaskContainer')" src="./assets/img/icons/delete.svg" alt="">
      </div>
    </li>`;
}

/**
 * Generates HTML for the subtask input field in an editable task popup.
 * @param {number} i - The index of the task.
 * @returns {string} - The HTML content for the subtask input field.
 */
function subTaskInputEditHtml(i) {
  return /*html*/ `
  <span class="aTPopupSpan">Subtasks</span>
          <div class="inputFieldBox" id="inputFieldBoxEdit">
            <input id="subTaskInputEdit" type="text" placeholder="Add new subtask" onclick="changeButtonsAddTaskEdit('inputFieldBoxEdit', ${i})" />
            <img onclick="addSubTaskEdit('subTaskInputEdit', 'subTaskContainer', ${i})" class="inputImgPlus" src="assets/img/addTask/plus.svg" alt="Add Icon" />
          </div>
          <div id="subTaskErrorEdit" class="subtask-div-error"></div>
  `;
}

/**
 * Generates HTML for the subtask input field in a task popup.
 * @returns {string} - The HTML content for the subtask input field.
 */
function subTaskInputFieldHtml() {
  return /*html*/ `
  <input id="subTaskInput" type="text" placeholder="Add new subtask" onclick="changeButtonsAddTask('inputFieldBox')" />
  <img onclick="addSubTask('subTaskInput', 'inputFieldBox')" class="inputImgPlus" src="assets/img/addTask/plus.svg" alt="Add Icon" />
  `;
}

/**
 * Generates HTML for a subtask in an editable task popup.
 * @param {string} id - The ID of the subtask.
 * @param {string} subTaskInput - The content of the subtask.
 * @param {number} j - The index of the subtask.
 * @returns {string} - The HTML content for the subtask.
 */
function subTasksValueEditHtml(id, subTaskInput, j) {
  return /*html*/ `
    <li id="${id}" class="subtask-div-list" ondbclick="editSubTask(${id})"><p class="subtask-div-list-p">${subTaskInput}</p>
      <div class="d-hover" >
        <img class="subtask-div-btn" onclick="editSubTask(${id})" src="./assets/img/icons/edit.svg" alt="">
        <span class="subTaskInputImg-vertical-1"></span>
        <img class="subtask-div-btn" onclick="deleteSubTaskEdit(${id}, 'subTaskContainer', '${subTaskInput}')" src="./assets/img/icons/delete.svg" alt="">
      </div>
    </li>`;
}

/**
 * Generates HTML for a task popup with specified information.
 * @param {number} i - The index of the task.
 * @param {string} img - The image source for the task.
 * @param {string} date - The due date of the task.
 * @returns {string} - The HTML content for the task popup.
 */
function generateTaskPopupHTML(i, img, date) {
  return /*html*/ `
    <div class="aTPopupContainer" id="aTPopupContainer"> 
    <div id="dropdownClose" class="closePopupBoardLittle" onclick="closeTaskPopup()"></div>

      <div class="aTPopup" id="aTPopup" > 
        <div class="aTPopupContentWrapper">
          <div class="aTPopupTop">
            <div class="aTPopupCategory" id="aTPopupCategory${i}"><p>${tasks[i].selectedCategory}</p></div>
            <div class="aTPopupClose" onclick="closeTaskPopup()"><img src="assets/img/icons/close.svg" alt="Close" /></div>
          </div>
          
          <div class="aTPopupHeadline">
            <h1 class="aTPopupH1">${tasks[i].taskTitle}</h1>
          </div>
          
          <div class="aTPopupDescription"><p class="aTPopupP">${tasks[i].taskDescription}</p></div>
          
          <div class="aTPopupDueDate">
            <div class="aTPopupDateText"><span class="aTPopupSpan">Due date:</span></div>
            <div class="aTPopupDateValue" id="aTPopupDateValue"><p class="aTPopupP">${date}</p></div>
          </div>
          
          <div class="aTPopupPrio">
            <div class="aTPopupPrioText"><span class="aTPopupSpan">Priority:</span></div>
            <div class="aTPopupPrioValue" id="aTPopupPrioValue">
              <p class="aTPopupP">${tasks[i].prio}</p>
              <img id="aTPopupPrioImg" alt="Prio-Img" src=${img}>
            </div>
          </div>
          
          <div class="aTPopupAssignedTo">
            <span class="aTPopupSpan">Assigned to:</span>
            <div class="assigned-contact-profile-container" id="assigned-contact-profile-container"> </div>         
          </div>
          
          <div class="aTPopupSubtasks" id="aTPopupSubtasks${i}">
            <span class="aTPopupSpan">Subtasks</span>
            <div class="subtaskContainer" id="subtaskContainerPopup">
            </div>
          </div>

          <div class="aTPopupButtonsBottom">
          <div class="aTPopupButtonsBottomMenuContainer"> 
            <div>
              <button class="buttonGrey" onclick="openMenuMoveTo('${tasks[i].currentState}')">Move to Category</button>
            </div>
            <div class="menuMoveToMobile d-none" id="menuMoveToMobile">
              <button class="buttonMenuMoveTaskMobile width100" onclick="moveToMobile(${i}, 'toDo')" id="btn-toDo">To do</button>
              <button class="buttonMenuMoveTaskMobile width100" onclick="moveToMobile(${i}, 'inProgress')" id="btn-inProgress">In progress</button>
              <button class="buttonMenuMoveTaskMobile width100" onclick="moveToMobile(${i}, 'awaitFeedback')" id="btn-awaitFeedback">Await feedback</button>
              <button class="buttonMenuMoveTaskMobile width100" onclick="moveToMobile(${i}, 'done')" id="btn-done">Done</button>
            </div>
          </div> 
          <div class=aTPopupButtonsBottomRightContainer>
            <div class="aTPopupDelete" onclick="deleteTask(${i})">
              <img class="delete-img" src="assets/img/icons/delete.svg" alt="Delete" />
              <p class="aTPopupP">Delete</p>
            </div>
            <div class="aTPopupVerticalLine"></div>
            <div class="aTPopupEdit" onclick="editTask(${i})">
              <img class="edit-img" src="assets/img/icons/edit.svg" alt="Edit" />
              <p class="aTPopupP">Edit</p>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div>
      <form class="atPopupEdit d-none" id="aTPopupEdit" onsubmit="saveEditedTask(${i}); return false"> 
        <div class="aTPopupContentWrapper">
          <div class="aTPopupTopEdit">
            <div class="aTPopupCloseEdit" onclick="closeTaskPopup()"><img src="assets/img/icons/close.svg" alt="Close" /></div>
          </div>

          <div class="atPopupEditWrapper">
            <div id="title-add-task-edit">
              <span class="aTPopupSpan">Title<span class="span-required">*</span></span>
              <input id="taskTitleEdit" required type="text" class="border-focus" placeholder="Enter a title" />
            </div>

            <div id="description-edit">
              <span class="aTPopupSpan">Description</span>
              <textarea id="taskDescriptionEdit" class="border-focus" placeholder="Enter a description"></textarea>
            </div>

            <span class="aTPopupSpan">Assigned to</span>
            <div id="assignedToEdit" class="assignedToEdit"></div>
            <div class="assignedAddedContactWrapper">
              <div id="assignedAddedContact" class="assigned-contact-edit"></div>
            </div>

            <div id="due-date-edit">
              <p class="aTPopupSpan text-padding">Due Date<span class="span-required">*</span></p>
              <input id="myDateInputEdit" required type="date" />
            </div>

            <div class="priorityEdit">
              <span class="aTPopupSpan">Prio</span>
              <div class="priority-options-edit">
                <div id="urgentContainerEdit" onclick="changePriorityEdit('urgentContainerEdit', 'urgentImgEdit', 'urgent')">
                  <p class="aTPopupP">Urgent</p>
                  <img src="assets/img/addTask/arrowUpPrioSign.svg" alt="Prio High" id="urgentImgEdit" />
                </div>
                <div id="mediumContainerEdit" onclick="changePriorityEdit('mediumContainerEdit', 'mediumImgEdit', 'medium')">
                  <p class="aTPopupP">Medium</p>
                  <img src="assets/img/addTask/mediumPrioSignInactive.svg" alt="Prio Medium" id="mediumImgEdit" />
                </div>
                <div id="lowContainerEdit" onclick="changePriorityEdit('lowContainerEdit', 'lowImgEdit', 'low')">
                  <p class="aTPopupP">Low</p>
                  <img src="assets/img/addTask/arrowDownPrioSign.svg" alt="Prio Low" id="lowImgEdit" />
                </div>
              </div>
            </div>


            <div class="categoryEdit">
              <p class="aTPopupSpan, text-padding">Category<span class="span-required">*</span></span>
              <div id="dropdownCategory" class="dropdownEdit" onclick="openDropDownCategoryEdit()">
                <div id="showSelectedCategoryEdit" data-value="">Select task category
                </div>
                <img id="dropdownImgArrowCategoryEdit" class="rotate-arrow dropdown-arrow-hover" src="../assets/img/addTask/arrow_drop.svg" alt="">
              </div>
              <div id="assignedDropdownCategoryEdit" class="category-dropdown d-none">
                <div id="userStoryEdit" class="flex-checkbox" data-value="user-story" onclick="selectCategoryEdit('User Story', 'myDateInputEdit')">User Story
                </div>
                <div id="otherEdit" class="flex-checkbox" data-value="technical-task" onclick="selectCategoryEdit('Technical Task', 'myDateInputEdit')">Technical Task
                </div>
              </div>
            </div>

              <div id="subtasksEdit">
              </div>

              <ul id="subTaskContainer" class="subtask-div ulContainer" >
              </ul> 

          </div>

          <div class="btn-edit-task">
            <button id="create-task" class="buttonGrey">
              Ok <img src="assets/img/addTask/check_white.svg" alt="Check Icon"
            /></button>
          </div>
        </div>
      </form>
      </div>
    </div>
  `;
}

function renderAssignedToContacsInfoHtml(contactColor, capitalLetters, selectedContact) {
  return /*html*/ `
  <div class="assigned-contact">
  <div class="assinged-contact-profile" style="background-color: ${contactColor}">${capitalLetters}</div>
          <p class="aTPopupP">${selectedContact.name}</p>
  </div>
`;
}

function renderSubtasksInfoHtml(j, subTask, i) {
  return /*html*/ `
  <div class="subtask" onclick="subTaskActive(${j}, ${i})">
    <input type="checkbox" id="checkboxSubtask-${j}" class="checkboxSavePassword"/>
    <label for="checkboxSubtask-${j}" ></label>
    <p class="aTPopupP">${subTask.subTaskInput}</p>
  </div>
`;
}

function subTasksValueHtml(id, i) {
  return /*html*/ `
    <li id="${id}" class="subtask-div-list" onclick="doNotCLose(event)" ondblclick="editSubTask(${id})"><div class="subtask-div-text">${subtasks[i]['subTaskInput']}</div>
      <div class="subtask-div-list-hover-items">
        <img class="subtask-div-btn" onclick="editSubTask(${id})" src="./assets/img/icons/edit.svg" alt=""><span class="subTaskInputImg-vertical-added"></span>
        <img class="subtask-div-btn" onclick="deleteSubTask(${id}, 'subTaskContainer')" src="./assets/img/icons/delete.svg" alt="">
      </div>
    </li>`;
}

function addTaskPopUpHtml(column) {
  return /*html*/ `
    <form onsubmit="addTaskPopUp('myDateInputPopup', '${column}'); return false" class="formAddTask" id="addTaskPopUpForm">
    <div class="container-left-right-wrapper">
      <section class="container-left-popup">
      
        <div class="headline-add-task"><h1 class="headline-h1-add-task">Add Task</h1></div>

        <div id="title-add-task">
          <p>Title<span class="span-required">*</span></p>
          <input id="taskTitle" required type="text" class="border-focus" placeholder="Enter a title" onkeydown="checkIfFormIsFilled('myDateInputPopup')"/>

        </div>

        <div id="description">
          <p>Description</p>
          <textarea id="taskDescription" class="border-focus" placeholder="Enter a description"></textarea>
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

      <section class="container-right-popup">
        <p>Due Date<span class="span-required">*</span></p>
        <div id="due-date">
          <input id="myDateInputPopup" required type="date" required onkeydown="checkIfFormIsFilled('myDateInputPopup')"/>
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
          <div id="dropdownCategory" class="dropdown" onclick="openDropDownCategory()">
            <div id="showSelectedCategory" data-value="">Select task category</div>
            <img id="dropdownImgArrowCategory" class="rotate-arrow dropdown-arrow-hover" src="../assets/img/addTask/arrow_drop.svg" alt="">
          </div>
          <div id="assignedDropdownCategory" class="category-dropdown d-none">
            <div id="userStory" class="flex-checkbox" data-value="user-story" onclick="selectCategory('User Story', 'myDateInputPopup')">User Story</div>
            <div id="other" class="flex-checkbox" data-value="technical-task" onclick="selectCategory('Technical Task', 'myDateInputPopup')">Technical Task</div>
          </div>
        </div>

        <div id="subtasks"> </div>
        
        <ul id="subTaskContainer" class="subtask-div ulContainer" > </ul> 
        
        <div class="bottom-add-task-mobile">
          <div class="requirement-mobile">
            <p><span class="span-required">*</span>This field is required</p>
          </div>
          <div class="btns-add-task-mobile-wrapper">
            <button onclick="clearInputValuePopup()" id="clear-mobile" class="buttonWhite" >
              Clear <img src="assets/img/addTask/cancel.svg" alt="Clear Icon"
            /></button>
            <button id="create-task-mobile" class="buttonGrey">
              Create Task <img src="assets/img/addTask/check_white.svg" alt="Check Icon"
            /></button>  
          </div>      
        </div>

      </section>
    </div>
      <div class="btns-down-add-task-popup">
        <div class="requirement-desktop-addTask">
          <p class="p-required"><span class="span-required">*</span>This field is required</p>
        </div>
        <div class="btns-down-right-add-task">
          <button onclick="clearInputValuePopup(), doNotClose(event)" id="clear" class="buttonWhite" >
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
 * Generates HTML content for indicating that a task has been added to the board.
 * @returns {string} The HTML content for the task added message.
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
 * Generates HTML content for assigning a user with specified information.
 * @param {number} i - The index of the user.
 * @param {string} color - The background color for the user profile.
 * @param {string} currentUser - The name of the current user.
 * @param {string} initials - The initials of the current user.
 * @returns {string} The HTML content for assigning a user.
 */
function assignedToUserHtml(i, color, currentUser, initials) {
  return /*html*/ `
    <div id="user-${i}" class="flex-checkbox selected-profile" onclick="addAssignedContact(${i}, '${color}')" data-value="${currentUser}">
      <div class="selected-profile"><div class="assinged-contact-profile" style="background-color:${color}">${initials}</div>
      <span class="assigned-name">${currentUser}</span>
    </div>
    <img id="hoverCheckbox" class="hover-checkbox" src="assets/img/icons/checkBoxWhite.svg" alt="">
    <img id="checkBox-${i}" class="flex-checkbox-img"src="assets/img/icons/checkBox.svg" alt="">
  `;
}

/**
 * Generates HTML content for assigning the current user with specified information.
 * @param {number} i - The index of the user.
 * @param {string} color - The background color for the user profile.
 * @param {string} currentUser - The name of the current user.
 * @param {string} initials - The initials of the current user.
 * @returns {string} The HTML content for assigning the current user.
 */
function assignedToUserYouHtml(i, color, currentUser, initials) {
  return /*html*/ `
    <div id="user-${i}" class="flex-checkbox selected-profile" onclick="addAssignedContact(${i}, '${color}')" data-value="${currentUser}">
      <div class="selected-profile"><div class="assinged-contact-profile" style="background-color:${color}">${initials}</div>
      <span class="assigned-name">${currentUser} (you)</span>
    </div>
    <img id="hoverCheckbox" class="hover-checkbox" src="assets/img/icons/checkBoxWhite.svg" alt="">
    <img id="checkBox-${i}" class="flex-checkbox-img"src="assets/img/icons/checkBox.svg" alt="">
  `;
}

/**
 * Generates HTML content for rendering selected contacts with specified information for editing.
 * @param {number} i - The index of the task.
 * @param {number} j - The index of the selected contact.
 * @param {string} color - The background color for the contact profile.
 * @param {string} initials - The initials of the contact.
 * @returns {string} The HTML content for rendering the selected contact for editing.
 */
function renderSelectedContactsEditHtml(contactsIndex, color, initials) {
  return /*html*/ `
    <div class="assinged-contact-overview" style="background-color:${color}" onclick="removeSelectedContact(${selectedContacts[contactsIndex].selectedContactsId})">${initials}</div>
    `;
}

/**
 * Generates HTML content for displaying the task form for editing.
 * @returns {string} The HTML content for displaying the task form for editing.
 */
function showTaskFormEditHtml() {
  return /*html*/ `
    <div name="assigned">
      <div id="dropdownEdit" class="dropdown" onclick="openDropDown('assignedDropdown', 'dropdownImgArrow')">
        <input class="contact-searchbar" onkeyup="filterAddTaskContact()" type="text" id="search" placeholder="Select contacts to assign" />
        <img id="dropdownImgArrow" class="rotate-arrow dropdown-arrow-hover dropdown-arrow-hover" src="../assets/img/addTask/arrow_drop.svg" alt="">
      </div>
    </div>
    <div id="assignedDropdown" class="d-none">
      <div id="assignedAddedContacts"></div>
    </div>
  `;
}

/**
 * Generates HTML content for changing buttons for adding tasks during editing.
 * @param {number} i - The index of the task.
 * @returns {string} - The HTML content for changing buttons for adding tasks during editing.
 */
function changeButtonsAddTaskEditHtml(i) {
  return /*html*/ `
    <input id="subTaskInputEdit" type="text" placeholder="Add new subtask" class="PosRel" />
    <div class="subTaskInputButtons">
      <img class="subTaskInputImg" onclick="setValueBack('subTaskInputEdit', 'subtasksEdit')" src="./assets/img/icons/close.svg" alt="">
      <span class="subTaskInputImg-vertical"></span>
      <img class="subTaskInputImg checkImg" onclick="addSubTaskEdit('subTaskInputEdit', 'subTaskContainer', ${i})" id="addSubTaskEditBtn" src="./assets/img/icons/checkAddTask.svg" alt="">
    </div>
  `;
}

/**
 * Generates HTML content for rendering a contact profile in a board task.
 * @param {string} contact - The name or initials of the contact.
 * @param {string} contactColor - The background color for the contact profile.
 * @returns {string} - The HTML content for rendering the contact profile.
 */
function renderContactsInBoardTaskHtml(contact, contactColor) {
  return /*html*/ `
    <div class="board-task-member-profile" style="background-color: ${contactColor} !important">${contact}</div>
  `;
}

/**
 * Generates HTML content for rendering additional contacts if there are more than four.
 * @param {number} additionalContactLength - The number of additional contacts beyond the fourth.
 * @returns {string} - The HTML content for rendering additional contacts.
 */
function renderIfMoreContactsThanFourHtml(additionalContactLength) {
  return /*html*/ `
    <div class="board-task-member-profile" style="background-color: #a8a8a8 !important">${additionalContactLength}</div>
  `;
}

/**
 * Generates HTML content for rendering additional contacts if there are more than four.
 * @param {number} boxId - The container Id for moving the box.
 * @returns {string} - The HTML content for rendering additional contacts.
 */
function moveBoxTasksHtml(boxId) {
  let moveContainerId = `'` + boxId + `'`;
  let containerId = boxId + 'Empty';
  let removeContainerId = `'` + containerId + `'`;
  return /*html*/ `
 <div class="board-task drag-area-highlight d-none" id="${containerId}";>
 </div>
`;
}
