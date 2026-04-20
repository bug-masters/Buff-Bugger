function renderBugMarkers(map, bugs) {
  bugs.forEach(bug => {
    const marker = new google.maps.Marker({
      position: {
        lat: parseFloat(bug.latitude),
        lng: parseFloat(bug.longitude)
      },
      map,
      title: bug.common_name
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div>
          <h5>${bug.common_name}</h5>
          <p><strong>Genus:</strong> ${bug.genus}</p>
          <p><strong>Color:</strong> ${bug.color}</p>
        </div>
      `
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
}