
//Google maps DEMO API key: AIzaSyDG-SM3IvZSMGuJ61kZSexN-uXKUXngP_I

/*"40.0190,-105.2747"*/
window.initMap = async function () {
    const { Map } = await google.maps.importLibrary('maps');

    const mapElement = document.querySelector('gmp-map');

    new Map(mapElement, {
        center: { lat: 40.0190, lng: -105.2747 },
        zoom: 14,
    });
};