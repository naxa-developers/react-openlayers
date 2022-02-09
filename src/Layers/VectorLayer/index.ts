import { useEffect, useMemo } from 'react';
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
  visibleOnMap?: boolean;
  declutter?: boolean;
  zoomToLayer?: boolean;
  setStyle?: () => void;
}

export const VectorLayer = ({
  map,
  geojson,
  zIndex = 1,
  visibleOnMap = true,
  declutter = false,
  setStyle = () => {},
  zoomToLayer = false,
}: VectorLayerProps) => {
  // vector layer instance
  const vectorLayer = useMemo<vectorLayerType>(() => {
    return new OLVectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(geojson, {
          featureProjection: get('EPSG:3857'),
        }),
      }),
      declutter,
    });
  }, []);

  // add vector layer to map
  useEffect(() => {
    if (!map || !vectorLayer) return;
    if (visibleOnMap) {
      map.addLayer(vectorLayer);
    } else {
      map.removeLayer(vectorLayer);
    }
  }, [map, vectorLayer, visibleOnMap]);

  // set zIndex
  useEffect(() => {
    if (!vectorLayer) return;
    vectorLayer.setZIndex(zIndex);
  }, [vectorLayer, zIndex]);

  // set style
  useEffect(() => {
    if (!vectorLayer) return;
    vectorLayer.setStyle(setStyle);
  }, [vectorLayer, setStyle]);

  // zoom to layer
  useEffect(() => {
    if (!map || !vectorLayer || !zoomToLayer) return;
    map.getView().fit(vectorLayer.getSource().getExtent(), {
      padding: [50, 50, 50, 50],
      duration: 900,
    });
  }, [map, vectorLayer, zoomToLayer]);

  // cleanup function
  useEffect(() => {
    return () => map && vectorLayer && map.removeLayer(vectorLayer);
  }, [map, vectorLayer]);

  return null;
};

export default VectorLayer;
