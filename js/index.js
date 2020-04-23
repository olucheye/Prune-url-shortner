//endpoint & url
const apiEndpoint = 'https://rel.ink/api/links/';
const domain = "https://rel.ink/";

//global variables
const longURL = document.querySelector('#longUrl');
//const uri = "https://www.quickteller.com";
const submitURL = document.querySelector(".submitURL");


//validate URL
/*
function validURL(longURL) {
    if(String(longURL) !== longURL) return false
    const regex = /(https?:\/\/)?(www\.)?\w{2,}(\.\w{2,}){1,}/g,
    didMatch = longURL.match(regex)
    return Array.isArray(didMatch)
}

*/




//shortenURL & prevent default
const shortenUrl = (e) =>{
    pruneLink();
    e.preventDefault();
        
}

//define async/await function
async function pruneLink(){
    
    let inputUrl = longURL.value;

    try {
        let res = await fetch(apiEndpoint, {
            method: 'POST',
            body: JSON.stringify({url: inputUrl}),
            headers: {
                "Content-type": "application/json"
            }
        });

        if(res.ok){
            let data = await res.json();
            return addResponse(data);
        }else{
            console.log('error')
        }   
    } catch (error) {
        console.log(error)
    }   
}

// add response back to body

const addResponse = (data) => {
    console.log(data.hashid);
    console.log(data.url);
}


// add Event Listener to Submit button
submitURL.addEventListener("click", shortenUrl);