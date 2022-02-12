import { useEffect, useMemo } from 'react';
import { get } from 'ol/proj';
import { FitOptions } from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import { Vector as VectorSource } from 'ol/source';
import MVT from 'ol/format/MVT';
import VectorTile from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import OLVectorLayer from 'ol/layer/Vector';
import { GeoJSON as GeoJSONType } from 'geojson';
import { mapInstanceType, vectorTileLayerType } from '../../types';

interface VectorTileLayerProps {
  map?: mapInstanceType;
  url: string;
  zIndex?: number;
  visibleOnMap?: boolean;
  declutter?: boolean;
  setStyle?: () => void;
}

const VectorTileLayer = ({
  map,
  url,
  zIndex = 1,
  visibleOnMap = true,
  declutter = false,
  setStyle = () => {},
}: VectorTileLayerProps) => {
  // vector layer instance
  const vectorLayer = useMemo<vectorTileLayerType>(() => {
    return new VectorTile({
      source: new VectorTileSource({
        format: new MVT(),
        maxZoom: 19,
        url,
        transition: 0,
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
    if (!vectorLayer || !setStyle) return;
    vectorLayer.setStyle(setStyle);
  }, [vectorLayer, setStyle]);

  // // zoom to layer
  // useEffect(() => {
  //   if (!map || !vectorLayer || !zoomToLayer) return;
  //   map.getView().fit(vectorLayer.getSource().getExtent(), {
  //     padding: [50, 50, 50, 50],
  //     duration: 700,
  //     ...zoomOptions,
  //   });
  // }, [map, vectorLayer, zoomToLayer, zoomOptions]);

  // cleanup function
  useEffect(() => {
    return () => map && vectorLayer && map.removeLayer(vectorLayer);
  }, [map, vectorLayer]);

  return null;
};

export default VectorTileLayer;
