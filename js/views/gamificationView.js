import gamificationController from '../controllers/gamificationController.js'

export default class gamificationView {
    constructor() {
        this.gamificationController = new gamificationController()
        this.user = JSON.parse(sessionStorage.loggedUser)


        //XP
        //SHOW ON USER PROFILE
        try {
            if (this.user.xp) {
                document.getElementById("xp").innerHTML = this.user.xp + " XP"
            }
        } catch (err) {}


        //BADGES
        //SHOW BADGES IN PROFILE
        try {
            if (this.user.badges) {
                let userBadges = this.user.badges
                for (let badge of userBadges) {

                    document.getElementById("badgesList").innerHTML += `<img class="badgeImg" src="img/badges/` + badge + `Badge.png">`
                }
            }
        } catch (err) {}















        //BUTTONS HANDLER
        try {
            document.getElementById("sendFeedback").addEventListener("click", () => {
                this.gamificationController.addXP()
                this.gamificationController.addBadge("firstAppointment")

                if (document.getElementById("docFeedback").value != "") {
                    this.gamificationController.addBadge("firstFeedback")
                }
                if (parseInt(JSON.parse(sessionStorage.currAppointment).distance) <= 20) {
                    this.gamificationController.addBadge("localSupport")
                }
            })
        } catch (err) {}


        try {
            document.getElementById("endNoFeedback").addEventListener("click", () => {
                this.gamificationController.addXP()
                this.gamificationController.addBadge("firstAppointment")
                if (parseInt(JSON.parse(sessionStorage.currAppointment).distance) <= 20) {
                    this.gamificationController.addBadge("localSupport")
                }
            })
        } catch (err) {}
    }
}