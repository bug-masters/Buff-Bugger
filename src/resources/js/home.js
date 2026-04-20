window.initHomeMap = function () {
  const map = new google.maps.Map(document.getElementById("homeMap"), {
    center: { lat: 40.0190, lng: -105.2747 },
    zoom: 12,
  });

  fetch('/api/bugs')
    .then(res => res.json())
    .then(bugs => {
      renderBugMarkers(map, bugs);
    })
    .catch(console.error);
};


waitForGoogleMaps(initHomeMap);