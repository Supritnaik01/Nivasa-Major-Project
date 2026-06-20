const map = L.map("getLocation").setView([12.9716, 77.5946], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

let marker;

map.on("click", function(e) {
  const { lat, lng } = e.latlng;

  // Remove previous marker
  if (marker) {
    map.removeLayer(marker);
  }

  // Add new marker
  marker = L.marker([lat, lng]).addTo(map);

  // Store values in hidden inputs
  document.getElementById("lat").value = lat;
  document.getElementById("lng").value = lng;
});