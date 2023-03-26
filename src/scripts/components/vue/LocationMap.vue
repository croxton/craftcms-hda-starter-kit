<template>
  <l-map
    :zoom="zoom"
    :min-zoom="3"
    :max-zoom="18"
    :zoom-animation="true"
    :center="[latitude,longitude]"
    style="height: 500px; width: 100%"
  >
    <l-tile-layer
      :url="url"
      :attribution="attribution"
    />
    <l-marker :lat-lng="[latitude,longitude]" />
  </l-map>
  <map-caption :caption="caption" />
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

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    //LIcon,
    MapCaption
  },
  props: {
    latitude: {
      type: String,
      default: '0'
    },
    longitude: {
      type: String,
      default: '0'
    },
    caption:{
      type: [String, null],
      default: null
    },
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
</style>