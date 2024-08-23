/**
 * Loads data from the storage.
 * Retrieves users, contacts, and tasks from the storage.
 * @returns {Promise<void>} - A promise that resolves once the data is loaded.
 */
async function loadData() {
  try {
    // users = JSON.parse(await getItem('users'));
    users = await getItemWithAuth('users');
    if (users == null) {
      users = [];
      console.log('users == null:', users)
    }
    

} catch (error) {
    console.info('could not load users', error);
  }
  try {
    contacts = await getItemBE('contacts');
  } catch (error) {
    console.info('could not load contacts', error);
  }
  try {
    tasks = await getItemBE('tasks');
  } catch (error) {
    console.info('could not load tasks', error);
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




async function setItemWithAuth(path = '', value = {}) {
  const token = localStorage.getItem('authToken');  // Token aus localStorage abrufen

  const response = await fetch(`http://localhost:8000/${path}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,  // Token im Authorization-Header
    },
    body: JSON.stringify(value),
  });
  console.log('setItemWithAuth response:', response)

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error('setTask error response:', errorResponse);
  } else {
    const data = await response.json();
    localStorage.setItem('authToken', data.token);  // Token speichern
  }
}

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
  } else {
    const data = await response.json();
    console.log('Item successfully created:', data);
  }
}

async function deleteItem(path, id) {
  const response = await fetch(`http://localhost:8000/${path}/${id}/`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    console.error(`Failed to delete ${path.slice(0, -1)} with ID ${id}:`, response.status);
  } else {
    console.log(`${path.slice(0, -1)} with ID ${id} successfully deleted`);
    // Hier kannst du deine UI aktualisieren, z.B. das gelöschte Element aus der Liste entfernen
  }
}

async function patchItem(path, id, data) {
  console.log('patchItem id:', id);
  console.log('patchItem data:', data);
  const response = await fetch(`http://localhost:8000/${path}/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
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
  let response = await fetch(STORAGE_URL + path + '.json'); // wichtig!!
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

async function getItemWithAuth(path) {
  const token = localStorage.getItem('authToken');  // Token aus localStorage abrufen

  const response = await fetch(`http://localhost:8000/${path}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,  // Token im Authorization-Header
    },
  });

  if (response.ok) {
    const users = await response.json();
    console.log('Fetched users:', users);
    return users;
  } else {
    console.error('Failed to fetch users');
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
