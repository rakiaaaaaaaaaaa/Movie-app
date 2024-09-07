const APILINK =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f4c16b18b131a613d32f23726ede3d50&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w500"; // Adjust 'w500' as needed for image size
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?api_key=f4c16b18b131a613d32f23726ede3d50&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovie(APILINK);

function returnMovie(url) {
    fetch(url)
        .then((res) => res.json())
        .then(function (data) {
            console.log(data.results);
            data.results.forEach((element) => {
                const div_card = document.createElement("div");
                div_card.setAttribute("class", "card");

                const image = document.createElement("img");
                image.setAttribute("class", "thumball");

                const title = document.createElement("div");
                title.setAttribute("class", "title");

                // Mettre à jour le titre et l'image
                title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
                image.src = IMG_PATH + element.poster_path;

                // Ajouter des éléments à la carte
                div_card.appendChild(image);
                div_card.appendChild(title);

                // Ajouter la carte à la section principale
                main.appendChild(div_card);
            });
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = "";

    const searchItem = search.value;

    if (searchItem) {
        returnMovie(SEARCHAPI + searchItem);
        search.value = "";
    }
});
