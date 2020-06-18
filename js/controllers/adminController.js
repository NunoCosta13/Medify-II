import usersModel from '../models/usersModel.js'
import doctorsModel from '../models/doctorsModel.js'

export default class adminController {
    constructor() {
        this.usersModel = new usersModel();
        this.doctorsModel = new doctorsModel();
    }

    getUsers() {
        return this.usersModel.getAll();
    }

    getDoctors() {
        return this.doctorsModel.getAll();
    }

    createDoctor(dInfo) {
        let valid = false
        for (let data in dInfo) {
            if (dInfo[data] == "") {
                alert("fields")
                valid = false
                break
            }

            valid = true
        }

        if (valid == true) {
            this.doctorsModel.create(dInfo)
        }
    }

    saveDoc(id, fname, lname, sp, bio, lat, long, pic) {
        alert("a")
        let doctors = JSON.parse(localStorage.doctors)
        let doctor = doctors[id]

        if (doctor.appointments) {
            doctor = {
                id: id,
                fname: fname,
                lname: lname,
                bio: bio,
                specialty: sp,
                lat: lat,
                long: long,
                picture: pic,
                appointments: doctor.appointments
            }
        } else {
            doctor = {
                id: id,
                fname: fname,
                lname: lname,
                bio: bio,
                specialty: sp,
                lat: lat,
                long: long,
                picture: pic,
            }
        }

        doctors[id] = doctor
        this.doctorsModel.savePer(doctors)
        alert("saved")
    }

    deleteDoctor(id) {
        this.doctorsModel.remove(id)
    }

    deleteUser(id) {
        this.usersModel.remove(id)
    }
}