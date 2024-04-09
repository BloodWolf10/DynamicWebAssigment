



let map;
    let service;
    let infowindow;
    let searchInput;

    function initMap() {
      const Jamaica = new google.maps.LatLng(18.047290474416645, -77.49608416875233);

      infowindow = new google.maps.InfoWindow();
      map = new google.maps.Map(document.getElementById("map"), {
        center: Jamaica,
        zoom: 10,
        scrollwheel:true
      });

      searchInput = document.getElementById("searchInput");

      // Adding in a Static Marker For VTDI

      let mapOptions = {

        position : new google.maps.LatLng(18.047290474416645, -77.49608416875233),
        label: "A",
        title: "Vtdi Mandeville",
        // icon:"images/dragon.png",
        map:map,
        optimizeed: true,
        
      }
    
    
      let marker = new google.maps.Marker (mapOptions);


      // Initialize Autocomplete for the search input
      const autocomplete = new google.maps.places.Autocomplete(searchInput, {
        types: ["geocode"], // Specify the type of place data to return
        componentRestrictions: { country: "JM" } // Restrict results to Jamaica
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) return;

        // Construct request based on the entered query
        const request = {
          query: searchInput.value,
          fields: ["name", "geometry"],
        };

        service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }

            map.setCenter(results[0].geometry.location);
          }
        });
      });
    }


    // Dynamically Create a marker for a place that is searched
    function createMarker(place) {
      if (!place.geometry || !place.geometry.location) return;

      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
      });

      google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name || "");
        infowindow.open(map, marker);
      });
    }

    window.initMap = initMap;

