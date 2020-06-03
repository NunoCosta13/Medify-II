//ONLOAD
let changePW = false;
//If no user is logged, redirect to login page
if (getCookie("username") == "") {
    window.location.href = "../content/login.html";
} else if (getCookie("username") == "admin") {
    window.location.href = "../content/adminPanel.html";
}

//Get user info and show it
else {
    var users = JSON.parse(localStorage.users)
    var userData = users[getCookie("username")];

    var usernameInput = document.getElementById("usernameInput");
    var fnameInput = document.getElementById("fnameInput");
    var lnameInput = document.getElementById("lnameInput");
    var emailInput = document.getElementById("emailInput");
    var phoneInput = document.getElementById("phoneInput");
    var addressInput = document.getElementById("addressInput");
    var diseasesInput = document.getElementById("diseasesInput");
    var pillsInput = document.getElementById("pillsInput");
    var currPassword = document.getElementById("currPassword");
    var newPassword = document.getElementById("newPassword");
    var newPasswordC = document.getElementById("newPasswordC");

    usernameInput.value = userData.username;
    fnameInput.value = userData.fname;
    lnameInput.value = userData.lname;
    emailInput.value = userData.email;
    phoneInput.value = userData.phone;
    addressInput.value = userData.address;
    diseasesInput.value = userData.diseases;
    pillsInput.value = userData.pills;

    if (userData.appointments) {
        showAppointments();
    }

    if (userData.badges) {
        showBadges();
    }

    if (userData.xp) {
        showXP(userData.username);
    }
}






















//FUNCTIONS TO HANDLE CHANGES
//FUNCTION TO UPDATE USER INFO
function updateData() {
    //Saves new data in localstorage and username cookie
    let users = JSON.parse(localStorage.users);
    let userData = users[getCookie("username")];

    //CHECK IF USERNAME IS AVAILABLE
    let validate = false;
    if (getCookie("username") == usernameInput.value) {
        validate = true;
    } else {
        for (currUser of Object.keys(users)) {
            if (currUser == usernameInput.value) {
                validate = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'New username is already in use!',
                })
                break;
            } else {
                validate = true;
            }
        }
    }

    //CHECK IF PASSWORD CAN BE CHANGED
    if ((changePW == true) && (validate == true)) {
        if (currPassword.value == userData.password) {
            if (newPassword.value == newPasswordC.value) {
                if (newPassword.value == "") {
                    validate = false;
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Please fill the passwords fields!",
                    })

                } else {
                    currPassword.value = newPassword.value;
                }
            } else {
                validate = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "New passwords don't match!",
                })
            }
        } else {
            validate = false;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Current password is wrong!',
            })
        }
    } else {
        currPassword.value = userData.password;
    }

    //UPDATES THE INFO
    if (validate == true) {
        let user = { "fname": fnameInput.value, "lname": lnameInput.value, "phone": phoneInput.value, "address": addressInput.value, "diseases": diseasesInput.value, "pills": pillsInput.value, "email": emailInput.value, "username": usernameInput.value, "password": currPassword.value, appointments: userData.appointments, badges: userData.badges, xp: userData.xp };
        delete users[userData.username];
        users[usernameInput.value] = user;

        localStorage.users = JSON.stringify(users);
        setCookie("username", usernameInput.value, 9999);

        //SHOW SUCCESS ALERT
        Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: "Info updated!",
            timer: '2000'
        }).then(() => {
            updateProfileBadge(user.username);
        })
    }
}

//FUNCTION DO DELETE ACCOUNT
function deleteAccount() {
    Swal.fire({
        title: 'Proceed?',
        text: "Do you really want to delete your account?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        confirmButtonText: 'Delete!'
    }).then((result) => {
        if (result.value) {
            //REMOVE USER FROM USERSLIST
            let usersList = JSON.parse(localStorage.usersList);
            let i = usersList.indexOf(getCookie("username"));
            usersList.splice(i, 1);
            localStorage.usersList = JSON.stringify(usersList);

            //REMOVE USER LOCAL STORAGE
            localStorage.removeItem(getCookie("username"));

            //REMOVE COOKIE
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            //CHECKS IF ARE THERE MORE USERS
            if (usersList[0] == undefined) {
                localStorage.removeItem("usersList");
            }

            //ALERT
            Swal.fire({
                icon: 'success',
                title: 'Successful',
                text: "Your account was deleted!",
                timer: '2000'
            }).then(() => {
                //REDIRECT TO LOGIN
                window.location.href = "login.html";
            });
        }
    })
}

















//FUNCTION TO CONSULT APPOINTMENTS
function showAppointments() {
    let users = JSON.parse(localStorage.users);
    let user = users[getCookie("username")];
    let doctors = JSON.parse(localStorage.doctors);

    for (appointment in Object.keys(user.appointments)) {
        let doctor = doctors[user.appointments[appointment].doctor];
        let newAppointment = document.createElement("a");

        newAppointment.classList.add("list-group-item", "list-group-item-action");
        newAppointment.href = "#";
        newAppointment.innerHTML = user.appointments[appointment].date + " - " + doctor.fname + " " + doctor.lname;

        document.getElementById("appointmentsList").appendChild(newAppointment);
    }
}

//FUNCTION TO SHOW BADGES
function showBadges() {
    let users = JSON.parse(localStorage.users);
    let user = users[getCookie("username")];

    for (badge of Object.keys(user.badges)) {
        let currBadgeA = document.createElement("a");
        currBadgeA.href = "#";
        currBadgeA.onclick = () => {
            openBadge(badge);
        }

        let currBadgeImg = document.createElement("img");
        currBadgeImg.classList.add("badgeImg");
        currBadgeImg.src = "../content/img/badges/" + badges[badge].picture;

        currBadgeA.appendChild(currBadgeImg);

        document.getElementById("badgesList").appendChild(currBadgeA);
    }
}























//TAKEN FROM W3SCHOOLS
//FUNCTION TO GET A COOKIE
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//FUNCTION TO CREATE A COOKIE
function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}











//PAGE STYLE HANDLER
function hide() {
    document.getElementById("password").style.display = "block";
    document.getElementById("btn-pass").style.display = "none";

    changePW = true;
}