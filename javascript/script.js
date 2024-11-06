const STORAGE_URL = "https://join-f0c08-default-rtdb.europe-west1.firebasedatabase.app/";
const LOCALHOST_URL = "http://localhost:8000/";

let user = [];
let users = [];
let contacts = [];
let contactColors = ["#FF7A00", "#9327FF", "#6E52FF", "#FC71FF", "#FFBB2B", "#1FD7C1", "#462F8A", "#FF4646"];
let legalNoticeOffline = true;
let privacyPolicyOffline = true;

/**
 * Includes HTML content into specified elements.
 * Fetches HTML content from the specified URLs and inserts them into elements with 'w3-include-html' attribute.
 *
 */
async function includeHTML() {
	let includeElements = document.querySelectorAll("[w3-include-html]");
	for (let i = 0; i < includeElements.length; i++) {
		const element = includeElements[i];
		file = element.getAttribute("w3-include-html");
		let resp = await fetch(file);
		if (resp.ok) {
			element.innerHTML = await resp.text();
		} else {
			element.innerHTML = "Page not found";
		}
	}
}

/**
 * Adds CSS classes to elements to indicate active state.
 * @function
 * @param {string} id1 - The ID of the first element.
 * @param {string} id2 - The ID of the second element.
 * @param {string} id3 - The ID of the third element.
 * @param {string} id4 - The ID of the fourth element.
 */
function setColorToActive(id1, id2, id3, id4) {
	let textSidebar = document.getElementById(id1);
	textSidebar.classList.add("active");
	let imageSidebar = document.getElementById(id2);
	imageSidebar.classList.add("filter-white");
	let textBottombar = document.getElementById(id3);
	textBottombar.classList.add("active");
	let imageBottombar = document.getElementById(id4);
	imageBottombar.classList.add("filter-white");
}

/**
 * Toggles the visibility of the top bar dropdown menu.
 * @function
 */
function showTopbarDropdown() {
	document.getElementById("topbar-dropdown").classList.toggle("d-flex");
	document.getElementById("topbar-dropdown").classList.toggle("show-overlay-menu");
}

/**
 * Sets user initials in the top bar.
 * @function
 */
function setUserInitials() {
	let x = user;

	let acronym = getFirstLetters(users[x]["username"]);
	let content = document.getElementById("topbar-user");
	let contentMobile = document.getElementById("topbarUserMobile");
	content.innerHTML = "";
	content.innerHTML = /*html*/ `
    <p>${acronym}</p>
  `;
	contentMobile.innerHTML = "";
	contentMobile.innerHTML = /*html*/ `
    <p>${acronym}</p>
  `;
}

/**
 * Capitalizes the first letter of each word in a string.
 * @param {string} str - The input string.
 * @returns {string} The string with first letters capitalized.
 * @function
 */
function firstLettersUppercase(str) {
	let splitStr = "";
	splitStr = str.toLowerCase().split(" ");
	for (let i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(" ");
}

/**
 * Retrieves the first letters of each word in a string.
 * @param {string} str - The input string.
 * @returns {string} The first letters of each word.
 * @function
 */
function getFirstLetters(str) {
	return str.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), "");
}

/**
 * Sets menu color to active state.
 * @param {string} id - The ID of the element.
 * @function
 */
function setMenuColorToActive(id) {
	let container = document.getElementById(id);
	container.classList.add("active");
	container.classList.add("inactiveNote");
	container.classList.remove("noteLink");
	container.style.hoverColor = "#cdcdcd";
}

/**
 * Checks if the current user's name exists in the list of users.
 * @returns {string} The user's name if found, otherwise undefined.
 * @function
 */
function checkForUserName() {
	for (let i = 0; i < users.length; i++) {
		let userName = users[i]["username"];
		if (userName === users[user]["username"]) {
			return userName;
		}
	}
}

/**
 * Set the username in contacts list.
 * If the username exists, append "(you)" to it and add it to the contacts list.
 * @param {string} userName - The username to be added to contacts.
 */
async function setUsernameInContacts() {
	let currentUser = checkForUser();
	let userName = currentUser["username"];

	let userWithYou = userName + " (you)";
	let userWithYouExistsIndex = contacts.findIndex((contact) => contact.name === userWithYou);

	if (userWithYouExistsIndex === -1) {
		let currentContact = {
			name: userWithYou,
			mail: currentUser["email"],
			phone: "",
			nr: "",
			id: "",
			isChoosen: false,
		};
		contacts.push(currentContact);
		await setColorToContacts();
		await setItemWithAuth("contacts", currentContact);
		contacts = await getItemWithAuth("contacts");
	}
}

/**
 * Checks if a user exists in the `users` array based on the username.
 *
 * @returns {Object|undefined} The user object if found, otherwise undefined.
 */
function checkForUser() {
	for (let i = 0; i < users.length; i++) {
		let currentUser = users[i];
		let userName = users[i]["username"];
		if (userName === users[user]["username"]) {
			return currentUser;
		}
	}
}

/**
 * Toggles CSS classes on an element.
 * @param {string} id - The ID of the element.
 * @param {string} toggle - The class to toggle.
 * @function
 */
function classlistToggle(id, toggle) {
	document.getElementById(id).classList.toggle(toggle);
}

/**
 * Adds a CSS class to an element.
 * @param {string} id - The ID of the element.
 * @param {string} add - The class to add.
 * @function
 */
function classlistAdd(id, add) {
	document.getElementById(id).classList.add(add);
}

/**
 * Removes a CSS class from an element.
 * @param {string} id - The ID of the element.
 * @param {string} remove - The class to remove.
 * @function
 */
function classlistRemove(id, remove) {
	document.getElementById(id).classList.remove(remove);
}

/**
 * Removes one CSS class and adds another to an element.
 * @param {string} id - The ID of the element.
 * @param {string} remove - The class to remove.
 * @param {string} add - The class to add.
 * @function
 */
function classlistRemoveAndAdd(id, remove, add) {
	document.getElementById(id).classList.remove(remove);
	document.getElementById(id).classList.add(add);
}

/**
 * Sets a number property on each contact based on its index.
 * @function
 */
async function setNumberOnContacts() {
	contacts = await getItemWithAuth("contacts");
	for (let i = 0; i < contacts.length; i++) {
		let contact = contacts[i];
		contact["nr"] = i;
		let contactNr = { nr: i };
		patchItemWithAuth("contacts", contact.id, contactNr);
	}
}

/**
 * Set colors to each contact.
 * Assigns colors from predefined contactColors array to each contact in contacts list.
 * @returns {void}
 */
async function setColorToContacts() {
	for (let i = 0; i < contacts.length; i++) {
		let colorIndex = i % contactColors.length;
		contacts[i].color = contactColors[colorIndex];
	}
}

/**
 * Sort the contacts array alphabetically by name.
 * Sorts the contacts array alphabetically by name property.
 * @returns {Array} The sorted contacts array.
 */
function sortContactsByAlphabet() {
	return contacts.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Save the contacts array to the storage.
 * Converts the contacts array to JSON and saves it to the storage.
 * @returns {Promise<void>} A promise that resolves when the contacts are saved.
 */
async function saveContact(i) {
	let contact = contacts[i];
	await patchItemWithAuth("contacts", contact.id, contact);
}

/**
 * Save the contacts array to the storage.
 * Converts the contacts array to JSON and saves it to the storage.
 * @returns {Promise<void>} A promise that resolves when the contacts are saved.
 */
function saveToken(token) {
	localStorage.setItem("authToken", token);
}

/**
 * Save the contacts array to the storage.
 * Converts the contacts array to JSON and saves it to the storage.
 * @returns {Promise<void>} A promise that resolves when the contacts are saved.
 */
function getToken() {
	let authToken = localStorage.getItem("authToken");
	return authToken;
}

/**
 * Save the contacts array to the storage.
 * Converts the contacts array to JSON and saves it to the storage.
 * @returns {Promise<void>} A promise that resolves when the contacts are saved.
 */
function logout() {
	fetch("http://localhost:8001/api/logout/", {
		method: "POST",
		credentials: "include",
	})
		.then((response) => {
			if (!response.ok) {
				console.error("Logout failed");
			}
		})
		.catch((error) => console.error("Error:", error));
}

/**
 * Updates the colors of selected contacts in tasks based on the current contact data.
 *
 * @returns {Promise<void>} A promise that resolves when all tasks have been checked and updated if necessary.
 */
async function setColorsToSelectedContacts() {
	for (const task of tasks) {
		let shouldPatch = false;
		task.selectedContacts.forEach((selectedContact) => {
			contacts.forEach((contact) => {
				if (contact.name === selectedContact.name && selectedContact.color !== contact.color) {
					selectedContact.color = contact.color;
					shouldPatch = true;
				}
			});
		});
		if (shouldPatch) {
			const updatedSelectedContacts = [];
			task.selectedContacts.forEach((contact) => {
				updatedSelectedContacts.push({
					name: contact.name,
					color: contact.color,
					selectedContactsId: contact.selectedContactsId,
				});
			});
			await patchItemWithAuth("tasks", task.id, { selectedContacts: updatedSelectedContacts });
		}
	}
}
