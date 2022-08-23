const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.normalize("./db/contacts.json");

const listContacts = async () => {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contactById = allContacts.find(({ id }) => id === contactId);
  return contactById || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [newContactsList] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContactsList;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newId = String(allContacts.length + 1);
  const newContact = {
    id: newId,
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
