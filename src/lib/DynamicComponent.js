// import React, { useState, useEffect } from 'react';
// import Module from './Module';

// const Component = ({ lib, is, ...props }) => {
//   const [instance, setInstance] = useState(null);

//   useEffect(() => {
//     let isMounted = true;

//     const loadModule = async () => {
//       try {
//         const instance = await Module({ lib, is, ...props });
//         if (isMounted) {
//           setInstance(instance);
//         }
//       } catch (error) {
//         console.error('Error loading module:', error);
//         // Handle error state if necessary
//       }
//     };

//     loadModule();

//     return () => {
//       isMounted = false;
//     };
//   }, [lib, is, props]);

//   // Render nothing or a loading indicator while loading
//   if (!instance) {
//     return null; // Or a loading spinner
//   }

//   // Use the instance as needed
//   // Since instance is not a React component, but an OpenLayers object,
//   // we need to integrate it appropriately

//   return null; // Or render children if needed
// };

// export default Component;
