import Map from 'ol/Map';
import TileSource from 'ol/source/Tile';

const mapInstance = new Map({});

const tileSource = new TileSource({});

export type mapInstanceType = typeof mapInstance | null;

export type tileSourceType = typeof tileSource;
