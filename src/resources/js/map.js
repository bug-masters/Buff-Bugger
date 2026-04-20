window.initMainMap = function () {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.0190, lng: -105.2747 },
    zoom: 14,
  });

  fetch('/api/bugs')
    .then(res => res.json())
    .then(bugs => {
      renderBugMarkers(map, bugs);
    })
    .catch(console.error);
};