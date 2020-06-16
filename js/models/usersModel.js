export default class usersModel {
    constructor()  {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : {}
    }

    create(newUser) {
        let usersObjK = Object.keys(this.users)

        if (usersObjK.length == 0) {
            newUser.id = 0
        } else {

            let lastid = usersObjK[usersObjK.length - 1]

            newUser.id = parseInt(lastid) + 1
        }

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

    savePer(usersObj) {
        localStorage.users = JSON.stringify(usersObj);
    }

    _persist() {
        localStorage.users = JSON.stringify(this.users);
    }
}