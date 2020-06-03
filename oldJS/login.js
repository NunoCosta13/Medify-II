//LOGS USER IN
function login() {
    let usernameForm = document.getElementById("loginUsername").value;
    let passwordForm = document.getElementById("loginPassword").value;

    var users;
    var userData;

    if (localStorage.users) {
        users = JSON.parse(localStorage.users);
        userData = users[usernameForm];
    } else  {
        userData = undefined;
    }


    //CHECK IF ADMIN OR USER
    if (((usernameForm == "admin") && (passwordForm == "admin")) || (userData != undefined)) {
        if ((passwordForm == "admin") || (passwordForm == userData.password)) {

            //Create cookie
            sessionStorage.loggedUser("username", usernameForm, 9999)

            //Redirect to homepage
            window.location.href = "../index.html";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Wrong password!',
                footer: '<a href=#>Forgot your password?</a>'
            })
        }
    }
    //ERROR (USER NOT FOUND)
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User not found!',
        })
    }
}









//IF USER LOGGED, REDIRECT TO HOMEPAGE
if (sessionStorage.loggedUser) {
    window.location.href = "/index.html"
}