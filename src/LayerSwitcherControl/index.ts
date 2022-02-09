import { useEffect } from 'react';
import LayerGroup from 'ol/layer/Group';
import LayerTile from 'ol/layer/Tile';
import SourceOSM from 'ol/source/OSM';
import SourceStamen from 'ol/source/Stamen';
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import { XYZ } from 'ol/source';
import { mapInstanceType } from '../types';

const topoMap = (visible = false) => {
  return new LayerTile({
    title: 'Topo Map',
    type: 'base',
    visible,
    source: new XYZ({
      attributions:
        'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
        'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
      url:
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      // layer: 'topoMap',
      maxZoom: 19,
      crossOrigin: 'Anonymous',
    }),
  });
};

const osm = new LayerTile({
  title: 'OSM',
  type: 'base',
  visible: true,
  source: new SourceOSM(),
});

const watercolor = new LayerTile({
  title: 'Water color',
  type: 'base',
  visible: false,
  source: new SourceStamen({
    layer: 'watercolor',
  }),
});

const baseMaps = new LayerGroup({
  title: 'Base maps',
  layers: [osm, watercolor, topoMap()],
});

const layerSwitcher = new LayerSwitcher({
  reverse: true,
  groupSelectStyle: 'group',
});

interface LayerSwitcherControlProps {
  map?: mapInstanceType;
}

const LayerSwitcherControl = ({ map }: LayerSwitcherControlProps) => {
  useEffect(() => {
    if (!map) return;

    map.addLayer(baseMaps);
    map.addControl(layerSwitcher);
  }, [map]);

  return null;
};

export default LayerSwitcherControl;
