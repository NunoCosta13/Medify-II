//ONLOAD
//CHECK IF ADMIN IS LOGGED
if (getCookie("username") != "admin") {
    window.location.href = "/content/login.html";
} else {
    if (localStorage.users) {
        //GET USERS LIST
        let users = JSON.parse(localStorage.users);

        //SHOW USERS IN ADMIN PANEL
        for (let user of Object.keys(users)) {
            let toAdd = document.createElement("option");
            toAdd.text = user;

            document.getElementById("users").add(toAdd);
        }

        showUser(users[Object.keys(users)[0]].username);
    }

    //CHECK IF DOCTORS LIST EXISTS
    if (localStorage.doctors) {
        //GET DOCTORS LIST
        let doctors = JSON.parse(localStorage.doctors);

        for (currDoctor of Object.keys(doctors)) {
            let doctorData = doctors[currDoctor];
            let toAdd = document.createElement("option");

            toAdd.text = "Dr. " + doctorData.fname + " " + doctorData.lname;
            toAdd.value = currDoctor;

            document.getElementById("doctors").add(toAdd);
        }
    }

    showDoctor("Create New");
}












//HANDLE USERS MANAGEMENT
//FUNCTION TO SHOW USER INFO
function showUser(username) {

    //DELETE PREVIOUS USER INFO
    document.querySelectorAll(".infoUser").forEach((info) => {
        info.remove()
    });

    //SHOW SELECTED USER INFO
    let users = JSON.parse(localStorage.users);
    let user = users[username];

    for (let data of Object.keys(user)) {
        if (data == "appointments") {
            continue;
        }
        if (data == "badges") {
            continue;
        }

        let toAdd = document.createElement("input");

        toAdd.type = "text";
        toAdd.value = user[data];
        toAdd.className = "infoUser";
        toAdd.name = data;

        if (data == "username") {
            toAdd.id = "username";
        }

        document.getElementById("userSelectedInfo").appendChild(toAdd);
    }
}

//FUNCTION TO SAVE CHANGES ON USER INFO
function updateUserInfo(username) {
    let x = document.getElementsByClassName("infoUser");
    let users = JSON.parse(localStorage.users);
    let user = users[username];
    let newUsername = document.getElementById("username").value;

    for (let input of x) {
        user[input.name] = input.value;
    }
    user.appointments = users[username].appointments;

    //CHECKS IF USERNAME IS VALID
    let validate = false;
    if (username == newUsername) {
        validate = true;
    } else {
        for (currUser of Object.keys(users)) {
            if (currUser == newUsername) {
                validate = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Username already in use!",
                })
                break;
            } else {
                validate = true;
            }
        }
    }

    //UPDATES INFO
    if (validate == true) {

        delete users[username];

        users[newUsername] = user;

        localStorage.users = JSON.stringify(users);

        //SHOW SUCCESS ALERT
        Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: "User updated!",
            timer: '2000'
        });
    }
}

//FUNCTION TO DELETE USER
function deleteUser(username) {
    //ALERT SURE
    Swal.fire({
        title: 'Proceed?',
        text: "Are you sure you want do delete " + username + "?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        confirmButtonText: 'Delete!'
    }).then((result) => {
        //CHECKS IF RESULT IS TRUE OR FALSE
        if (result.value) {
            //DELETE USER FROM USERSLIST
            let usersList = JSON.parse(localStorage.usersList);
            let i = usersList.indexOf(username);
            usersList.splice(i, 1);
            localStorage.usersList = JSON.stringify(usersList);

            //DELETE USER FROM LOCALSTORAGE
            localStorage.removeItem(username);

            //ALERT AND REFRESH PAGE
            Swal.fire({
                icon: 'success',
                title: 'Successful',
                text: username + " deleted!",
                timer: '2000'
            }).then(() => {
                window.location.reload();
            })
        }
    })
}












//DOCTOR MANAGEMENT FUNCTIONS
//FUNCTION TO HANDLE DOCTOR SELECTION
function showDoctor(doctorName) {
    if (doctorName == "Create New") {
        //CLEAR INPUTS
        let x = document.forms["doctorInfoForm"].getElementsByTagName("input");
        for (input of x) {
            input.value = "";
        }

        document.getElementById("addDoctorBtt").style.display = "block";
        document.getElementById("updateDoctorBtt").style.display = "none";
        document.getElementById("deleteDoctorBtt").style.display = "none";
    } else {
        let doctors = JSON.parse(localStorage.doctors);
        let doctor = doctors[doctorName];
        let fInputs = document.forms["doctorInfoForm"].getElementsByTagName("input");

        let i = 0;
        for (data of Object.keys(doctor)) {
            if (data == "picture") {
                fInputs[i].filename = doctor[data];
            } else {
                fInputs[i].value = doctor[data];
            }

            i++;
        }

        document.getElementById("addDoctorBtt").style.display = "none";
        document.getElementById("updateDoctorBtt").style.display = "block";
        document.getElementById("deleteDoctorBtt").style.display = "block";
    }
}



//FUNCTION TO ADD DOCTOR
function addDoctor() {
    let x = document.forms["doctorInfoForm"].getElementsByTagName("input");
    let validate = false;

    //CHECKS IF ALL INPUTS ARE FILLED
    for (input of x) {
        if (input.value == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please fill all the inputs!",
                timer: '2000'
            })
            validate = false;
            break;
        } else validate = true;
    }

    //CREATES DOCTOR OBJECT
    if (validate) {
        let doctor = {};

        for (input of x) {
            if (input.type == "file") {
                let toChange = input.value;
                let toRemove = 'C:' + '\\' + 'fakepath' + '\\';
                let newString = toChange.replace(toRemove, "");

                doctor.picture = newString;
            } else {
                doctor[input.name] = input.value;
            }
        }

        if (localStorage.doctors) {
            let doctors = JSON.parse(localStorage.doctors);
            let newDoctorName = x.fname.value + x.lname.value;

            doctors[newDoctorName] = doctor;

            localStorage.doctors = JSON.stringify(doctors);
        } else {
            let doctors = {};
            let newDoctorName = x.fname.value + x.lname.value;

            doctors[newDoctorName] = doctor;

            localStorage.doctors = JSON.stringify(doctors);
        }


        //ALERTS SUCCESS
        Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: "Doctor created!",
            timer: '2000'
        }).then(() => {
            window.location.reload();
        })
    }
}




//FUNCTION TO DELETE DOCTOR 
function deleteDoctor(doctorName) {
    let iForms = document.forms["doctorInfoForm"].getElementsByTagName("input");
    let doctors = JSON.parse(localStorage.doctors);

    //ASKS ADMIN IF SURE
    Swal.fire({
        title: 'Proceed?',
        text: "Are you sure you want to delete Dr. " + iForms.fname.value + " " + iForms.lname.value + "?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        confirmButtonText: 'Delete!'
    }).then((result) => {
        if (result.value) {

            delete doctors[doctorName];

            localStorage.doctors = JSON.stringify(doctors);

            Swal.fire({
                icon: 'success',
                title: 'Successful',
                text: "Doctor deleted!",
                timer: '2000'
            }).then(() => {
                window.location.reload();
            })
        }
    })
};



//FUNCTION TO UPDATE DOCTOR INFO
function updateDoctorInfo(oldDoctorName) {
    let iForms = document.forms["doctorInfoForm"].getElementsByTagName("input");
    let doctors = JSON.parse(localStorage.doctors);
    let doctor = doctors[oldDoctorName];

    i = 0;
    for (data of Object.keys(doctor)) {
        if (data == "picture") {
            if (iForms[i].value) {
                let toChange = iForms[i].value;
                let toRemove = 'C:' + '\\' + 'fakepath' + '\\';
                let newString = toChange.replace(toRemove, "");

                doctor[data] = newString;
            } else {
                doctor[data] = iForms[i].filename;
            }
        } else {
            doctor[data] = iForms[i].value;
        }

        i++;
    }

    delete doctors[oldDoctorName];

    let newDoctorName = iForms.fname.value + iForms.lname.value;
    doctors[newDoctorName] = doctor;

    localStorage.doctors = JSON.stringify(doctors);


    //SHOW SUCCESS ALERT
    Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: "Doctor updated!",
        timer: '2000'
    }).then(() => {
        window.location.reload();
    });
}













//FUNCTION TO LOGOUT
function logout() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "../index.html";
}










//TAKEN FROM W3SCHOOLS
//FUNCTION TO GET A COOKIE
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}