import { XYZ } from 'ol/source';
import LayerTile from 'ol/layer/Tile';
import SourceOSM from 'ol/source/OSM';
import SourceStamen from 'ol/source/Stamen';

export const topoMap = (visible = false) => {
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

export const osm = new LayerTile({
  title: 'OSM',
  type: 'base',
  visible: true,
  source: new SourceOSM(),
});

export const watercolor = new LayerTile({
  title: 'Water color',
  type: 'base',
  visible: false,
  source: new SourceStamen({
    layer: 'watercolor',
  }),
});
