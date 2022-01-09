import { useEffect, useState } from 'react';
import { get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Vector as VectorSource } from 'ol/source';
import OLVectorLayer from 'ol/layer/Vector';
import { GeoJSON as GeoJSONType } from 'geojson';
import { mapInstanceType, vectorLayerType } from '../../types';

interface VectorLayerProps {
  map?: mapInstanceType;
  geojson: GeoJSONType;
  zIndex?: number;
}

export const VectorLayer = ({ map, geojson, zIndex = 1 }: VectorLayerProps) => {
  const [vectorLayer, setVectorLayer] = useState<null | vectorLayerType>(null);

  useEffect(() => {
    return () => map && vectorLayer && map.removeLayer(vectorLayer);
  }, [map, vectorLayer]);

  useEffect(() => {
    if (!map) return;

    const vectorLyr = new OLVectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(geojson, {
          featureProjection: get('EPSG:3857'),
        }),
      }),
      declutter: true,
    });

    setVectorLayer(vectorLyr);
  }, [map, geojson]);

  // useEffect(() => {
  //   if (!map || !vectorLayer) return;
  //   if (visibleOnMap) {
  //     map.addLayer(vectorLayer);
  //   } else {
  //     map.removeLayer(vectorLayer);
  //   }
  // }, [map, vectorLayer, visibleOnMap]);

  useEffect(() => {
    if (!vectorLayer) return;
    vectorLayer.setZIndex(zIndex);
  }, [vectorLayer, zIndex]);

  useEffect(() => {
    if (!map || !vectorLayer) return;
    map.getView().fit(vectorLayer.getSource().getExtent(), {
      padding: [50, 50, 50, 50],
      duration: 900,
    });
  }, [map, vectorLayer]);

  return null;
};

export default VectorLayer;
