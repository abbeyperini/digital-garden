async function getData() {
  await fetch('https://images.abbeyperini.com/data/blog-data.json').then(async (response) => {
    const data = await response.json();
    localStorage.setItem("data", JSON.stringify(data));
  });
}
getData();