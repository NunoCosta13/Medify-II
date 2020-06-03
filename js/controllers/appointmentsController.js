import appointmentsModel from '../models/appointmentsModel.js'

export default class appointmentsController {
    constructor() {
        this.appointmentsModel = new appointmentsModel();
    }
}