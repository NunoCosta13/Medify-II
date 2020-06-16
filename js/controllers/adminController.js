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

    deleteDoctor(id) {
        this.doctorsModel.remove(id)
    }

    deleteUser(id) {
        this.usersModel.remove(id)
    }
}