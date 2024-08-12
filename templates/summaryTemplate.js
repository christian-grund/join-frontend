/**
 * Changes the image source to display a white pencil icon when hovering over a to-do element.
 *
 * @param {string} element - The ID of the element to be hovered over.
 */
function hoverTodo(element) {
  let img = document.getElementById(element);
  img.setAttribute('src', '../assets/img/summary/pencilWhiteDesktop.svg');
}


/**
 * Changes the image source to display a black pencil icon when not hovering over a to-do element.
 *
 * @param {string} element - The ID of the element to be unhovered.
 */
function unhoverTodo(element) {
  let img = document.getElementById(element);
  img.setAttribute('src', '../assets/img/summary/pencilBlackDesktop.svg');
}


/**
 * Changes the image source to display a white checkmark icon when hovering over a done element.
 *
 * @param {string} element - The ID of the element to be hovered over.
 */
function hoverDone(element) {
  let img = document.getElementById(element);
  img.setAttribute('src', '../assets/img/summary/hookButtonWhiteDesktop.svg');
}


/**
 * Changes the image source to display a black checkmark icon when not hovering over a done element.
 *
 * @param {string} element - The ID of the element to be unhovered.
 */
function unhoverDone(element) {
  let img = document.getElementById(element);
  img.setAttribute('src', '../assets/img/summary/hookButtonBlackDesktop.svg');
}


/**
 * Generates HTML content for the summary section of the webpage.
 *
 * @returns {string} The HTML content for the summary section.
 */
function summaryHtml() {
  return /*html*/ `
  <div class="summary-padding">
    <div class="row-header flex-start">
      <h2 class="summary-h2">Join 360</h2>
      <span class="summary-vertical-line"></span>
      <h3 class="summary-h3">Key Metrics at a Glance</h3>
      <div class="summary-vertical-line-mobile"></div>
    </div>
  </div>
      <div class="row">
        <div class="sum-col-50">
          <div class="sum-row-container">
            <div class="sum-col-12 summary-flex">
              <div class="sum-col-6">
                <a href="/board.html">
                  <div class="summary-todo summary-gap-default" onmouseover="hoverTodo('todoImg');" onmouseout="unhoverTodo('todoImg');">
                  <img class="boardImg" src="../assets/img/summary/pencilBlackDesktop.svg" alt="" id="todoImg"  />
                  <div class="summary-flex-column">
                    <div class="summary-todo-counter">${todoTasks}</div>
                    <div
                      class="summary-todo-counter-text-m summary-todo-counter-text">
                      To-do
                    </div>
                  </div>
                </div>
              </a>
              </div>
              <div class="sum-col-6">
                <a href="/board.html">
                <div class="summary-todo summary-gap-default" onmouseover="hoverDone('doneImg');" onmouseout="unhoverDone('doneImg');">
                  <img class="boardImg" src="../assets/img/summary/hookButtonBlackDesktop.svg" alt="" id="doneImg"/>
                  <div class="summary-flex-column">
                    <div class="summary-todo-counter">${doneTasks}</div>
                    <div
                      class="summary-todo-counter-text-m summary-todo-counter-text">
                      Done
                    </div>
                  </div>
                </div>
                </a>
              </div>
            </div>
          </div>
          <div class="sum-row-container">
        <div class="sum-col-12">
          <a href="/board.html">
              <div class="summary-summarySmallContainerMiddle summary-gap-urgent">
                <div class="sum-col-6">
                  <div class="summary-urgent-wrapper">
                    <img class="boardImg" src="./assets/img/summary/urgent-icon.svg" alt="" />
                    <div class="summary-flex-column">
                      <div class="summary-todo-counter">${urgentTasks}</div>
                      <div
                        class="summary-todo-counter-text-m summary-todo-counter-text">
                        Urgent
                      </div>
                    </div>
                  </div>
                </div>
                <div class="summary-urgent-verical-line"></div>
                <div class="sum-col-6 summary-date-col">
                  <div class="summary-date" id="summary-date">October 16, 2022</div>
                  <div class="summary-subtitle" id="summary-subtitle">Upcoming Deadline</div>
                </div>
              </div>
            </a>
            </div>        
    
            </div>
            <div class="sum-row-container">
              <div class="sum-col-12 summary-flex-counter">
                <div class="sum-col-4">
                  <a href="/board.html">
                  <div class="summary-tasksContainerDown summary-gap-default">
                    <div class="summary-flex-column">
                      <div class="summary-tasksContainerDown-counter">${tasksInBoard}</div>
                      <div
                        class="summary-tasksContainerDown-counter-text-m summary-tasksContainerDown-counter-text">
                        Tasks in 
                        <br> Board 
                      </div>
                    </div>
                  </div>
                </a>
                </div>
                <div class="sum-col-4">
                  <a href="/board.html">
                  <div class="summary-tasksContainerDown summary-gap-default">
                    <div class="summary-flex-column">
                      <div class="summary-tasksContainerDown-counter">${progressTasks}</div>
                      <div
                        class="summary-tasksContainerDown-counter-text-m summary-tasksContainerDown-counter-text">
                        Tasks In Progress
                      </div>
                    </div>
                  </div>
                  </a>
                </div>
                <div class="sum-col-4 summarySmallContainerDown">
                  <a href="/board.html">
                  <div class="summary-tasksContainerDown summary-gap-default">
                    <div class="summary-flex-column">
                      <div class="summary-tasksContainerDown-counter">${awaitFeedbackTasks}</div>
                      <div
                        class="summary-tasksContainerDown-counter-text-m summary-tasksContainerDown-counter-text">
                        Awaiting Feedback
                      </div>
                    </div>
                  </div>
                  </a>
                </div>
              </div>
              <div class="sum-col-6 d-none"></div>
            </div>  
          </div>
          <div class="sum-col-50 sum-greetings">
            <div class="greetingsMassageContainer" id="col-6">
    
          </div>
      </div>`;
}

/**
 * Generates HTML content for the mobile greeting section.
 *
 * @param {string} greetingText - The greeting text to be displayed.
 * @param {string} userName - The name of the user to be displayed.
 * @returns {string} The HTML content for the mobile greeting section.
 */
function greetMobileTemplate(greetingText, userName) {
  return /*html*/ `
  <div class="colMobile">
    <div class="colMobile-flex">
      <div class="summary-welcome-mobile">${greetingText}</div>
      <div class="summary-welcome-name-mobile">${userName}</div>
    </div>
  </div>
  `;
}
