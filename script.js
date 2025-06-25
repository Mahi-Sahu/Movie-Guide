const searchForm=document.querySelector('form');
const movieContainer=document.querySelector('.movie-container');
const inputBox=document.querySelector('.inputBox');

//to fetchmovie details using omdb api
const getMovieInfo=async (movie)=>{
    try {
    const url=`https://www.omdbapi.com/?i=tt3896198&apikey=c2f69684&t=${movie}`;

    //fetch data from this url using fetch()
    const response=await fetch(url);

    if(!response.ok){
        throw new Error("Unable tofetch movie data");
    }

    const data=await response.json();
    //console.log(data);

    showMovieData(data);
    } catch (error) {
        showErrorMessage("No movie found!!! ");
    }
}

//to show the data in detailed format
const showMovieData=(data)=>{
    //firstly remove the old details from container
    movieContainer.innerHTML="";
    movieContainer.classList.remove('noBackground');

    //use destructuring assignment to extract properties from data object
    const {Title, imdbRating, Genre, ReleaseYear, Runtime, Actors, Plot, Poster}=data;//stores data in array //or what can be done was take the data seperatelylike data.imdbRating, data.title etc

    const movieElement=document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML=`
        <h2>${Title}</h2>
        <p><strong>Rating: &#11088;</strong>${imdbRating}</p>
    `;

    const movieGenreElement=document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element=>{
        const p=document.createElement('p');
        p.innerText=element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML +=`
        <p><strong>Released date: </strong>${ReleaseYear}</p>
        <p><strong>Duration: </strong>${Runtime}</p>
        <p><strong>Cast: </strong>${Actors}</p>
        <p><strong>Plot: </strong>${Plot}</p>
    `;

    //creating div for poster
    const moviePoster=document.createElement('div');
    moviePoster.classList.add('movie-poster');
    moviePoster.innerHTML=`
        <img src="${Poster}"/>
    `;

    movieContainer.appendChild(moviePoster);
    movieContainer.appendChild(movieElement);
}

//function to display error message
const showErrorMessage=(message) =>{
    movieContainer.innerHTML=`<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');
}

searchForm.addEventListener('submit',(e)=>{ //or you can use click on search button
    e.preventDefault();
    //console.log(inputBox.value);
    const movieName=inputBox.value.trim();
    if(movieName!==''){
        showErrorMessage("Fetching movie information...");
        getMovieInfo(movieName);
    }
    else{
        showErrorMessage("Enter the movie name.");
    }
});
