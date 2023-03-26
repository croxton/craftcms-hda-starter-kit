<template>
  <l-map
      :zoom="zoom"
      :minZoom="3"
      :maxZoom="18"
      :zoomAnimation="true"
      :center="[latitude,longitude]"
      style="height: 500px; width: 100%"
  >
    <l-tile-layer
        :url="url"
        :attribution="attribution"
    />
    <l-marker :lat-lng="[latitude,longitude]" />
  </l-map>
  <map-caption :caption="caption"></map-caption>
</template>

<script>
import "leaflet";
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon
} from "@vue-leaflet/vue-leaflet";

import MapCaption from './MapCaption.vue'

// The following helps to avoid "net::ERR_INVALID_URL" errors in Chromium-like browsers without the need to unnecessarily import the files.
LIcon.Default = {};

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    MapCaption
  },
  props: {
    latitude: String,
    longitude: String,
    caption: String
  },
  data() {
    return {
      zoom: 13,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    };
  },
};
</script>

<style>
.leaflet-default-icon-path {
  background-image: url(https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png);
}
</style>