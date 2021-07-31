<template>
  <div>
    <div style="display: flex">
      <img
        v-for="image in home.images"
        :src="image"
        :key="image"
        width="200"
        height="150"
      />
    </div>
    <div>{{ home.title }}</div>
    {{ home.pricePerNight }} / night <br />
    <img src="/images/marker.svg" widht="20" height="20" />
    {{ home.location.address }} {{ home.location.city }}
    {{ home.location.state }} {{ home.location.country }}<br />
    <img src="/images/star.svg" widht="20" height="20" />
    {{ home.reviewValue }} <br />
    {{ home.guests }} guests, {{ home.beds }} beds,
    {{ home.bathrooms }} bathrooms <br />
    <div style="width: 800px; height: 500px" ref="map"></div>
  </div>
</template>

<script>
import homes from "~/data/homes.json";
export default {
  head() {
    return {
      title: this.home.title,
      script: [
        {
          src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB5eBV6JJFDtBzd2S6siCHl0IrkwyMWPlI&libraries=places&callback=initMap",
          hid: "map",
          defer: true,
          skip: process.client && window.mapLoaded,
        },
        {
          innerHTML:
            "window.initMap = function () { window.mapLoaded = true; }",
          hid: "map-init",
        },
      ],
    };
  },
  data() {
    return {
      home: null,
    };
  },
  created() {
    this.home = homes.find((home) => home.objectID === this.$route.params.id);
  },
  mounted() {
    const position = new window.google.maps.LatLng(
      this.home._geoloc.lat,
      this.home._geoloc.lng
    );
    const mapOptions = {
      zoom: 18,
      center: position,
      disableDefaultUI: true,
      zoomControl: true,
    };
    const map = new window.google.maps.Map(this.$refs.map, mapOptions);
    const marker = new window.google.maps.Marker({ position });
    marker.setMap(map);
  },
};
</script>
