import usersController from '../controllers/usersController.js'
import doctorsController from '../controllers/doctorsController.js'
import appointmentsController from '../controllers/appointmentsController.js'

export default class adminView {
    constructor() {
        this.usersController = new usersController();
        this.doctorsController = new doctorsController();
        this.appointmentsController = new appointmentsController();
    }
}