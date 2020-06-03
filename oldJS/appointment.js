//OPEARATIONS TO RUN ON LOAD
if (getCookie("username") == "") {
    location.href = "/content/login.html"
} else if (getCookie("currentAppointment") == "") {
    location.href = "/content/map.html"
}




//FUNCTION TO RUN WHEN APPOINTMENT IS COMPLETE
async function completeAppointment(status) {
    let currAppointment = JSON.parse(getCookie("currentAppointment"));
    let username = currAppointment.username;
    let distance = parseFloat(currAppointment.distance);
    let users = JSON.parse(localStorage.users);
    let user = users[currAppointment.username];
    let doctors = JSON.parse(localStorage.doctors);
    let doctor = doctors[currAppointment.doctor];
    let doctorComment = document.getElementById("doctorComment").value;
    delete currAppointment.username;
    delete currAppointment.distance;

    saveAppointment();




    async function saveAppointment() {
        if (status) {
            if (doctorComment != "") {

                if (doctor.comments) {
                    let commentNr = Object.keys(doctor.comments).length;
                    doctor.comments[commentNr] = {
                        username: [username],
                        comment: [doctorComment]
                    }
                } else {
                    doctor.comments = {
                        0: {
                            username: [username],
                            comment: [doctorComment]
                        }
                    }
                }

                currAppointment.comment = doctorComment;
                if (user.appointments) {
                    appointmentNr = Object.keys(user.appointments).length;
                    user.appointments[appointmentNr] = currAppointment;
                } else {
                    user.appointments = {
                        0: currAppointment
                    }
                }

                doctors[currAppointment.doctor] = doctor;
                users[username] = user;

                localStorage.doctors = JSON.stringify(doctors);
                localStorage.users = JSON.stringify(users);

                if (distance <= 20) {
                    let x = await localSupportBadge(username);
                }

                addXP(username);

                document.cookie = "currentAppointment=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Your appointment was complete!',
                    timer: '2000'
                }).then(() => {
                    firstAppointmentBadge(status, username);
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please write a comment!',
                    timer: '2000'
                })
            }
        } else {
            if (user.appointments) {
                appointmentNr = Object.keys(user.appointments).length;
                user.appointments[appointmentNr] = currAppointment;
            } else {
                user.appointments = {
                    0: currAppointment
                }
            }

            users[username] = user;
            localStorage.users = JSON.stringify(users);

            if (distance <= 20) {
                let x = await localSupportBadge(username);
            }

            addXP(username);

            document.cookie = "currentAppointment=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your appointment was complete!',
                timer: '2000'
            }).then(() => {
                firstAppointmentBadge(status, username);
            })
        }
    }
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


//FUNCTION TO CREATE A COOKIE
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}