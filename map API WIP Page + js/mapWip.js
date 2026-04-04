
//Google maps DEMO API key: AIzaSyDG-SM3IvZSMGuJ61kZSexN-uXKUXngP_I
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}

