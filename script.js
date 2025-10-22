document.addEventListener("DOMContentLoaded", () => {
  const articleList = document.getElementById("articleList");
  const searchInput = document.getElementById("searchInput");

  if (!articleList) return;

  fetch("articles.json")
    .then(res => {
      if (!res.ok) throw new Error("Gagal memuat articles.json");
      return res.json();
    })
    .then(data => {
      renderArticles(data);

      // Event pencarian
      if (searchInput) {
        searchInput.addEventListener("input", () => {
          const query = searchInput.value.toLowerCase();
          const filtered = data.filter(article =>
            article.title.toLowerCase().includes(query) ||
            article.desc.toLowerCase().includes(query)
          );
          renderArticles(filtered);
        });
      }
    })
    .catch(err => {
      articleList.innerHTML = `<li style="color:red;">Gagal memuat daftar artikel: ${err.message}</li>`;
    });

  // Fungsi render daftar artikel
  function renderArticles(list) {
    if (list.length === 0) {
      articleList.innerHTML = `<li>Tidak ada artikel ditemukan.</li>`;
      return;
    }

    articleList.innerHTML = list
      .map(
        a => `
        <li>
          <a href="${a.url}" target="_blank" rel="noopener">${a.title}</a>
          <div class="desc">${a.desc}</div>
        </li>`
      )
      .join("");
  }
});
