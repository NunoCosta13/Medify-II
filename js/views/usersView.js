import usersController from '../controllers/usersController.js'
import doctorsController from '../controllers/doctorsController.js'
import appointmentsController from '../controllers/appointmentsController.js'

export default class usersView {
    constructor() {
        this.usersController = new usersController();
        this.doctorsController = new doctorsController();
        this.appointmentsController = new appointmentsController();
        this.gamificationController = new appointmentsController();

        if (sessionStorage.loggedUser) {
            if (sessionStorage.loggedUser == "admin") {
                let user = "admin"
            } else {
                let user = JSON.parse(sessionStorage.loggedUser)
            }
        }

        var url = window.location.pathname
        var filename = url.substring(url.lastIndexOf('/') + 1)

        $(document).ready(() => {
            if (sessionStorage.loggedUser) {
                if (sessionStorage.loggedUser == "admin") {
                    document.getElementById("dropdownMenuButton").innerHTML = "admin"
                    document.getElementById("prfreg").innerHTML = "Admin Panel"
                    document.getElementById("prfreg").href = "content/adminPanel.html"
                    document.getElementById("loginout").innerHTML = "Logout"
                    document.getElementById("loginout").setAttribute("onclick", "sessionStorage.clear(); location.href='content/login.html'")
                } else {
                    document.getElementById("dropdownMenuButton").innerHTML = JSON.parse(sessionStorage.loggedUser).username
                    document.getElementById("prfreg").innerHTML = "Profile"
                    document.getElementById("prfreg").href = "content/profile.html"
                    document.getElementById("loginout").innerHTML = "Logout"
                    document.getElementById("loginout").setAttribute("onclick", "sessionStorage.clear(); location.href='content/login.html")
                }
            } else {
                document.getElementById("dropdownMenuButton").innerHTML = "Not Logged"
                document.getElementById("prfreg").innerHTML = "Register"
                document.getElementById("prfreg").href = "content/register.html"
                document.getElementById("loginout").innerHTML = "Login"
                document.getElementById("loginout").href = "content/login.html"
            }

            if (filename == "profile.html") {
                //PERSONAL INFO TAB
                document.getElementById("usernameInput").value = user.username
                document.getElementById("fnameInput").value = user.fname
                document.getElementById("lnameInput").value = user.lname
                document.getElementById("emailInput").value = user.email
                document.getElementById("phoneInput").value = user.phone
                document.getElementById("addressInput").value = user.address
                document.getElementById("diseasesInput").value = user.diseases
                document.getElementById("pillsInput").value = user.pills

                //APPOINTMENTS TAB
                //

                //ACHIEVEMENTS TAB
                //

                //WALLET TAB
                //
            }
        })



        $("#loginBtt").click(() => {
            this.login()
        })

        $("#registerBtt").click(() => {
            this.register()
        })

        $("#updateUser  ").click(() => {
            this.update()
        })
    }

    login() {
        let username = document.getElementById("loginUsername").value
        let password = document.getElementById("loginPassword").value

        if (username == "admin") {
            if (password == "admin") {
                sessionStorage.loggedUser = "admin"
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Hello ' + username + '!',
                    timer: 2000
                }).then(() => {
                    location.href = "../index.html";
                })
            } else  {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'User not found!'
                })
            }
        } else {

            let status = this.usersController.checkUser(username)
            if (!status) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'User not found!',
                    footer: '<a href="register.html">Do you have an account?</a>'
                })
            } else {
                status = this.usersController.checkPassword(username, password)
                if (!status) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Wrong Password!',
                        footer: '<a href="#">Forgot your password?</a>'
                    })
                } else {
                    sessionStorage.loggedUser = JSON.stringify(this.usersController.getUser(username))
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Hello ' + username + '!',
                        timer: 2000
                    }).then(() => {
                        location.href = "../index.html";
                    })
                }
            }
        }
    }

    register() {
        //SAVES FIELDS INFO
        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;
        let phone = document.getElementById("phone").value;
        let address = document.getElementById("address").value;
        let email = document.getElementById("email").value;
        let diseases = document.getElementById("diseases").value;
        let pills = document.getElementById("pills").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("pass").value;
        let cpass = document.getElementById("cpass").value;

        //CHECK NON REQUIRED FIELDS
        if (diseases == "") {
            diseases = "NA";
        }
        if (pills == "") {
            pills = "NA";
        }

        //SAVE ITEMS IN OBJECT
        let items = {
            fname: fname,
            lname: lname,
            phone: phone,
            address: address,
            email: email,
            diseases: diseases,
            pills: pills,
            username: username,
            password: password,
            cpass: cpass
        }

        //VALIDATES ALL THE FIELDS
        let validate = true;
        for (let item of Object.keys(items)) {
            if (items[item] == "") {
                validate = false
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Please fill all the fields!"
                })
                break;
            }
        }

        if (validate) {
            if (password != cpass) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Passwords don't match!"
                })
            } else {
                if (this.usersController.checkUsername(username))  {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Username already exists!'
                    })
                } else {
                    this.usersController.createUser(items);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Welcome ' + username + " to Medify!",
                        timer: 2000
                    }).then(() => {
                        location.href = "login.html";
                    })
                }
            }
        }
    }

    update() {
        let user = JSON.parse(sessionStorage.loggedUser)

        let username = document.getElementById("usernameInput").value
        let fname = document.getElementById("fnameInput").value
        let lname = document.getElementById("lnameInput").value
        let email = document.getElementById("emailInput").value
        let phone = document.getElementById("phoneInput").value
        let address = document.getElementById("addressInput").value
        let diseases = document.getElementById("diseasesInput").value == "" ? "NA" : document.getElementById("diseasesInput").value
        let pills = document.getElementById("pillsInput").value == "" ? "NA" : document.getElementById("pillsInput").value
        let password = document.getElementById("currPassword").value
        let nPassword = document.getElementById("newPassword").value
        let ncPassword = document.getElementById("newPasswordC").value

        if (password != user.password) {
            alert("wrong password")
        } else if (nPassword != ncPassword) {
            alert("passwords dont match")
        } else {
            let pw = nPassword == "" ? password : nPassword
            let status = username != user.username ? this.usersController.checkUsername(username) : false;

            if (!status) {
                let newInfo = {
                    username: username,
                    fname: fname,
                    lname: lname,
                    email: email,
                    phone: phone,
                    address: address,
                    diseases: diseases,
                    pills: pills,
                    password: pw,
                    id: user.id
                }
                this.usersController.updateInfo(newInfo);
                sessionStorage.loggedUser = JSON.stringify(this.usersController.getUser(username))
                alert("success")
            } else {
                alert("username not valid")
            }
        }
    }
}