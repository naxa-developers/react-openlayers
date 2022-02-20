import Map from 'ol/Map';
import TileSource from 'ol/source/Tile';
import OLVectorLayer from 'ol/layer/Vector';
import VectorTile from 'ol/layer/VectorTile';
import GeoJSON from 'ol/format/GeoJSON';
import LayerTile from 'ol/layer/Tile';

const mapInstance = new Map({});

const tileSource = new TileSource({});

const vectorSource = new OLVectorLayer({});

const vectorTileSource = new VectorTile({});

const geoJSONInstance = new GeoJSON();

const layerTile = new LayerTile();

export type mapInstanceType = typeof mapInstance | null;

export type tileSourceType = typeof tileSource;

export type vectorLayerType = typeof vectorSource;

export type vectorTileLayerType = typeof vectorTileSource;

export type layerTileType = typeof layerTile;

export type geojsonType = typeof geoJSONInstance;
