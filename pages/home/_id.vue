<template>
  <div>
    <div style="display: flex">
      <img v-for="image in home.images" :src="image" :key="image" width="200" height="150" />
    </div>
    <div>{{ home.title }}</div>
    {{ home.pricePerNight }} / night <br />
    <img src="/images/marker.svg" widht="20" height="20" />
    {{ home.location.address }} {{ home.location.city }} {{ home.location.state }}
    {{ home.location.country }}<br />
    <img src="/images/star.svg" widht="20" height="20" />
    {{ home.reviewValue }} <br />
    {{ home.guests }} guests, {{ home.beds }} beds, {{ home.bathrooms }} bathrooms <br />
    <div style="width: 800px; height: 500px" ref="map"></div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.home.title,
    };
  },
  data() {
    return {
      home: null,
    };
  },
  async asyncData({ params, $dataApi }) {
    const home = await $dataApi.getHome(params.id);
    return { home };
  },
  mounted() {
    this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng);
  },
};
</script>
