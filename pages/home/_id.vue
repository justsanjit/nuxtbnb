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
    <div v-for="review in reviews" :key="review.objectId">
      <img :src="review.reviewer.image" /><br />
      {{ review.reviewer.name }}<br />
      {{ formatDate(review.date) }}<br />
      <short-text :text="review.comment" :target="150" /><br />
    </div>
    <img :src="user.image" />
    {{ user.name }} <br />
    {{ formatDate(user.joined) }} <br />
    {{ user.reviewCount }} <br />
    {{ user.description }} <br />
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

  async asyncData({ params, $dataApi, error }) {
    const homeResponse = await $dataApi.getHome(params.id);
    if (!homeResponse.ok) {
      error({ statusCode: homeResponse.status, message: homeResponse.statusText });
    }

    const reviewResponse = await $dataApi.getReviewsByHomeId(params.id);
    if (!reviewResponse.ok) {
      error({ statusCode: reviewResponse.status, message: reviewResponse.statusText });
    }

    const userResponse = await $dataApi.getUsersByHomeId(params.id);
    if (!userResponse.ok) {
      error({ statusCode: userResponse.status, message: userResponse.statusText });
    }

    return {
      home: homeResponse.json,
      reviews: reviewResponse.json.hits,
      user: userResponse.json.hits[0],
    };
  },

  mounted() {
    this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng);
  },

  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
    },
  },
};
</script>
