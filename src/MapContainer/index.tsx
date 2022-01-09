import React, { Children, cloneElement, forwardRef, ReactNode } from 'react';
import { mapInstanceType } from '../types';
import 'ol/ol.css';

interface MapContainerProps {
  children: ReactNode | any;
  mapInstance: mapInstanceType;
  [x: string]: any;
}

const MapContainer = forwardRef<HTMLDivElement | null, MapContainerProps>(
  ({ children, mapInstance, ...rest }, ref) => {
    const childrenCount = Children.count(children);
    const props = {
      map: mapInstance,
    };
    return (
      <div ref={ref} id="ol-map" className="ol-map" {...rest}>
        {childrenCount < 1 ? (
          <></>
        ) : childrenCount > 1 ? (
          Children.map(children, child => cloneElement(child, { ...props }))
        ) : (
          cloneElement(children, { ...props })
        )}
      </div>
    );
  }
);

export default MapContainer;
