const inputURL = document.getElementById('input-url');
const inputButton = document.getElementById('shorten-it-button');
const errorText = document.getElementById('error-text')
const siteIcons = document.getElementsByClassName('site-icon');
const shortlyContainer = document.getElementById('shortened-urls-container');
const hamburger = document.getElementById('hamburger');

let jsonRes = {};

hamburger.addEventListener('click', toggleHamburger);

function toggleHamburger() {

}

for(let item of siteIcons){
  item.addEventListener('mouseover', (event) => {
    const object=event.target.contentDocument;
      const svg = object.getElementById('icon-color');
      svg.style.fill = '#2bd0d0';
  })
  item.addEventListener('mouseout', (event) => {
    const object=event.target.contentDocument;
    const svg = object.getElementById('icon-color');
    svg.style.fill = '';
  })
}

async function shortenIt(url){
  const fetchURL = `https://api.shrtco.de/v2/shorten?url=${url}`;
  if(url === null || url === "Shorten a link here..." || url === ""){
    inputURL.style.border = "2px solid #f46363";
    inputURL.style.bordercolor = "#f46363";
    inputURL.style.color = "#f46363";
    inputURL.value = "Shorten a link here...";
    errorText.style.display = "inline";
    errorText.innerHTML = "Please add a link";
  }
  else{
    errorText.innerHTML = "&nbsp";
    inputURL.style.borderColor = "inherit";
    await fetch(fetchURL)
      .then(response => {
        if(response.ok) return response.json()
      })
      .then(jsonResponse => {
        jsonRes = jsonResponse.result
        createLinkDiv(jsonRes);
      })
      .catch(error => {
        window.alert(error.message);
      })
  }
}

function createLinkDiv(urlObject) {
  if(document.getElementById(`${urlObject.code}`) === null){
    console.log('hello')
    shortlyContainer.innerHTML += 
      ` <div class="link-container">
        <p>
          <a id="full-link" href="${urlObject.original_link}" target="_blank">
            ${urlObject.original_link}
          </a>
        </p>
        <div>
          <p>
            <a id="short-link" href="${urlObject.full_short_link}" target="_blank">
              ${urlObject.short_link}
            </a>
          </p>
          <button
            id="${urlObject.code}" 
            class="copy-link-button">Copy</button>
        </div>
      </div>`; 
      setTimeout(function() {
        copyButton = document.getElementById(`${jsonRes.code}`)
        copyButton.addEventListener('click', () => {
          navigator.clipboard.writeText(`${jsonRes.full_short_link}`);
          copyButton.style.backgroundColor = "#3a3054";
          copyButton.innerHTML = "Copied!"
          })  
      }, 1000);
  }
  else {
    window.alert("Link already exists!")
  }
}

inputButton.addEventListener('click',() => {
  shortenIt(inputURL.value);
})

inputURL.addEventListener('click',() => {
  inputURL.value = "";
  inputURL.style.color = "";
})

