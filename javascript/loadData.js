/**
 * Loads data from the storage.
 * Retrieves users, contacts, and tasks from the storage.
 * @returns {Promise<void>} - A promise that resolves once the data is loaded.
 */
async function loadData() {
  try {
    users = JSON.parse(await getItem('users'));
    contacts = JSON.parse(await getItem('contacts'));
    tasks = JSON.parse(await getItem('tasks'));
  } catch (e) {
    console.info('could not load users');
  }
}

/**
 * Sets an item in the storage.
 * @param {string} key - The key of the item to set.
 * @param {any} value - The value of the item to set.
 * @returns {Promise<any>} - A promise that resolves with the result of the operation.
 */
async function setItem(path = '', value = {}) {
  let response = await fetch(STORAGE_URL + path + '.json', {
    method: 'PUT',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });
}

/**
 * Retrieves an item from the storage.
 * @param {string} path - The key path the item to retrieve.
 * @returns {Promise<any>} - A promise that resolves with the retrieved item.
 */
async function getItem(path = '') {
  let response = await fetch(STORAGE_URL + path + '.json'); // wichtig!!
  let responseAsJson = await response.json();

  return responseAsJson;
}

/**
 * Loads user data from local storage.
 * Retrieves the user object from local storage if available.
 * @returns {void}
 */
function loadUser() {
  let userAsText = localStorage.getItem('user');
  if (userAsText) {
    user = JSON.parse(userAsText);
  }
}
