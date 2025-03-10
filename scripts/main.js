document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("../db/manga.json");
    const mangaList = await response.json();

    const container = document.getElementById("manga-list");
    mangaList.forEach(manga => {
        const mangaElement = document.createElement("div");
        mangaElement.innerHTML = `
            <h3>${manga.title}</h3>
            <img src="${manga.cover_image}" width="150">
            <p>${manga.description}</p>
        `;
        container.appendChild(mangaElement);
    });
});
