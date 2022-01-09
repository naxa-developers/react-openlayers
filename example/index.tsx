// import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useOLMap, MapContainer } from '../src/';
import { BaseLayer } from '../src/Layers';
import { osm } from '../src/Source';
import 'ol/ol.css';

const styles: { [key: string]: React.CSSProperties } = {
  map: { width: '100vw', height: '100vh' },
};

const App = () => {
  const { map, mapRef } = useOLMap();

  return (
    <div>
      <MapContainer ref={mapRef} mapInstance={map} style={styles.map}>
        <BaseLayer source={osm()} />
      </MapContainer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
