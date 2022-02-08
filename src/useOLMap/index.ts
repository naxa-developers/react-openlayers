import { useRef, useState, useEffect } from 'react';
import Map from 'ol/Map';
import { View } from 'ol';
import { mapInstanceType } from '../types';

const defaultProps = {
  center: [0, 0],
  zoom: 2,
  maxZoom: 21,
};

interface useOLMapProps {
  center?: [number, number];
  zoom?: number;
  maxZoom?: number;
}

const useOLMap = (props?: useOLMapProps) => {
  const settings = { ...defaultProps, ...props };
  const { center, zoom, maxZoom } = settings;

  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<mapInstanceType>(null);

  useEffect(() => {
    const options = {
      view: new View({
        center,
        zoom,
        maxZoom,
      }),
      target: mapRef.current || undefined,
    };
    const mapInstance = new Map(options);
    setMap(mapInstance);

    return () => mapInstance.setTarget(undefined);
  }, []);

  return { mapRef, map };
};

export default useOLMap;
