export default function(context, inject) {
  const appId = "V9336H5E3P";
  const apiKey = "053e5f7037d8e89dcbc10081767a5ad9";
  const headers = {
    "X-Algolia-API-Key": apiKey,
    "X-Algolia-Application-Id": appId
  };

  inject("dataApi", {
    getHome,
    getReviewsByHomeId,
    getUsersByHomeId,
    getHomesByLocation
  });

  async function getHome(homeId) {
    try {
      return unwrap(
        await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getReviewsByHomeId(homeId) {
    try {
      return unwrap(
        await fetch(`https://${appId}-dsn.algolia.net/1/indexes/reviews/query`, {
          headers,
          method: "POST",
          body: JSON.stringify({
            filters: `homeId:${homeId}`,
            hitsPerPage: 2,
            attributesToHighlight: []
          })
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getHomesByLocation(lat, lng, radiusInMeters = 1500) {
    try {
      return unwrap(
        await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/query`, {
          headers,
          method: "POST",
          body: JSON.stringify({
            hitsPerPage: 10,
            aroundLatLng: `${lat}, ${lng}`,
            aroundRadius: radiusInMeters,
            attributesToHighlight: []
          })
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getUsersByHomeId(homeId) {
    try {
      return unwrap(
        await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, {
          headers,
          method: "POST",
          body: JSON.stringify({
            filters: `homeId:${homeId}`,
            attributesToHighlight: []
          })
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function unwrap(response) {
    const json = await response.json();
    const { ok, status, statusText } = response;
    return {
      json,
      ok,
      status,
      statusText
    };
  }

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500,
      stautsText: error.message,
      json: {}
    };
  }
}
