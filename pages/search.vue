<template>
  <div>
    Results for {{ label }}
    <div style="width: 800px; height: 500px; float: right" ref="map"></div>
    <div v-if="homes.length > 0">
      <nuxt-link v-for="home in homes" :key="home.objectID" :to="`/home/${home.objectID}`">
        <home-row
          :home="home"
          @mouseover.native="highlightMarker(home.objectID, true)"
          @mouseout.native="highlightMarker(home.objectID, false)" /></nuxt-link
      ><br />
    </div>
    <div v-else>No results found.</div>
  </div>
</template>

<script>
export default {
  async asyncData({ query, $dataApi }) {
    const data = await $dataApi.getHomesByLocation(query.lat, query.lng);
    return {
      homes: data.json.hits,
      label: query.label,
      lat: query.lat,
      lng: query.lng,
    };
  },
  head() {
    return {
      title: "Homes around " + this.label,
    };
  },
  async beforeRouteUpdate(to, from, next) {
    const data = await this.$dataApi.getHomesByLocation(to.query.lat, to.query.lng);
    this.homes = data.json.hits;
    this.lat = to.query.lat;
    this.lng = to.query.lng;
    this.label = to.query.label;
    this.updateMap();
    next();
  },
  mounted() {
    this.updateMap();
  },
  methods: {
    highlightMarker(homeId, isHighlighted) {
      document
        .getElementsByClassName(`home-${homeId}`)[0]
        ?.classList?.toggle("marker-highlight", isHighlighted);
    },
    getHomeMarkers() {
      console.log(this.homes);
      return this.homes.map((home) => ({
        ...home._geoloc,
        pricePerNight: home.pricePerNight,
        homeId: home.objectID,
      }));
    },
    updateMap() {
      this.$maps.showMap(this.$refs.map, this.lat, this.lng, this.getHomeMarkers());
    },
  },
};
</script>

<style>
.marker {
  background: white;
  border: 1px solid lightgray;
  font-weight: bold;
  border-radius: 20px;
  padding: 5px;
}
.marker-highlight {
  color: white !important;
  background-color: black;
  border-color: black;
}
</style>
