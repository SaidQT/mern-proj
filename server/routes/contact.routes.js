const ContactController = require('../controllers/contact.controller');

module.exports = app => {
    app.get('/api/contacts', ContactController.findAllContacts);
    app.get('/api/contact/:id', ContactController.findOneSingleContact);
    app.post('/api/contact', ContactController.createNewContact);
    app.delete('/api/contact/:id', ContactController.deleteAnExistingContact);
};
