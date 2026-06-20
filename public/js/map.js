var map = L.map('map').setView([lat, lon], 13);

L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  {
    attribution: '&copy; OpenStreetMap contributors & CARTO'
  }
).addTo(map);

L.marker([lat, lon]).addTo(map)
    .bindPopup("Here's your new Nivasa,Book now!<br>Exact location will be given after booking")
    .openPopup();