import React, {memo,useState, useEffect} from "react";
import { MapProvider } from "./providers/MapProvider";
import Layer from "./components/layers/Layer";
import Layers from "./components/layers/Layers";
import Controls from "./components/controls/Controls";
import { LayersControl } from "./components/controls/LayersControl";
import View from "./components/View";
import { LegendControl } from "./components/controls/Legend/Legend";
import { 
  DefaultLayerConfig, 
  DefaultMapConfig, 
  DefaultViewConfig, 
  DefaultLegend 
} from "./data/defaults";

const Map = (
  { 
    mapConfig = DefaultMapConfig, 
    viewConfig = DefaultViewConfig, 
    layers = DefaultLayerConfig, 
    legend = DefaultLegend,
    script2Load = "https://cdn.jsdelivr.net/npm/moment@2.29.1/min/moment.min.js"
  }) => {

    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
      // Create a script element
      const script = document.createElement('script');
      script.src = script2Load;
      script.async = true;
  
      // Define the onload callback to use the library after it has loaded
      script.onload = () => {
        if (window.moment) {
          setScriptLoaded(true);
        } else {
          console.error('Moment.js is not available on the window object.');
        }
      };
  
      // Handle any errors that occur while loading the script
      script.onerror = () => {
        console.error('Failed to load the Moment.js script.');
      };
  
      // Append the script to the document body
      document.body.appendChild(script);
  
      // Cleanup function to remove the script when the component unmounts
      return () => {
        document.body.removeChild(script);
        setScriptLoaded(false);
      };
    }, []);

  return (
    <MapProvider {...mapConfig} scriptLoaded={scriptLoaded} >
        <View {...viewConfig} />
        <Layers>
          {layers &&
          layers.map((config, index) => (
            <Layer key={index} config={config} />
          ))}
        </Layers>
        <Controls>
            <LayersControl />
            <LegendControl items={legend} />
        </Controls>
    </MapProvider>
  );
}

export default memo(Map);