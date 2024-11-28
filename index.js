function addWorkCard(params = {}) {
  const template = document.querySelector("#portfolio-card-template");
  const container = document.querySelector(".portfolio-content");

  template.content.querySelector(".portfolio-card-title").textContent =
    params.title;

  template.content.querySelector(".portfolio-card-text").textContent =
    params.description;

  template.content.querySelector(".portfolio-img").src = params.image;
  template.content.querySelector(".portfolio-card-link").href = params.url;

  const clone = document.importNode(template.content, true);
  container.appendChild(clone);
}

function getWorks() {
  const url =
    "https://cdn.contentful.com/spaces/55xwwgra6ibw/environments/master/entries?access_token=wj23hQX26G7udtx0PWwbWwUZzSw1OSLul0y-Vpan4rw";
  // const urlFetch = await fetch(url);
  // const dataJson = await urlFetch.json();
  // const imagenCMS = await dataJson.includes.Asset;
  const urlFetch = fetch(url);
  const dataJosn = urlFetch.then((res) => res.json());
  dataJosn.then((res) => console.log(res));

  return dataJosn.then((data) => {
    // Mapeamos los items para obtener los datos necesarios
    const fieldsCollections = data.items.map((item) => {
      const assetId = item.fields.imagen.sys.id;
      const asset = data.includes.Asset.find(
        (asset) => asset.sys.id === assetId
      );
      const imageUrl = asset.fields.file.url;
      return {
        title: item.fields.titulo,
        description: item.fields.descripcion,
        image: imageUrl,
        url: item.fields.url,
      };
      // return fetch(
      //   "https://cdn.contentful.com/spaces/55xwwgra6ibw/environments/master/entries?access_token=wj23hQX26G7udtx0PWwbWwUZzSw1OSLul0y-Vpan4rw"
      // )
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((data) => {
      //     const fieldsCollections = data.items.map((item) => {
      //       return {
      //         title: item.fields.titulo,
      //         description: item.fields.descripcion,
      //         image: data.includes.Asset[0].fields.file.url,
      //         url: item.fields.url,
      //       };
    });
    return fieldsCollections;
  });
}

function main() {
  getWorks().then(function (works) {
    for (const w of works) {
      addWorkCard(w);
    }
  });
}
main();
