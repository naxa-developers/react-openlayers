import React, { useCallback, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { FeatureCollection } from 'geojson';
import { useOLMap, MapContainer } from '../src/';
import LayerSwitcherControl from '../src/LayerSwitcherControl';
import { BaseLayer, VectorLayer } from '../src/Layers';
import { osm } from '../src/sources';
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Style, Circle as CircleStyle, Fill } from 'ol/style';

const styles: { [key: string]: React.CSSProperties } = {
  map: { width: '100vw', height: '100vh' },
};

const osmSource = osm();

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

  const [toggle, setToggle] = useState(true);

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
      <button onClick={() => setToggle(!toggle)}>zoom to</button>

      <MapContainer ref={mapRef} mapInstance={map} style={styles.map}>
        {/* <BaseLayer source={osmSource} /> */}

        <LayerSwitcherControl />

        <VectorLayer
          geojson={point}
          setStyle={setLayerStyle}
          zoomToLayer={toggle}
          zoomOptions={{ maxZoom: 2 }}
        />
      </MapContainer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
