import gamificationModel from '../models/gamificationModel.js'

export default class gamificationController {
    constructor() {
        try {
            this.storeItems = {
                appointmentsDiscount: {
                    discount25: {
                        name: "25% Desconto",
                        desc: "lorem ipsum",
                        price: 50
                    },
                    discount50: {
                        name: "50% Desconto",
                        desc: "lorem ipsum",
                        price: 100
                    },
                    discount100: {
                        name: "100% Desconto",
                        desc: "lorem ipsum",
                        price: 150
                    }
                },
                pillsDiscount: {
                    discount5: {
                        name: "5% Desconto",
                        desc: "lorem ipsum",
                        price: 10
                    },
                    discount25: {
                        name: "25% Desconto",
                        desc: "lorem ipsum",
                        price: 30
                    }
                }
            }

            this.gamificationModel = new gamificationModel()
            this.users = JSON.parse(localStorage.users)
            this.user = sessionStorage.loggedUser != "admin" ? JSON.parse(sessionStorage.loggedUser) : "admin"
        } catch (err) {}
    }

    addXP(amount) {
        if (this.user.xp) {
            this.user.xp += amount
        } else {
            this.user.xp = amount
        }

        alert("+" + amount + " XP")
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

                this.addXP(300)
                alert("won " + badgeName)
            }


        } else {
            this.user.badges = []
            this.user.badges.push(badgeName)
            this.gamificationModel.save(this.user)

            this.addXP(300)
            alert("won " + badgeName)
        }
    }

    redeem(type, name) {
        if (this.user.coins) {
            if (Number(this.user.coins) >= Number(this.storeItems[type][name].price)) {

                this.addXP(100)
                this.user.coins = parseFloat(Number(this.user.coins) - Number(this.storeItems[type][name].price)).toFixed(2)
                this.users[this.user.id] = this.user
                localStorage.users = JSON.stringify(this.users)
                sessionStorage.loggedUser = JSON.stringify(this.user)

                alert("bought")
            } else {
                alert("not enough coins")
            }
        } else {
            alert("not enough coins")
        }
    }

    exchange(xpStr, coinsStr) {
        coinsStr = coinsStr.replace(",", ".")
        let coinsValue = Number(parseFloat(coinsStr).toFixed(2))
        let xpValue = parseInt(xpStr)
        let userXP = this.user.xp ? parseInt(this.user.xp) : 0

        if (this.user.xp) {
            if (xpValue > userXP) {
                alert("Not enough XP! You need " + (xpValue - userXP) + " XP.")
            } else {
                this.user.xp -= xpValue
                this.user.coins = this.user.coins ? parseFloat((Number(this.user.coins) + coinsValue)).toFixed(2) : coinsValue

                //SAVES TO STORAGE
                let users = JSON.parse(localStorage.users)
                users[this.user.id] = this.user
                localStorage.users = JSON.stringify(users)
                sessionStorage.loggedUser = JSON.stringify(this.user)

                alert("SUCCESS")
                location.reload()
            }
        } else {
            alert("Not enough coins!")
        }
    }
}