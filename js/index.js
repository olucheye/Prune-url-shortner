//endpoint & url
const apiEndpoint = 'https://rel.ink/api/links/';
const domain = "https://rel.ink/";

//global variables
const longURL = document.querySelector('#longUrl');
const submitURL = document.querySelector('.submitURL');
const copyURL = document.querySelector('.copyURL');
const errorURL = document.querySelector('.urlError');

//DOM response variables
const initialURL = document.querySelector('.indexUrl');
const newURL = document.querySelector('.shortUrl');
const resultDiv = document.querySelector('.prunedData');


//validate URL
/*
function validURL(longURL) {
    if(String(longURL) !== longURL) return false
    const regex = /(https?:\/\/)?(www\.)?\w{2,}(\.\w{2,}){1,}/g,
    didMatch = longURL.match(regex)
    return Array.isArray(didMatch)
}

*/

//Call Error Function
function error(){
    errorURL.textContent = "Please provide a valid URL";
    setTimeout(() => {
        errorURL.textContent = "";
    }, 5000);
   
}

//shortenURL & prevent default
const shortenUrl = (e) =>{
    refreshCopy();
    pruneLink();
    addResponse();
    e.preventDefault();      
}

//define async/await function
async function pruneLink(){
    
    let inputUrl = longURL.value.trim(); //remove whitespaces from URL
    
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
            error();
            // console.log('Please provide a valid URL')
        }   
    } catch (error) {
        console.log(error)
    } 
}

// append response to body
function addResponse(info){

    let{hashid, url} = info;

    initialURL.textContent = url
    newURL.textContent = domain + hashid
    resultDiv.style.display = 'block';

}


//clear copy button back to original state
function refreshCopy(){
    copyURL.classList.remove('copiedURL');
    copyURL.textContent = "Copy"; 
}



//copy text from button
const copyPrunedURL = () =>{

    const clearInput = longURL.value;
    const copiedText = newURL.innerHTML;
    const tempElement = document.createElement("input");

    //creates temporary input field to allow copy
    tempElement.value = copiedText;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    tempElement.remove();

    //change button color & text
    copyURL.classList.add('copiedURL');
    copyURL.textContent = "Copied!";

    //refresh copyButton after 20secs
    setTimeout(refreshCopy, 20000);

    //clear input
    clearInput.reset();

    
}


// add Event Listener to Submit button
submitURL.addEventListener("click", shortenUrl);
// event listener for copy button
copyURL.addEventListener("click", copyPrunedURL);