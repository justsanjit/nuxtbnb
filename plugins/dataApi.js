export default function(context, inject) {
  const appId = "V9336H5E3P";
  const apiKey = "053e5f7037d8e89dcbc10081767a5ad9";

  inject("dataApi", {
    getHome
  });

  async function getHome(homeId) {
    const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
      headers: {
        "X-Algolia-API-Key": apiKey,
        "X-Algolia-Application-Id": appId
      }
    });
    const json = await response.json();
    return json;
  }
}
