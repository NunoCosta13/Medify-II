//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function() {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 800,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".previous").click(function() {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();

    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - 0) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({ 'left': left });
            previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        },
        duration: 800,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".submit").click(function() {
    return false;
})















//REGISTER FORM HANDLER
function register() {
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
    let validate = false;

    //CHECK NON REQUIRED FIELDS
    if (diseases == "") {
        diseases = "NA";
    }
    if (pills == "") {
        pills = "NA";
    }

    //SAVE ITEMS IN ARRAY
    let items = [fname, lname, phone, address, email, diseases, pills, username, password, cpass]

    //CHECK IF ALL FIELDS ARE FILLED
    for (let item of items) {
        if (item == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the required fields!',
            })
            validate = false;
            break;
        }
        validate = true;
    }

    //CHECK IF USERNAME IS AVAILABLE
    if ((localStorage.users) && (validate == true)) {
        let usersObj = JSON.parse(localStorage.users);

        for (currUser of Object.keys(usersObj)) {
            if (currUser == username) {
                validate = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Username already in use!",
                })
            }
        }
    }


    //CHECK IF PASSWORDS MATCH
    if (validate == true) {
        if (password != cpass) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Passwords don't match!",
            })
        } else {
            Swal.fire({
                title: 'Proceed?',
                text: "Please make sure all your data is correct!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'green',
                cancelButtonColor: 'red',
                confirmButtonText: 'Create Account!'
            }).then((result) => {
                if (result.value) {
                    //SAVE USER TO LOCAL STORAGE
                    let user = { "fname": fname, "lname": lname, "phone": phone, "address": address, "diseases": diseases, "pills": pills, "email": email, "username": username, "password": password };
                    if (localStorage.users) {
                        let users = JSON.parse(localStorage.users);
                        users[username] = user;

                        localStorage.users = JSON.stringify(users);
                    } else {
                        let users = {};
                        users[username] = user;

                        localStorage.users = JSON.stringify(users);
                    };

                    //SHOW SUCCESS ALERT
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: "Welcome " + username + " to medify!",
                        timer: '2000'
                    }).then(() => {
                        window.location.href = "../content/login.html";
                    });
                }
            })
        }
    }
}