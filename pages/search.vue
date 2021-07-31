<template>
  <div>
    Results for {{ label }}
    <div style="width: 800px; height: 500px; float: right" ref="map"></div>
    <div v-if="homes.length > 0">
      <home-row v-for="home in homes" :key="home.objectID" :home="home" /><br />
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
    updateMap() {
      this.$maps.showMap(this.$refs.map, this.lat, this.lng);
    },
  },
};
</script>
