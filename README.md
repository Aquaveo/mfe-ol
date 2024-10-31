# MFE-OL (MicroFrontEnd Module for Open Layers)

The following is a react componnt that serves as the UI for the map plugin from the [nwms-plugins](https://github.com/FIRO-Tethys/nwmp_plugins) for the tethysDash application.

## Getting Started

The following npm package exports a remote entry point using the [ModuleFederationPlugin](https://webpack.js.org/concepts/module-federation/) feature on webpack. This can be use as an example for an npm package that accompanies a python plugin for the tethysdash app

## Configuration

The following is the structure of this project:

```
├── package.json
├── package-lock.json
├── public
│   ├── index.html
│   └── robots.txt
├── README.md
├── src
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   └── index.js
├── structure.txt
└── webpack.config.js

3 directories, 11 files
```

The following is added to the `webpack.config.js` file:

```js
    ....
    new ModuleFederationPlugin({
      name: 'mfe_ol',
      filename: 'remoteEntry.js',
      exposes: {
        './MapComponent': './src/App', // Adjusted path to exposed module
      },
      shared: {
        'react': {
          singleton: true,
          requiredVersion: '^18.3.1',
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.3.1',
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
    ....
```

Similarly, please note that the `filename` can be any name. It refers to the name of the entrypoint file.

Please note that the `exposes` section will be the component that you will like to expose through the entrypoint. The `expose` section exposes the `MapComponent` that is imported in the `App.js` file.

Finally, you need to edit the `package.json` to expose the entrypoint as well

```json
  "exports": {
    ".": "./dist/bundle.js",
    "./remoteEntry": "./dist/remoteEntry.js"
  },
```

the `"."` is the main bundle, while the `"./remoteEntry"` refers to the entrypoint that will be used by the Tethysdash app.

## TroubleShooting

### Common Errors

Webpack not loading the shared module on the ModuleFederation plugin

```bash
_Uncaught Error: Shared module is not available for eager consumption: webpack/sharing/consume/default/react/react_
```

#### Links

- [Docs](https://webpack.js.org/concepts/module-federation/#troubleshooting)

## Some Useful Examples

- [Article](https://dev.to/devsmitra/the-complete-guide-to-micro-frontend-with-reactjs-for-2022-36b2)
- [Github](https://github.com/devsmitra/micro)
