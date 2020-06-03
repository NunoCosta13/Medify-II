//FUNCTION TO ADD XP
function addXP(username) {
    let users = JSON.parse(localStorage.users);
    let user = users[username];

    if (user.xp)  {
        let prevXP = parseFloat(user.xp);
        let newXP = prevXP + 100;

        user.xp = newXP;
        users[username] = user;

        localStorage.users = JSON.stringify(users);
    } else {
        user.xp = 100;
        users[username] = user;

        localStorage.users = JSON.stringify(users);
    }
}

//FUNCTION TO SHOW XP
function showXP(username) {
    let users = JSON.parse(localStorage.users);
    let user = users[username];

    if (user.xp) {
        document.getElementById("xp").innerHTML = [user.xp] + " XP";
    } else {
        document.getElementById("xp").innerHTML = "0 XP"
    }
}