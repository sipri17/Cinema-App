const { hashedPassword } = require("../helpers/bcrypt");
const User = require("../models/User");

class Controller {
  static async register(req, res, next) {
    try {
      let  { email, password, role, phoneNumber, address } = req.body;
      if (!email) {
        throw { name: '400error', message: 'Email is required' };
      }
      if (!password) {
        throw { name: '400error', message: 'Password is required' };
      }
      if (password.length < 5) {
        throw { name: '400error', message: 'The password is at least 5 characters long' };
      }


      const checkUser = await User.findUserByEmail(email)
      if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) throw { name:'400error', message: "Email invalid" }
      if(checkUser) throw {name:'400error', message: 'Email must be unique' }

      password = hashedPassword(password)
      

      const user = await User.createUser({ email, password, role, phoneNumber, address });
      res.status(201).json({ message: `User with id ${user.insertedId} has been created` });
    } catch (error) {
      next(error);
    }
  }


  static async showAllUser(req, res, next) {
    try {
      const users = await User.showAllUser();

      res.status(200).json(users.map(user => {
        delete user.password;
        return user
      }));
    } catch (error) {
      next(error);
    }
  }


  static async findUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findUserById(id);

      if (!user) {
        throw { name: '404error', message: 'User is not found' };
      }

      delete user.password;

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async findUserByEmail(req, res, next) {
    try {
      const { email } = req.body
      const user = await User.findUserByEmail(email);

      if (!user) {
        throw { name: '404error', message: 'User is not found' };
      }

      delete user.password;

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }


  static async destroyUser(req, res, next) {
    try {
      const { id } = req.params;
      const result = await User.destroyUser(id);
      if (!result.deletedCount) {
        throw { name: '404error', message: 'User is not found' };

      }
      res.status(200).json({ message: "User is successfully deleted" });
    } catch (error) {
      next(error);
    }
  }



}

module.exports = Controller;