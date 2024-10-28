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


  // // Load the events of the map, once script has been loaded dynamically
  // useEffect(() => {
  //   if (!props.scriptLoaded) return;
  //   if (props.events) {
  //     if (props.events.click){
  //       map.on('click', (evt)=>{
  //         console.log(evt.coordinate, window['moment']()[props.events.click.function](props.events.args))
  //       });
  //     }
  //   }
    
  // }, [props.scriptLoaded]);


  // useEffect(() => {
  //   if (!props.scriptLoaded) return;

  //   const invokeFunction = async (config) => {
  //     try {
  //       const {
  //         module,
  //         functionPath,
  //         createInstance,
  //         constructorArgs,
  //         instanceChain,
  //         args,
  //       } = config;

  //       // Start from the module object
  //       let context = window[module];

  //       if (!context) {
  //         throw new Error(`Module '${module}' is not available on window.`);
  //       }

  //       // Create instance if required
  //       if (createInstance) {
  //         if (typeof context !== 'function') {
  //           throw new Error(`Module '${module}' does not export a constructor.`);
  //         }
  //         context = new context(...(constructorArgs || []));
  //       }

  //       // Handle instance chain
  //       if (instanceChain && Array.isArray(instanceChain)) {
  //         for (const instanceConfig of instanceChain) {
  //           const { method, args: instanceArgs } = instanceConfig;
  //           if (typeof context[method] !== 'function') {
  //             throw new Error(`'${method}' is not a function on the current context.`);
  //           }
  //           context = context[method](...(instanceArgs || []));
  //         }
  //       }

  //       // Traverse the function path
  //       let func = context;
  //       for (const key of functionPath) {
  //         func = func[key];
  //         if (func === undefined) {
  //           throw new Error(`Function path invalid at '${key}'.`);
  //         }
  //       }

  //       if (typeof func !== 'function') {
  //         throw new Error(`'${functionPath.join('.')}' is not a function.`);
  //       }

  //       // Call the function with arguments
  //       const result = await func(...(args || []));
  //       console.log('Function result:', result);
  //     } catch (error) {
  //       console.error('Error invoking function:', error);
  //     }
  //   };

  //   if (props.events) {
  //     if (props.events.click){
  //       map.on('click', (evt)=>{
  //         invokeFunction(props.events.click);
  //         // console.log(evt.coordinate, window['moment']()[props.events.click.function](props.events.args))
  //       });
  //     }
  //   }

    
  // }, [props.scriptLoaded, props.events]);

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
}