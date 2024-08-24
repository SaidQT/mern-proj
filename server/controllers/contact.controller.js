const Contact = require('../models/contact');

module.exports.findAllContacts = (req, res) => {
    Contact.find()
        .then(allContacts => res.json(allContacts))
        .catch(err => res.status(400).json({ message: 'Something went wrong', error: err }));
};

module.exports.findOneSingleContact = (req, res) => {
    Contact.findById(req.params.id)
        .then(oneContact => res.json(oneContact))
        .catch(err => res.status(400).json({ message: 'Something went wrong', error: err }));
};

module.exports.createNewContact = (req, res) => {
  const { name, email, subject, message } = req.body;

  const errors = {};

  if (!name || name.length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = 'Please provide a valid email address';
  }
  if (!subject || subject.length < 5) {
    errors.subject = 'Subject must be at least 5 characters long';
  }
  if (!message || message.length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  Contact.create(req.body)
    .then(newContact => res.json(newContact))
    .catch(err => res.status(400).json({ message: 'Something went wrong', error: err }));
};

module.exports.deleteAnExistingContact = (req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(deletedContact => res.json(deletedContact))
        .catch(err => res.status(400).json({ message: 'Something went wrong', error: err }));
};
