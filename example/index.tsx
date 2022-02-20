import React, { useCallback } from 'react';
import * as ReactDOM from 'react-dom';
import { FeatureCollection } from 'geojson';
import { useOLMap, MapContainer } from '../src/';
import LayerSwitcherControl from '../src/LayerSwitcherControl';
import { VectorLayer, VectorTileLayer } from '../src/Layers';
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import {
  topoMap,
  watercolor,
  osm,
} from '../src/LayerSwitcherControl/DefaultLayers';

const styles: { [key: string]: React.CSSProperties } = {
  map: { width: '99vw', height: '97vh' },
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

const polygon: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [83.8916015625, 28.248747465587257],
            [84.06463623046875, 28.248747465587257],
            [84.06463623046875, 28.37931857241106],
            [83.8916015625, 28.37931857241106],
            [83.8916015625, 28.248747465587257],
          ],
        ],
      },
    },
  ],
};

const App = () => {
  const { map, mapRef } = useOLMap({
    zoom: 2,
    center: [0, 0],
    // maxZoom: 14,
  });

  const setLayerStyle = useCallback(() => {
    return new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 3,
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)',
      }),
      // image: new CircleStyle({
      //   radius: 5,
      //   fill: new Fill({
      //     color: 'teal',
      //   }),
      // }),
    });
  }, []);

  return (
    <div>
      <MapContainer ref={mapRef} mapInstance={map} style={styles.map}>
        <LayerSwitcherControl layers={[topoMap(), osm, watercolor]} />

        <VectorLayer
          geojson={polygon}
          setStyle={setLayerStyle}
          zoomToLayer
          zoomOptions={{ maxZoom: 7 }}
        />
      </MapContainer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
