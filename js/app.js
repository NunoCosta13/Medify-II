import usersView from './views/usersView.js'
import mapView from './views/mapView.js'
import appointmentsView from './views/appointmentsView.js'
import adminView from './views/adminView.js'

class App {
    constructor() {
        var url = window.location.pathname
        var filename = url.substring(url.lastIndexOf('/') + 1)

        if (filename == "" || "index.html") {
            this.usersView = new usersView()
            this.mapView = new mapView()
        }
        if (filename == "login.html") {
            this.usersView = new usersView()
        }
        if (filename == "register.html") {
            this.usersView = new usersView()
        }
        if (filename == "profile.html") {
            this.usersView = new usersView()
            this.appointmentsView = new appointmentsView()
        }
        if (filename == "adminPanel.html") {
            this.usersView = new usersView()
            this.appointmentsView = new appointmentsView()
            this.adminView = new adminView()
        }
        if (filename == "about.html") {
            this.usersView = new usersView()
        }
        if (filename == "appointment.html") {
            this.usersView = new usersView()
        }
    }
}


new App()