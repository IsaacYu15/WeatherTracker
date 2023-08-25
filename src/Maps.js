import React, { useEffect, useRef, useState } from 'react';
import H from '@here/maps-api-for-javascript';
import Card from './Card.js';
import './Maps.css';

const Map = ({apikey}) => {

    const mapRef = useRef(null);
    const map = useRef(null);
    const platform = useRef(null)

    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {

      const initLatLong = async() => {

        if (lat.length === 0 || long.length === 0) {

          navigator.geolocation.getCurrentPosition(function(position) {
            
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
          });
        }
      }


      const initMap = () => {
        if (lat.length !== 0 || long.length !== 0) {

          // Check if the map object has already been created
          if (!map.current) {
            // Create a platform object with the API key
            platform.current = new H.service.Platform({ apikey });
            // Create a new Raster Tile service instance
            const rasterTileService = platform.current.getRasterTileService({
              queryParams: {
                style: "explore.day",
                size: 512,
              },
            });
            // Creates a new instance of the H.service.rasterTile.Provider class
            // The class provides raster tiles for a given tile layer ID and pixel format
            const rasterTileProvider = new H.service.rasterTile.Provider(
              rasterTileService
            );
            // Create a new Tile layer with the Raster Tile provider
            const rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider);
            // Create a new map instance with the Tile layer, center and zoom level
            const newMap = new H.Map(mapRef.current, rasterTileLayer, {
              pixelRatio: window.devicePixelRatio,
              center: {
                lat: lat,
                lng: long,
              },
              zoom: 14,
            });
    
            // Add panning and zooming behavior to the map
            const behavior = new H.mapevents.Behavior(
              new H.mapevents.MapEvents(newMap)
            );

            newMap.addEventListener("tap", (evt) => {
              var coord = newMap.screenToGeo(evt.currentPointer.viewportX,
                evt.currentPointer.viewportY);

                //pass in data
                setLat(coord.lat);
                setLong(coord.lng);

                var marker = new H.map.Marker({lat:coord.lat, lng:coord.lng});
                newMap.addObject(marker);
                
                fetchData(coord.lat, coord.lng);

            });
    
            // Set the map object to the reference
            map.current = newMap;
          }
        }
    
  
    
      }

      const fetchData = async() => {

        if (lat.length !== 0 || long.length !== 0) {
          await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID="+process.env.REACT_APP_API_KEY, {
            method: 'POST',  
            mode: 'cors'
          })
          .then(response => {
            return response.json()
          })
          .then(data => {
              setData(data)
          })
        }
      }
      
    initLatLong();
    fetchData();
    initMap();

    },[apikey, lat, long]);


   
  return (
  <section className = "Content" >

      <div className = "Data">
        {(typeof data.main != 'undefined') ? (
          <Card data={data}/>
        ): (
          <div></div>
        )}
        <h1 className = "LatLong">Latitude: { Math.round(lat * 100000)/ 100000 } Longitude: { Math.round(long * 100000)/ 100000 }</h1>
      </div>
      
      <div className = "Map" style={ { width: "100%", height: "500px" } } ref={mapRef} />    
    </section>
  );
}

   export default Map;
   