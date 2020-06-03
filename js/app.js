import adminView from './views/adminView.js'
import usersView from './views/usersView.js'
import mapView from './views/mapView.js'
import appointmentsView from './views/appointmentsView.js'



class App {
    constructor() {
        this.adminView = new adminView()
        this.usersView = new usersView()
        this.mapView = new mapView()
        this.appointmentsView = new appointmentsView()
    }
}


new App()