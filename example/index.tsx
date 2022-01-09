// import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FeatureCollection } from 'geojson';
import { useOLMap, MapContainer } from '../src/';
import { BaseLayer, VectorLayer } from '../src/Layers';
import { osm } from '../src/Source';
import 'ol/ol.css';

const styles: { [key: string]: React.CSSProperties } = {
  map: { width: '100vw', height: '100vh' },
};

const point: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [85.4296875, 28.613459424004414],
      },
    },
  ],
};

const App = () => {
  const { map, mapRef } = useOLMap();

  return (
    <div>
      <MapContainer ref={mapRef} mapInstance={map} style={styles.map}>
        <BaseLayer source={osm()} />

        <VectorLayer geojson={point} />
      </MapContainer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
