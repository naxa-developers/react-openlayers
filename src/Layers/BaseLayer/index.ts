import { useEffect } from 'react';
import TileLayer from 'ol/layer/Tile';
import { mapInstanceType, tileSourceType } from '../../types';

const tileLayer = new TileLayer();

interface BaseLayerProps {
  map?: mapInstanceType;
  source: tileSourceType;
}

const BaseLayer = ({ map, source }: BaseLayerProps) => {
  // add tile layer to map
  useEffect(() => {
    if (!map) return;
    map.addLayer(tileLayer);
  }, [map]);

  // change tile layer source
  useEffect(() => {
    if (!map || !source) return;
    tileLayer.setSource(source);
  }, [map, source]);

  // cleanup
  useEffect(() => {
    return () => map && map.removeLayer(tileLayer);
  }, [map]);

  return null;
};

export default BaseLayer;
