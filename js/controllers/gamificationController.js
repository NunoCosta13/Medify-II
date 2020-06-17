import gamificationModel from '../models/gamificationModel.js'

export default class gamificationController {
    constructor() {
        this.gamificationModel = new gamificationModel()
        this.users = JSON.parse(localStorage.users)
        this.user = sessionStorage.loggedUser != "admin" ? JSON.parse(sessionStorage.loggedUser) : "admin"
    }

    addXP() {
        if (this.user.xp) {
            this.user.xp += 100
        } else {
            this.user.xp = 100
        }

        alert("+100 XP")
        this.gamificationModel.save(this.user)
    }

    addBadge(badgeName) {
        if (this.user.badges) {

            let valid = false
            let userBadges = this.user.badges

            for (let badge in userBadges) {
                if (userBadges[badge] == badgeName) {
                    valid = false
                    break
                } else { valid = true }
            }

            if (valid) {
                this.user.badges.push(badgeName)
                this.gamificationModel.save(this.user)

                alert("won " + badgeName)
            }


        } else {
            this.user.badges = []
            this.user.badges.push(badgeName)
            this.gamificationModel.save(this.user)

            alert("won " + badgeName)
        }
    }
}