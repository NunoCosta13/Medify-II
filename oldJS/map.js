let userLocation;
let doctors = JSON.parse(localStorage.doctors);

//FUNCTION TO LOAD PAGE
function initMap() {
    //CREATES THE MAP
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: parseFloat(userLocation.coords.latitude), lng: parseFloat(userLocation.coords.longitude) },
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false

    })

    //SETS THE USER IN THE MAP --------------------
    var icon = {
        url: "../content/img/user.svg", // url
        scaledSize: new google.maps.Size(30, 30), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(16, 32) // anchor
    };

    marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: { lat: parseFloat(userLocation.coords.latitude), lng: parseFloat(userLocation.coords.longitude) },
        title: "Your Location",
        icon: icon
    });

    marker.addListener('click', function() {
        map.setZoom(16);
        map.setCenter(marker.getPosition());
    });
    //----------------------------------------------

    //SHOWS DOCTORS IN THE MAP
    for (let doctor of Object.keys(doctors)) {
        let currDoctor = doctors[doctor];

        let infowindow = new google.maps.InfoWindow();

        var icon = {
            url: "../content/img/doctor.png",
            scaledSize: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(16, 32)
        };

        getTravelTime(currDoctor.lat, currDoctor.long);


        //FUNCTION TO CALCULATE TRAVEL TIME
        function getTravelTime(doctorLat, doctorLong) {
            let doctorOri = [doctorLat] + "," + [doctorLong];
            let userDest = [userLocation.coords.latitude] + "," + [userLocation.coords.longitude];

            const service = new google.maps.DistanceMatrixService();
            const matrixOptions = {
                origins: [doctorOri],
                destinations: [userDest],
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.METRIC
            };

            service.getDistanceMatrix(matrixOptions, callback);

            function callback(response, status) {
                if (status == 'OK') {
                    let dist = response.rows[0].elements[0].distance.text;
                    let dur = response.rows[0].elements[0].duration.text
                    let final = [dist] + " - " + [dur];

                    marker = new google.maps.Marker({
                        map: map,
                        animation: google.maps.Animation.DROP,
                        position: { lat: parseFloat(currDoctor.lat), lng: parseFloat(currDoctor.long) },
                        title: 'Dr. ' + currDoctor.fname + " " + currDoctor.lname,
                        specialty: currDoctor.specialty,
                        distance: [dist],
                        travelTime: final,
                        doctorName: "doctor" + currDoctor.fname + currDoctor.lname,
                        picture: currDoctor.picture,
                        icon: icon
                    });

                    let content = "<div style='text-align: center'><h3>" + marker.title + "</h3><img style='height: 200px;' src='img/doctors/" + marker.picture + "'><h4 style='margin-top: 5px'>" + marker.specialty + "</h4><h6>" + marker.travelTime + "</h6><button onclick='openDoctor(" + '"' + currDoctor.fname + currDoctor.lname + '",' + '"' + marker.distance + '"' + ");'> Call </button></div>";
                    google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
                        return function() {
                            map.setZoom(16);
                            map.setCenter(marker.getPosition());
                            infowindow.setContent(content);
                            infowindow.open(map, marker);
                        };
                    })(marker, content, infowindow));
                } else if (status !== "OK") {
                    alert("Error with distance matrix");
                }
            };
        };
    }
}



//OPENS DOCTOR RESUMEE
function openDoctor(doctorName, distance) {
    let callDoctorDiv = document.getElementById("callDoctor");
    let doctors = JSON.parse(localStorage.doctors);
    let doctor = doctors[doctorName];

    document.getElementById("docImg").src = 'img/doctors/' + doctor.picture;
    document.getElementById("docName").innerHTML = 'Dr. ' + doctor.fname + ' ' + doctor.lname;
    document.getElementById("docSpecialty").innerHTML = doctor.specialty;
    document.getElementById("docBio").innerHTML = doctor.bio;
    document.getElementById("callBtt").onclick = () => {
        callDoctor(document.getElementById('docName').innerHTML, distance);
    };

    callDoctorDiv.style.display = "block";
}

//CALLS DOCTOR TO HOME
function callDoctor(doctorName, distance) {
    doctorName = doctorName.replace("Dr. ", "");
    doctorName = doctorName.replace(" ", "");

    let d = new Date();
    let date = d.toLocaleDateString();
    let time = d.toLocaleTimeString();

    let currentAppointment = {
        doctor: doctorName,
        username: getCookie("username"),
        date: date,
        time: time,
        local: {
            lat: parseFloat(userLocation.coords.latitude),
            long: parseFloat(userLocation.coords.longitude)
        },
        distance: distance
    }

    setCookie("currentAppointment", JSON.stringify(currentAppointment), 9999999);

    Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: "Doctor called!",
        timer: '2000'
    }).then(() => {
        location.href = '/content/appointment.html';
    })
}