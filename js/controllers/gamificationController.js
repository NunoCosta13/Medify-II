import gamificationModel from '../models/gamificationModel.js'

export default class gamificationController {
    constructor() {
        this.gamificationModel = new gamificationModel();
    }
}