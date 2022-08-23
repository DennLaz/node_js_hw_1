const { program } = require("commander");

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listContacts = await contacts.listContacts();
      console.table(listContacts);
      break;
    case "get":
      const getOneContactById = await contacts.getContactById(id);
      console.table(getOneContactById);
      break;
    case "add":
      const addContact = await contacts.addContact({ name, email, phone });
      console.table(addContact);
      break;
    case "remove":
      const removeContanct = await contacts.removeContact(id);
      console.table(removeContanct);
      break;
    default:
      console.warn("Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

invokeAction(options);
