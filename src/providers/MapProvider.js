import React, { useEffect , useState, useRef } from 'react';
import MapContext from '../contexts/MapContext';
import { View, Map as OlMap } from 'ol';

export const MapProvider = ({ children, ...props}) => {

  const mapRef = useRef();
  const [map, setMap] = useState(null);

  useEffect(() => {
    console.log(props)
    let options = {
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [],
      controls: [],
      overlays: []
    };
    
    let mapObject = new OlMap(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    return () => mapObject.setTarget(undefined);

  }, []);


  // Load the events of the map, once script has been loaded dynamically
  useEffect(() => {
    if (!props.scriptLoaded) return;
    if (props.events) {
      if (props.events.click){
        map.on('click', (evt)=>{
          console.log(evt.coordinate, window['moment']()[props.events.click.function](props.events.args))
        });
      }
    }
    
  }, [props.scriptLoaded]);


  return (
    <MapContext.Provider value={{ map }}>
        <div 
          ref={mapRef} 
          className= {props.className}
          style={props.style}
        >
          {children}
        </div>
    </MapContext.Provider>

  );
};