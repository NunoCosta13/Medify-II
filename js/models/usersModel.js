export default class usersModel {
    constructor()  {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : {}
    }

    create(newUser) {
        newUser.id = Object.keys(this.users).length;

        this.users[newUser.id] = newUser;
        this._persist();
    }

    remove(id) {
        delete this.users[id];
        this._persist();
    }

    update(newInfo) {
        this.users[newInfo.id] = newInfo

        this._persist();
    }

    getAll() {
        return this.users;
    }

    get(id) {
        let user = this.users[id] ? this.users[id] : {};

        return user;
    }

    _persist() {
        localStorage.users = JSON.stringify(this.users);
    }
}