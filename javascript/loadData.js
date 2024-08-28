/**
 * Loads data from the storage.
 * Retrieves users, contacts, and tasks from the storage.
 * @returns {Promise<void>} - A promise that resolves once the data is loaded.
 */
async function loadData() {
  try {
    users = await getItemWithAuth('users');
    if (users == null) {
      users = [];
    }
  } catch (error) {
    console.info('could not load users', error);
  }
  try {
    contacts = await getItemWithAuth('contacts');
  } catch (error) {
    console.info('could not load contacts', error);
  }
  try {
    tasks = await getItemWithAuth('tasks');
  } catch (error) {
    console.info('could not load tasks', error);
  }
}

/**
 * Fetches the current user's data from the API.
 * 
 * @returns {Promise<void>} A promise that resolves when the fetch operation completes.
 */
async function fetchUserData() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('http://localhost:8000/api/current_user/', {
      method: 'GET',
      headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
      }
  });

  if (!response.ok) {
    console.error('Failed to fetch user data');
  }
}

/**
 * Sends a POST request with authorization to a specified API path.
 *
 * @param {string} [path=''] - The API endpoint path.
 * @param {Object} [value={}] - The data to send in the request body.
 * 
 * @returns {Promise<void>} A promise that resolves when the request completes.
 */
async function setItemWithAuth(path = '', value = {}) {
  const token = localStorage.getItem('authToken');  

  const response = await fetch(`http://localhost:8000/${path}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`, 
    },
    body: JSON.stringify(value),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error('setTask error response:', errorResponse);
  } 
}

/**
 * Sends a POST request without authorization to a specified API path.
 * 
 * @param {string} [path=''] - The API endpoint path.
 * @param {Object} [value={}] - The data to send in the request body.
 * 
 * @returns {Promise<void>} A promise that resolves when the request completes.
 */
async function setItemNoAuth(path = '', value = {}) {
  const response = await fetch(`http://localhost:8000/${path}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    console.error('setItemNoAuth error response:', errorResponse);
  } 
}

/**
 * Sends a DELETE request with authorization to remove an item by ID.
 *  
 * @param {string} path - The API endpoint path.
 * @param {number|string} id - The ID of the item to delete.
 */
async function deleteItemWithAuth(path, id) {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch(`http://localhost:8000/${path}/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,  
    },
  });

  if (!response.ok) {
    console.error(`Failed to delete ${path.slice(0, -1)} with ID ${id}:`, response.status);
  }
}

/**
 * Sends a PATCH request with authorization to update an item by ID.
 * 
 * @param {string} path - The API endpoint path.
 * @param {number|string} id - The ID of the item to update.
 * @param {Object} data - The data to update in the item.
 * 
 * @returns {Promise<void>} A promise that resolves when the request completes.
 */
async function patchItemWithAuth(path, id, data) {
  const token = localStorage.getItem('authToken');  

  const response = await fetch(`http://localhost:8000/${path}/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`, 
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error(`Failed to patch ${path.slice(0, -1)} with ID ${id}:`, response.status);
  } 
}
  
  

/**
 * Retrieves an item from the storage.
 * @param {string} path - The key path the item to retrieve.
 * @returns {Promise<any>} - A promise that resolves with the retrieved item.
 */
async function getItem(path = '') {
  let response = await fetch(STORAGE_URL + path + '.json'); 
  let responseAsJson = await response.json();

  return responseAsJson;
}

async function getItemBE(path) {
  try {
    let response = await fetch(`http://localhost:8000/${path}/`, {
    });
    if (!response.ok) {
      console.error('HTTP error:', response.status, response.statusText);
      return [];
    }
    let responseAsJson = await response.json();
    return responseAsJson;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

/**
 * Sends a GET request with authorization to retrieve data from a specified API path.
 * 
 * @param {string} path - The API endpoint path.
 * 
 * @returns {Promise<Object|null>} A promise that resolves to the fetched data, or null if the request fails.
 */
async function getItemWithAuth(path) {
  const token = localStorage.getItem('authToken');  

  const response = await fetch(`http://localhost:8000/${path}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,  
    },
  });

  if (response.ok) {
    const users = await response.json();
    return users;
  } else {
    console.error(`Failed to fetch ${path}`);
    return null;
  }
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
