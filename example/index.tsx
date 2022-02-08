import React, { useCallback } from 'react';
import * as ReactDOM from 'react-dom';
import { FeatureCollection } from 'geojson';
import { useOLMap, MapContainer } from '../src/';
import { BaseLayer, VectorLayer } from '../src/Layers';
import { osm } from '../src/sources';
import 'ol/ol.css';
import { Style, Circle as CircleStyle, Fill } from 'ol/style';

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
  const { map, mapRef } = useOLMap({
    zoom: 2,
    center: [0, 0],
  });

  const setLayerStyle = useCallback(() => {
    return new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({
          color: 'teal',
        }),
      }),
    });
  }, []);

  return (
    <div>
      <MapContainer ref={mapRef} mapInstance={map} style={styles.map}>
        <BaseLayer source={osm()} />
        <VectorLayer geojson={point} setStyle={setLayerStyle} />
      </MapContainer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
