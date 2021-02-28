const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const movies = document.getElementById("movies");
const form = document.getElementById("input");

const input = document.getElementById("input-s");




async function getMovies(url) {

    const resp = await fetch(url);
    const response = await resp.json();
    const respData = await response.results;

    loadMovies(respData);
}




async function loadMovies(m) {
    movies.innerHTML = "";

    m.forEach(e => {


        const divEl = document.createElement("div");
        divEl.classList.add("movie")



        divEl.innerHTML = `

<img src="${IMGPATH+e.backdrop_path}" alt="${e.title}">
        <div class="text">
        <span>${e.title}</span>
        <span>${e.vote_average}</span>
        </div>
        <div class="overview">${e.overview}</div>

`;

        movies.appendChild(divEl);
    })

}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = input.value;
    if (username) {

        const searcEl = (SEARCHAPI + username)
        console.log(searcEl);
        getMovies(searcEl);

    }
})

getMovies(apiUrl);




const addButton = document.getElementById("buttonc");



const textEmpty = JSON.parse(localStorage.getItem("text"));


if (textEmpty) {
    textEmpty.forEach(e => {
        addNewNote(e);

    });

}





addButton.addEventListener("click", () => {
    addNewNote();
})




function addNewNote(text = "") {

    const comment = document.getElementById("comment");

    const note = document.createElement("div");
    note.classList.add("comment-text");

    note.innerHTML = `  
  
    <div class="notes">
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash"></i></button>

    </div>
    <div class="main hidden"></div>
    <textarea cols="28" rows="3"></textarea>

</div>

    
    
    `;





    const edit = note.querySelector(".edit");
    const clear = note.querySelector(".delete");
    const notes = note.querySelector(".notes")


    const main = notes.querySelector(".main");
    const textArea = notes.querySelector("textarea");
    textArea.value = text;



    edit.addEventListener("click", () => {
        main.classList.toggle("hidden")
        textArea.classList.toggle("hidden")




    });
    clear.addEventListener("click", () => {
        note.remove();
        uptadeLS();


    })



    textArea.addEventListener("input", (e) => {

        const value = e.target.value;


        main.innerHTML = marked(value);

        uptadeLS();

    });


    comment.appendChild(note);

}



function uptadeLS() {
    const textarea = document.querySelectorAll("textarea");
    const textEmpty = [];
    textarea.forEach(e => {


        textEmpty.push(e.value)

    });

    localStorage.setItem("text",
        JSON.stringify(textEmpty));


}