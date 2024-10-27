// Default values for the map, view, layers, and overlays

import { fromLonLat } from "ol/proj";
// import MapEvents from "./mapEvents";


// const mapEvents = new MapEvents();

//Map Config
const DefaultMapConfig = {
  className: "ol-map",
  style: {
    width: "100%", 
    height: "100vh"
  },
  events:{
    click: {
      function: "format",
      args: [
        "LLLLL"
      ]
    }
    // click: (evt)=>{
    //     mapEvents.onClickMapEvent(evt)
    // }
  }
};


// View Config
const DefaultViewConfig = {
    center: fromLonLat([-110.875, 37.345]),
    zoom: 5
};


// Array of layer configurations
const DefaultLayerConfig = [
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
          zIndex: 0
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
          name: "Flooding River Gauges",
          zIndex: 1

        }

    },
    {
        type: "VectorLayer",
        props: {
          source:{
            type: "Vector",
            props:{
              url: 'https://openlayers.org/data/vector/ecoregions.json',
              format: {
                type: "GeoJSON",
                props: {}
              }
            }
          },
          style:{
            type: "Style",
            props:{
              stroke: {
                type: "Stroke",
                props:{
                  color: "#501020",
                  width: 1
                }
              }
          }
        },
        name: "Eco Regions",
        zIndex: 2
      }
    }
];


const DefaultLegend = [
    {
      label: "Major Flood",
      color: "#cc33ff"
    },
    {
      label: "Moderate Flood",
      color: "#ff0000"
    },
    {
      label: "Minor Flood",
      color: "#ff9900"
    },
    {
      label: "Action",
      color: "#ffff00"
    },
    {
      label: "No Flood",
      color: "#00ff00"
    },
    {
      label: "Flood Category Not Defined",
      color: "#72afe9"
    },
    {
      label: "Low Water Threshold",
      color: "#906320"
    },
    {
      label: "Data Not Current",
      color: "#bdc2bb"
    },
    {
      label: "Out of Service",
      color: "#666666"
    }
  ];
  


export { 
  DefaultLayerConfig, 
  DefaultViewConfig, 
  DefaultMapConfig,
  DefaultLegend
};