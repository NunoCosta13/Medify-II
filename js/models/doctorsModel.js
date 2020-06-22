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
            newDoctor.status = 0
        }

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Doctor created!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            location.reload()
        })

        this.doctors[newDoctor.id] = newDoctor;
        this._persist();
    }

    remove(id) {
        delete this.doctors[id];

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Doctor deleted!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            location.reload()
        })

        this._persist();
    }

    getAll() {
        return this.doctors;
    }

    get(id) {
        return this.doctors[id] ? this.doctors[id] : {};
    }

    savePer(doctorsObj) {
        localStorage.doctors = JSON.stringify(doctorsObj);
    }

    _persist() {
        localStorage.doctors = JSON.stringify(this.doctors);
    }
}