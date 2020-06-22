import usersModel from '../models/usersModel.js'
import doctorsModel from '../models/doctorsModel.js'
import gamificationController from '../controllers/gamificationController.js'

export default class appointmentsController {
    constructor() {
        this.usersModel = new usersModel()
        this.doctorsModel = new doctorsModel()
        this.gamificationController = new gamificationController()
    }

    startAppointment(docId, dist) {
        if (sessionStorage.loggedUser) {
            //SETS THE DATE
            var d = new Date();
            var n = d.toLocaleDateString();

            //SETS THE INFO TO SAVE
            let userId = JSON.parse(sessionStorage.loggedUser).id
            let appointmentInfo = { docId: docId, userId: userId, date: n, distance: dist }

            //ADDS TO TEMPORARY APPOINTMENT
            sessionStorage.currAppointment = JSON.stringify(appointmentInfo)

            //REMOVE DOCTOR FROM MAP
            let doctors = JSON.parse(localStorage.doctors)
            doctors[docId].status = 1
            localStorage.doctors = JSON.stringify(doctors)


            //REDIRECTS TO APPOINTMENT
            location.href = "/content/appointment.html"
        } else {
            alert("plz login")
        }
    }

    endAppointment(fbStatus, feedback = "") {
        //GAMIFICATION HANDLER
        this.gamificationController.addBadge("firstAppointment")
        if (parseInt(JSON.parse(sessionStorage.currAppointment).distance) <= 20) {
            this.gamificationController.addBadge("localSupport")
        }

        this.gamificationController.addXP(100)

        //SAVE APPOINTMENT
        if (fbStatus == false) {
            let aptInfo = JSON.parse(sessionStorage.currAppointment)

            let users = JSON.parse(localStorage.users)
            let doctors = JSON.parse(localStorage.doctors)

            let user = JSON.parse(sessionStorage.loggedUser)
            let doctor = doctors[aptInfo.docId]

            if (user.appointments) {
                let aptId = Object.keys(user.appointments).length

                user.appointments[aptId] = {
                    id: aptId,
                    doctor: {
                        fname: doctor.fname,
                        lname: doctor.lname,
                        speciality: doctor.speciality,
                        bio: doctor.bio
                    },
                    date: aptInfo.date
                }
            } else {
                user.appointments = {
                    0: {
                        id: 0,
                        doctor: {
                            fname: doctor.fname,
                            lname: doctor.lname,
                            speciality: doctor.speciality,
                            bio: doctor.bio
                        },
                        date: aptInfo.date
                    }
                }
            }

            users[user.id] = user
            sessionStorage.loggedUser = JSON.stringify(user)
            this.usersModel.savePer(users)

            alert("SAVED W/ NO FEEDBACK")
        } else {
            //GAMIFICATION HANDLER
            this.gamificationController.addBadge("firstAppointment")
            this.gamificationController.addBadge("firstFeedback")
            if (parseInt(JSON.parse(sessionStorage.currAppointment).distance) <= 20) {
                this.gamificationController.addBadge("localSupport")
            }

            this.gamificationController.addXP(100)


            //SAVE APPOINTMENT
            let aptInfo = JSON.parse(sessionStorage.currAppointment)

            let users = JSON.parse(localStorage.users)
            let doctors = JSON.parse(localStorage.doctors)

            let user = JSON.parse(sessionStorage.loggedUser)
            let doctor = doctors[aptInfo.docId]

            if (user.appointments) {
                let aptId = Object.keys(user.appointments).length

                user.appointments[aptId] = {
                    id: aptId,
                    doctor: {
                        fname: doctor.fname,
                        lname: doctor.lname,
                        speciality: doctor.speciality,
                        bio: doctor.bio
                    },
                    date: aptInfo.date,
                    feedback: feedback
                }
            } else {
                user.appointments = {
                    0: {
                        id: 0,
                        doctor: {
                            fname: doctor.fname,
                            lname: doctor.lname,
                            speciality: doctor.speciality,
                            bio: doctor.bio
                        },
                        date: aptInfo.date,
                        feedback: feedback
                    }
                }
            }

            users[user.id] = user
            sessionStorage.loggedUser = JSON.stringify(user)
            this.usersModel.savePer(users)

            alert("SAVED W/ FEEDBACK")
        }

        let aptInfo = JSON.parse(sessionStorage.currAppointment)


        //SETS DOCTOR AVAILABLE AGAIN
        let doctors = JSON.parse(localStorage.doctors)
        doctors[aptInfo.docId].status = 0
        localStorage.doctors = JSON.stringify(doctors)

        //REMOVE
        sessionStorage.removeItem("currAppointment")

        //REDIRECTS TO MAIN PAGE
        location.href = "../index.html"
    }
}