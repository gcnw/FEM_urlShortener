const inputURL = document.getElementById('input-url');
const inputButton = document.getElementById('shorten-it-button');
const errorText = document.getElementById('error-text')
const siteIcons = document.getElementsByClassName('site-icon');


for(let item of siteIcons){
    item.addEventListener('mouseover', (event) => {
        const object=event.target.contentDocument;
        const svg = object.getElementById('icon-color');
        svg.style.fill = '#2BD0D0';

    })
    item.addEventListener('mouseout', (event) => {
        const object=event.target.contentDocument;
        const svg = object.getElementById('icon-color');
        svg.style.fill = 'white';

    })
}


function shortenIt(url){
    if(url === null || url === "Shorten a link here..."){
        inputURL.style.border = "2px solid red";
        inputURL.style.color = "red";
        errorText.style.display = "inline";
        errorText.innerHTML = "Please add a link";
    }
}

inputButton.addEventListener('click',() => {
    shortenIt(inputURL.value);
})

