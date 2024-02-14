import User from '../models/user.js';

export const createContact = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        user.contacts.push(req.body);
        await user.save();

        res.status(201).send(user.contacts[user.contacts.length - 1]);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const updateContact = async (req, res) => {
    try {
        const { userId, contactId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const contactIndex = user.contacts.findIndex(contact => contact._id == contactId);
        if (contactIndex === -1) {
            return res.status(404).send("Contact not found");
        }

        // Update the contact fields
        user.contacts[contactIndex] = { ...user.contacts[contactIndex], ...req.body.contact };
        await user.save();

        res.send(user.contacts[contactIndex]);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteContact = async (req, res) => {
    try {
        const { userId, contactId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const contactIndex = user.contacts.findIndex(contact => contact._id == contactId);
        if (contactIndex === -1) {
            return res.status(404).send("Contact not found");
        }

        const deletedContact = user.contacts.splice(contactIndex, 1);
        await user.save();

        res.send(deletedContact);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAllContactsOfUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        res.send(user.contacts);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getContactByIdOfUser = async (req, res) => {
    try {
        const { userId, contactId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const contact = user.contacts.find(contact => contact._id == contactId);
        if (!contact) {
            return res.status(404).send("Contact not found");
        }

        res.send(contact);
    } catch (error) {
        res.status(500).send(error);
    }
};
