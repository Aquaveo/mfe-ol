import { useEffect, useRef } from 'react';
import { useMapContext } from '../../hooks/useMapContext';
import {Image as Layer} from 'ol/layer';

import { useMap } from '../../hooks/useMap';



const ImageLayer = (props) => {

    const {map} = useMapContext();
    // const layerRef = useRef();
    const { addLayer, removeLayer } = useMap(map);
    
    useEffect(() => {
        if (!map) return;
        const layer = new Layer({
            ...props
        });
        layer.set("name", props.name ?? "Image Layer");
        addLayer(layer);
        // layerRef.current = layer;
        return () => {
            if (!map) return;
            removeLayer(layer);
        };
    }, [map]);


};

export default ImageLayer;