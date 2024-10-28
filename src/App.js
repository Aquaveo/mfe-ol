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
  DefaultLegend,
  DefaultOverlays 
} from "./data/defaults";
import Overlays from "./components/overlays/Overlays";
import Overlay from "./components/overlays/Overlay";

const Map = (
  { 
    mapConfig = DefaultMapConfig, 
    viewConfig = DefaultViewConfig, 
    layers = DefaultLayerConfig, 
    legend = DefaultLegend,
    overlays= DefaultOverlays,
  }) => {


  return (
    <MapProvider {...mapConfig} >
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
        <Overlays>
          {overlays && 
          overlays.map((config, index) => (
            <Overlay key={index} {...config.props}></Overlay>
          ))
          }

        </Overlays>
    </MapProvider>
  );
}

export default memo(Map);