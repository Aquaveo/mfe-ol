import React, {memo} from "react";
import { MapProvider } from "./providers/MapProvider";
import Layer from "./components/layers/Layer";
import Source from "./lib/Source";
import Layers from "./components/layers/Layers";
import Controls from "./components/controls/Controls";
import { LayersControl } from "./components/controls/LayersControl";
import View from "./components/View";
import { LegendControl } from "./components/controls/Legend/Legend";
import { DefaultLayerConfig, DefaultMapConfig, DefaultViewConfig, DefaultLegend } from "./data/defaults";

const Map = (
  { 
    mapConfig = DefaultMapConfig, 
    viewConfig = DefaultViewConfig, 
    layers = DefaultLayerConfig, 
    legend = DefaultLegend
  }) => {
  
  return (
    <MapProvider {...mapConfig} >
        <View {...viewConfig} />
        <Layers>
        {layers &&
          layers.map((config, index) => {
            const {
              type: LayerType,
              props: {
                source: { type: SourceType, props: sourceProps },
                ...layerProps
              },
            } = config;

            const source = Source({ is: SourceType, ...sourceProps });

            return (
              <Layer key={index} is={LayerType} source={source} {...layerProps} />
            );
          })}
        </Layers>
        <Controls>
            <LayersControl />
            <LegendControl items={legend} />
        </Controls>
    </MapProvider>
  );
}

export default memo(Map);
