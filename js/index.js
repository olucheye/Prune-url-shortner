//call function here & button click
//pruneLink(); - Cannot call the function because the submit button does





//endpoint & url
const apiEndpoint = 'https://rel.ink/api/links/';
const domain = "https://rel.ink/";

//global variables
const longURL = document.querySelector('#url');
const uri = "https://www.quickteller.com";


/*
//prevent default from button
const getURL = document.querySelector(".submitURL").addEventListener("click", function(event){

    pruneLink();
    event.preventDefault();
    //set provided url to a variable.

  });

*/

//define async/await function
async function pruneLink(uri){

    let res = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify({url: uri}),
        headers: {
            "Content-type": "application/json"
        }
    });

    let data = await res.json();
    console.log(data);
}

pruneLink(uri);