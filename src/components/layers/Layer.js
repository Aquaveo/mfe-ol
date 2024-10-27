// import React from "react";


// /**
//  * @desc the dynamic Layer component is used to render various Layer components dynamically, some references:https://dev.to/ayo_tech/how-to-use-components-dynamically-in-react-2gmk
//  * @params props: {
//  *    useDefaultPath: this indicates that the component to be used is in the components folder if set to true else you would have to pass in a different component
//  *    is: if `useDefaultPath` is true, you pass in the name of the component file or the path to the component in the component folder eg: NewComponent or BaseUI/NewComponent
//  *    ...rest: the props to be passed into the new component
//  * }
//  */
// const Layer = ({ is, useDefaultPath = true, ...layerProps }) => {
//   return React.createElement(
//     useDefaultPath ? require(`./${is}.js`).default : is,
//     {
//       ...layerProps,
//     }
//   );
// };

// export default Layer;


// DynamicLayer.js
import { useEffect, useState } from 'react';
import moduleLoader from '../../lib/ModuleLoader';
import { useMapContext } from '../../hooks/useMapContext';

const Layer = ({ config }) => {
  const [layer, setLayer] = useState(null);
  const { map } = useMapContext();

  useEffect(() => {
    let isMounted = true;
    let addedToMap = false;

    const loadLayer = async () => {
      try {
        const layerInstance = await moduleLoader(config);

        if (isMounted) {
          setLayer(layerInstance);
          if (map && layerInstance) {
            map.addLayer(layerInstance);
            addedToMap = true;
          }
        }
      } catch (error) {
        console.error('Error loading layer:', error);
      }
    };

    loadLayer();

    return () => {
      isMounted = false;
      if (addedToMap && map && layer) {
        map.removeLayer(layer);
      }
    };
  }, [config, map]);

  return null; // Layers are managed by OpenLayers; no need to render anything
};

export default Layer;