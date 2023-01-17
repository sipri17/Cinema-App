const { ObjectId } = require('mongodb');
const { getDb } = require('../config/mongoConnect');


class User {
    static getCollection() {
        const collection = getDb().collection("users");
        return collection;
    }

    static async createUser(data) {
        try {
            const collection = User.getCollection();
            const newUser = await collection.insertOne(data);
            return newUser;
        } catch (error) {
            throw error
        }
    }

    static async showAllUser() {
        try {
            const collection = User.getCollection();
            const users = await collection.find().toArray();

            return users
        } catch (error) {
            throw error
        }
    }

    static async findUserById(id) {
        try {
            const collection = User.getCollection();
            const user = await collection.findOne({ _id: ObjectId(id) });
            delete user.password;

            return user;
        } catch (error) {
            throw error
        }
    }

    static async findUserByEmail(email) {
        try {
            const collection = User.getCollection();
            const user = await collection.findOne({ email });

            return user;
        } catch (error) {
            throw error
        }
    }

    static async destroyUser(id) {
        try {
            const collection = User.getCollection();
            const deleteStatus = await collection.deleteOne({ _id: ObjectId(id) });
            return deleteStatus
        } catch (error) {
            throw error
        }
    }

}

module.exports = User;