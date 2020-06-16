import doctorsModel from '../models/doctorsModel.js'
import appointmentsController from '../controllers/appointmentsController.js'

export default class mapView {
    constructor() {
        this.doctorsModel = new doctorsModel()
        this.appointmentsController = new appointmentsController()
        this.markers = []


        var page = location.href.split("/").slice(-1)
        if (page == "" || "#")
            this.loadMap()


        document.getElementById("filterDocs").addEventListener("click", () => {
            this.filter(document.getElementById("fdName").value, document.getElementById("fdDist").value, document.getElementById("fdSp").value)
        })
    }

    _initMap(userLocation) {
        let myStyle = [{
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "transit",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [{
                    "visibility": "off"
                }]
            }
        ];

        //CREATES THE MAP
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: { lat: parseFloat(userLocation.coords.latitude), lng: parseFloat(userLocation.coords.longitude) },
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            styles: myStyle

        })

        //SETS THE USER IN THE MAP --------------------
        var icon = {
            url: "../content/img/user.svg", // url
            scaledSize: new google.maps.Size(30, 30), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(16, 32) // anchor
        };

        let marker = new google.maps.Marker({
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
        let doctors = this.doctorsModel.getAll();
        for (let doctor of Object.keys(doctors)) {
            let currDoctor = doctors[doctor];

            let infowindow = new google.maps.InfoWindow();

            var icon = {
                url: "../content/img/doctor.png",
                scaledSize: new google.maps.Size(50, 50),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(16, 32)
            };

            getTravelTime(currDoctor.lat, currDoctor.long)



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

                service.getDistanceMatrix(matrixOptions, function(response, status) {
                    if (status == 'OK') {
                        let dist = response.rows[0].elements[0].distance.text
                        let dur = response.rows[0].elements[0].duration.text
                        let final = [dist] + " - " + [dur];

                        marker = new google.maps.Marker({
                            map: map,
                            animation: google.maps.Animation.DROP,
                            position: { lat: parseFloat(currDoctor.lat), lng: parseFloat(currDoctor.long) },
                            docid: currDoctor.id,
                            title: 'Dr. ' + currDoctor.fname + " " + currDoctor.lname,
                            specialty: currDoctor.specialty,
                            distance: [dist],
                            travelTime: final,
                            bio: currDoctor.bio,
                            doctorName: "doctor" + currDoctor.fname + currDoctor.lname,
                            picture: currDoctor.picture,
                            icon: icon
                        });

                        let content = "<div style='text-align: center'><h3>" + marker.title + "</h3><img style='height: 200px;' src='content/img/doctors/" + marker.picture + "'><h4 style='margin-top: 5px'>" + marker.specialty + "</h4><h6>" + marker.travelTime + "</h6><button id='vmBtt' onclick='" + '$("#modal").modal("show")' + "' data-docid='" + marker.docid + "'> View More </button></div>"

                        google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
                            return function() {
                                map.setZoom(14)
                                map.setCenter(marker.getPosition())
                                infowindow.setContent(content)
                                infowindow.open(map, marker)

                                //SETS MODAL INFO
                                document.getElementById("modal").innerHTML = `
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">` + marker.title + `</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                      <p><b>Name: </b>` + marker.title + `</p>
                      <p><b>Specialty: </b>` + marker.specialty + `</p>
                      <p><b>Distance: </b>` + marker.travelTime + `</p>
                      <p><b>Distance: </b>` + marker.bio + `</p>
                    </div>
                    <div class="modal-footer" id="footerModal">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="callDoc btn btn-primary" data-docid="` + marker.docid + `">Call</button>
                    </div>
                </div>
            </div>`

                                let callDocBtts = document.getElementsByClassName("callDoc")
                                console.log(callDocBtts)
                                for (let btt of callDocBtts) {
                                    console.log(btt)
                                    let id = btt.dataset.docid

                                    btt.addEventListener("click", () => {
                                        this.appointmentsController = new appointmentsController()
                                        this.appointmentsController.startAppointment(id)
                                    })
                                }
                            };
                        })(marker, content, infowindow));
                    } else if (status !== "OK") {
                        alert("Error with distance matrix");
                    }
                })
            };
        }
    }

    addMarker(marker) {
        this.markers.push(marker)
    }

    loadMap() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let userLocation = position;
                this._initMap(userLocation);
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Your browser does not support geolocation!",
            })
        }
    }

    callDoctor(id) {
        alert(id)
    }





    filter(name, fDist, sp) {
        //SHOWS DOCTORS IN THE MAP
        let doctors = this.doctorsModel.getAll();
        for (let doctor of Object.keys(doctors)) {
            let currDoctor = doctors[doctor];

            if (([currDoctor.name].includes(name)) || (name == "")) {
                if ((currDoctor.specialty == sp) || (sp == "")) {
                    alert("found")
                }
            }
        }
    }
}