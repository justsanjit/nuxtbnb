<template>
  <div>
    {{ lat }} / {{ lng }} / {{ label }}
    <div v-if="homes.length > 0">
      <home-row v-for="home in homes" :key="home.objectID" :home="home" /><br />
    </div>
    <div v-else>No results found.</div>
  </div>
</template>

<script>
export default {
  watchQuery: ["lat"],
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
};
</script>
