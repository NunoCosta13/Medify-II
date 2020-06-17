export default class gamificationModel {
    constructor() {
        this.users = JSON.parse(localStorage.users)
    }

    save(user) {
        this.users[user.id] = user
        localStorage.users = JSON.stringify(this.users)
        sessionStorage.loggedUser = JSON.stringify(user)
    }
}