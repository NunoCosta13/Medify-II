export default class doctorsModel {
    constructor() {
        this.doctors = localStorage.doctors ? JSON.parse(localStorage.doctors) : {};;
    }

    create(newDoctor) {
        newDoctor.id = Object.keys(this.doctors).length;

        this.doctors.push(newDoctor);
        this._persist();
    }

    remove(id) {
        delete this.doctors[id];

        this._persist();
    }

    update(newInfo) {
        this.doctors[newInfo.id] = newInfo

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