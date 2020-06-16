import usersModel from '../models/usersModel.js'

export default class usersController {
    constructor() {
        this.usersModel = new usersModel();
    }

    checkUser(username) {
        let users = this.usersModel.getAll();

        let s = false;
        for (let user of Object.keys(users)) {
            if (users[user].username == username) {

                s = true;
                break;
            }
        }

        return s;
    }

    checkPassword(username, password) {
        let users = this.usersModel.getAll();

        let s = false;
        for (let user of Object.keys(users)) {
            if ((users[user].username == username) && (users[user].password == password)) {
                s = true;
                break;
            }
        }

        return s;
    }

    getUser(username) {
        let users = this.usersModel.getAll();
        let id;

        for (let user of Object.keys(users)) {
            if (users[user].username == username) {
                id = users[user].id;
            }
        }

        return users[id];
    }

    checkUsername(username) {
        let users = this.usersModel.getAll();

        let s = false;
        for (let user of Object.keys(users)) {
            if (users[user].username == username) {
                s = true;
                break;
            }
        }

        if (username == "admin") {
            s = true
        }

        return s;
    }

    createUser(items) {
        this.usersModel.create(items);
    }

    updateInfo(newInfo) {
        this.usersModel.update(newInfo)
    }
}