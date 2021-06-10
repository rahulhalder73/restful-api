var getButton = document.getElementById('user_form');
getButton.addEventListener('submit', getRequest);

function getRequest(event) {
    event.preventDefault();
    var movieID = event.target.movieID.value;
    fetch(`/movies/${movieID}`)
    .then(function(response){
        return response.json();
    })

    .then(function(data){
        //console.log(JSON.stringify(data));
        console.log(data);

        if(!movieID) {
            document.getElementById("result").innerHTML = "";
            for(var i in data) {
                document.getElementById("result").innerHTML += data[i].movieTitle + "   -   " + data[i].movieDirector + '<br />'
            }
        } else {
            document.getElementById("result").innerHTML = "";
            document.getElementById("result").innerHTML += data.movieTitle + '<br />'
        }
    })
}

var postButton = document.getElementById("user_form_post");
postButton.addEventListener('submit', newPost);

function newPost(event, post) {

    event.preventDefault();
    var movieTitle = event.target.movieTitle.value;
    var movieDirector = event.target.movieDirector.value;
    console.log(movieTitle, movieDirector);

    post ={
        movieTitle: movieTitle,
        movieDirector: movieDirector
    }

    const options = {
        method:"POST",
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    return fetch('/movies', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .then(error => console.log('error: ', error))
}

var deleteButton = document.getElementById('user_form_delete');
deleteButton.addEventListener('submit', deletePost);

function deletePost(event) {

    event.preventDefault();
    var movieID = event.target.movieID.value;
    console.log('Movie: ', movieID);

    const options = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            movieID: movieID
        })
    }

    const URL = `movies/${movieID}`;
    fetch(URL, options)
    .then(response => response.json)
    .then(data => console.log('Movie to Delete', data))
}

var putButton = document.getElementById('user_form_put');
putButton.addEventListener('submit', putPost);

function putPost(event, post) {

    event.preventDefault();
    var movieId = event.target.movieId.value;
    var movieTitle = event.target.movieTitle.value;
    var movieDirectors = event.target.movieDirector.value;
    console.log('Movie ID: ', movieId);
    console.log('Movie Title: ', movieTitle);
    console.log('Movie Director: ', movieDirectors);

    post ={
        movieTitle: movieTitle,
        movieDirector: movieDirectors
    }

    const options = {
        method: 'PATCH',
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    const URL = `/movies/${movieId}`;
    return fetch(URL, options)
    .then(response => response.json())
    .then(data => console.log('Movie to Update:', data))
    .then(error => console.log('error: ', error))
}
