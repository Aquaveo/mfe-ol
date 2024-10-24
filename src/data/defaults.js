// Default values for the map, view, layers, and overlays

import { fromLonLat } from "ol/proj";
// import MapEvents from "./mapEvents";


// const mapEvents = new MapEvents();

//Map Config
const MapConfig = {
  className: "ol-map",
  style: {
    width: "100%", 
    height: "100vh"
  },
//   events:{
//     click: (evt)=>{
//         mapEvents.onClickMapEvent(evt)
//     }
//   }
};


// View Config
const ViewConfig = {
    center: fromLonLat([-110.875, 37.345]),
    zoom: 5
};


// Array of layer configurations
const LayerConfig = [
    {
      type: "WebGLTile",
      props: {
        source:{
          type: "ImageTile",
          props:{
            url: 'https://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            attributions: 'Tiles © <a href="https://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer">ArcGIS</a>'
          }
        },
        name: "World Dark Gray Base Base Map",
      }
    },
    {
      type: "ImageLayer",
      props: {
        source:{
          type: "ImageArcGISRest",
          props:{
            url: 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/water/riv_gauges/MapServer',
            params: {
              LAYERS: "show:0",
              layerDefs: JSON.stringify({ "0": "status = 'action' or status='minor' or status='moderate' or status='major'" })
            }
          }
        },
        name: "Flooding River Gauges"
      }
    },

    {
      type: "ImageLayer",
      props: {
        source:{
          type: "ImageArcGISRest",
          props:{
            url: 'https://maps.water.noaa.gov/server/rest/services/reference/static_nwm_flowlines/MapServer',
            params: {
              LAYERS: "show:0"
            }
          }
        },
        visible: false,
        name: "Static NWM Flow Lines"
      }
    }
];



export { 
  LayerConfig, 
  ViewConfig, 
  MapConfig 
};