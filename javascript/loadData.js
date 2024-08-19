/**
 * Loads data from the storage.
 * Retrieves users, contacts, and tasks from the storage.
 * @returns {Promise<void>} - A promise that resolves once the data is loaded.
 */
async function loadData() {
  try {
    users = JSON.parse(await getItem('users'));
} catch (e) {
    console.info('could not load users');
  }
  try {
    contacts = JSON.parse(await getItem('contacts'));
  } catch (error) {
    console.info('could not load contacts');
  }
  try {
    tasks = JSON.parse(await getTasks('tasks'));
  } catch (error) {
    console.info('could not load tasks');
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

async function setUser(path = '', value = {}) {
  let response = await fetch(LOCALHOST_URL + path + '/', {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });
}


async function setTask(path = '', value = {}) {
  const token = localStorage.getItem('authToken');  // Token aus localStorage abrufen

  const response = await fetch(`http://localhost:8000/${path}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,  // Token im Authorization-Header
    },
    body: JSON.stringify(value),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error('setTask error response:', errorResponse);
  } else {
    console.log('setTask response:', response);
  }
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


async function getTasks(path = '') {
  // TOKEN???
  let response = await fetch(LOCALHOST_URL + path + '/', {
    // headers: {
    //   'Authorization': 'Token YOUR_API_TOKEN',  // Ersetze YOUR_API_TOKEN mit deinem tatsächlichen Token
    // },
  });
  let responseAsJson = await response.json();

  console.log('getTasks() responseAsJson', responseAsJson)
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
