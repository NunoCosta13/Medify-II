export default class doctorsModel {
    constructor() {
        this.doctors = localStorage.doctors ? JSON.parse(localStorage.doctors) : {};;
    }

    create(newDoctor) {
        let doctorsObjK = Object.keys(this.doctors)

        if (doctorsObjK.length == 0) {
            newDoctor.id = 0
        } else {

            let lastid = doctorsObjK[doctorsObjK.length - 1]

            newDoctor.id = parseInt(lastid) + 1
        }




        this.doctors[newDoctor.id] = newDoctor;
        this._persist();
    }

    remove(id) {
        delete this.doctors[id];

        this._persist();
    }

    getAll() {
        return this.doctors;
    }

    get(id) {
        return this.doctors[id] ? this.doctors[id] : {};
    }

    _persist() {
        localStorage.doctors = JSON.stringify(this.doctors);
    }
}