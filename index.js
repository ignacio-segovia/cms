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
  return fetch(
    "https://cdn.contentful.com/spaces/55xwwgra6ibw/environments/master/entries?access_token=wj23hQX26G7udtx0PWwbWwUZzSw1OSLul0y-Vpan4rw"
  )
    .console.log(fetch)

    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const fieldsCollections = data.items.map((item) => {
        return {
          title: item.fields.titulo,
          description: item.fields.descripcion,
          image: item.fields.iamgen,
          url: item.fields.url,
        };
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
