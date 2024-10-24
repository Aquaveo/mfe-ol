import React from 'react';
import ReactDOM from 'react-dom/client';
import Map from './App';

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(<Map/>, document.getElementById('root'));
}

export default Map;