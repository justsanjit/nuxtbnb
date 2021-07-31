export default function(context, inject) {
  let isLoaded = false;
  let waiting = [];
  inject("maps", {
    showMap
  });
  addScript();
  function addScript() {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyB5eBV6JJFDtBzd2S6siCHl0IrkwyMWPlI&libraries=places&callback=initGoogleMaps";
    script.async = true;
    window.initGoogleMaps = initGoogleMaps;
    document.head.appendChild(script);
  }

  function initGoogleMaps() {
    isLoaded = true;
    waiting.forEach(item => {
      if (typeof item.fn === "function") {
        item.fn(...item.arguments);
      }
    });
    waiting = [];
  }

  function showMap(canvas, lat, lng) {
    if (!isLoaded) {
      waiting.push({
        fn: showMap,
        arguments
      });
      return;
    }
    const position = new window.google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 18,
      center: position,
      disableDefaultUI: true,
      zoomControl: true
    };
    const map = new window.google.maps.Map(canvas, mapOptions);
    const marker = new window.google.maps.Marker({ position });
    marker.setMap(map);
  }
}
