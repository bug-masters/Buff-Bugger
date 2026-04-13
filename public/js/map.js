function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.0190, lng: -105.2747 },
    zoom: 14,
  });

fetch('/api/bugs')
    .then(res => res.json())
    .then(bugs => {
      bugs.forEach(bug => {

        const marker = new google.maps.Marker({
          position: {
            lat: parseFloat(bug.latitude),
            lng: parseFloat(bug.longitude)
          },
          map: map,
          title: bug.common_name
        });

        // Create popup content
        const infoContent = `
          <div>
            <h5>${bug.common_name}</h5>
            <p><strong>Genus:</strong> ${bug.genus}</p>
            <p><strong>Color:</strong> ${bug.color}</p>
          </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
          content: infoContent
        });

        // Add click listener
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

      });
    })
    .catch(err => console.error(err));
}