import { useEffect, useMemo } from 'react';
import LayerGroup from 'ol/layer/Group';
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import { layerTileType, mapInstanceType } from '../types';
import { topoMap, watercolor, osm } from './DefaultLayers';

const layerSwitcher = new LayerSwitcher({
  reverse: true,
  groupSelectStyle: 'group',
});

interface LayerSwitcherControlProps {
  map?: mapInstanceType;
  layers?: layerTileType[];
}

const defaultLayers = [topoMap(), osm, watercolor];

const LayerSwitcherControl = ({ map, layers }: LayerSwitcherControlProps) => {
  const baseMaps = useMemo(
    () =>
      new LayerGroup({
        title: 'Base maps',
        layers: layers || defaultLayers,
      }),
    [layers]
  );

  useEffect(() => {
    if (!map) return;

    map.addLayer(baseMaps);
    map.addControl(layerSwitcher);
  }, [map]);

  return null;
};

export default LayerSwitcherControl;
