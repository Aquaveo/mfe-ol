// const Module = async ({ lib, is, ...ComponentProps }) => {
//     const importPath = `ol/${lib}/${is}.js`;
  
//     try {
//       const module = await import(
//         /* webpackChunkName: "[request]" */
//         /* webpackMode: "lazy" */
//         `ol/${lib}/${is}.js`
//       );
  
//       // Log the module to inspect its contents
//       console.log('Imported module:', module.default);
  
//       // Try to get the constructor from different possible exports
//       const ComponentConstructor = module.default
  
//       if (typeof ComponentConstructor !== 'function') {
//         throw new Error(
//           `Exported member is not a constructor function. Module exports: ${Object.keys(
//             module
//           ).join(', ')}`
//         );
//       }
//       console.log(new ComponentConstructor(ComponentProps))
//       return new ComponentConstructor(ComponentProps);
//     } catch (error) {
//       throw new Error(`Failed to import module '${importPath}': ${error.message}`);
//     }
//   };
  
//   export default Module;
  