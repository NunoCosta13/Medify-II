import usersModel from '../models/usersModel.js'
import doctorsModel from '../models/doctorsModel.js'

export default class appointmentsController {
    constructor() {
        this.usersModel = new usersModel();
        this.doctorsModel = new doctorsModel();
    }

    startAppointment(docId, dist) {
        if (sessionStorage.loggedUser) {
            var d = new Date();
            var n = d.toLocaleDateString();

            let userId = JSON.parse(sessionStorage.loggedUser).id
            let appointmentInfo = { docId: docId, userId: userId, date: n, distance: dist }

            sessionStorage.currAppointment = JSON.stringify(appointmentInfo)
            location.href = "/content/appointment.html"
        } else {
            alert("plz login")
        }
    }

    endAppointment(fbStatus, feedback = "") {
        if (fbStatus == false) {
            let aptInfo = JSON.parse(sessionStorage.currAppointment)

            let users = JSON.parse(localStorage.users)
            let doctors = JSON.parse(localStorage.doctors)

            let user = JSON.parse(sessionStorage.loggedUser)
            let doctor = doctors[aptInfo.docId]

            if (user.appointments) {
                let aptId = Object.keys(user.appointments).length

                user.appointments[aptId] = { id: aptId, docID: aptInfo.docId, date: aptInfo.date }
            } else {
                user.appointments = {
                    0: {
                        id: 0,
                        docID: aptInfo.docId,
                        date: aptInfo.date
                    }
                }
            }

            if (doctor.appointments) {
                let aptId = Object.keys(doctor.appointments).length

                doctor.appointments[aptId] = { id: aptId, userID: aptInfo.userId, date: aptInfo.date }
            } else {
                doctor.appointments = {
                    0: {
                        id: 0,
                        userID: aptInfo.userId,
                        date: aptInfo.date
                    }
                }
            }


            users[user.id] = user
            doctors[doctor.id] = doctor
            sessionStorage.loggedUser = JSON.stringify(user)
            this.usersModel.savePer(users)
            this.doctorsModel.savePer(doctors)

            alert("SAVED W/ NO FEEDBACK")
        } else {
            let aptInfo = JSON.parse(sessionStorage.currAppointment)

            let users = JSON.parse(localStorage.users)
            let doctors = JSON.parse(localStorage.doctors)

            let user = JSON.parse(sessionStorage.loggedUser)
            let doctor = doctors[aptInfo.docId]

            if (user.appointments) {
                let aptId = Object.keys(user.appointments).length

                user.appointments[aptId] = { id: aptId, docID: aptInfo.docId, date: aptInfo.date, feedback: feedback }
            } else {
                user.appointments = {
                    0: {
                        id: 0,
                        docID: aptInfo.docId,
                        date: aptInfo.date,
                        feedback: feedback
                    }
                }
            }

            if (doctor.appointments) {
                let aptId = Object.keys(doctor.appointments).length

                doctor.appointments[aptId] = { id: aptId, userID: aptInfo.userId, date: aptInfo.date, feedback: feedback }
            } else {
                doctor.appointments = {
                    0: {
                        id: 0,
                        userID: aptInfo.userId,
                        date: aptInfo.date,
                        feedback: feedback
                    }
                }
            }


            users[user.id] = user
            doctors[doctor.id] = doctor
            sessionStorage.loggedUser = JSON.stringify(user)
            this.usersModel.savePer(users)
            this.doctorsModel.savePer(doctors)

            alert("SAVED W/ FEEDBACK")
        }

        location.href = "../index.html"
    }
}