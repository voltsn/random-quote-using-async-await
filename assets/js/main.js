const mainSection = document.querySelector(".main-section");
const newQuoteBtn = document.querySelector("#new-quote-btn");
const container = document.querySelector("#container");

window.addEventListener("DOMContentLoaded", () => {
    getQuote().catch(() => {
        container.innerHTML = errorMessage();
    });
});

newQuoteBtn.addEventListener("click", () => {
    document.querySelector(".quote-block-container").classList.remove("slide-in");
    document.querySelector(".quote-block-container").classList.add("slide-out");
    setTimeout(()=>{
        getQuote().catch(() => {
            container.innerHTML = errorMessage();
        });
    },500);
})

async function getQuote(){
    // Display loading animation
    newQuoteBtn.innerHTML = '<span class="spinner"></span>';
    const quoteResponse = await fetch("https://thatsthespir.it/api");
    const quoteData = await quoteResponse.json();

    const agifyResponse = await fetch(`https://api.agify.io?name=${quoteData.author.split(" ")[0]}`)
    const agifyData = await agifyResponse.json();

    displayQuote(formatQuote(quoteData, agifyData.age))
    setTimeout(()=>{
        document.querySelector(".quote-block-container").classList.add("slide-in");
        
        // display regular button content
        newQuoteBtn.innerHTML = 'Generate Quote';
    },500);
}

const displayQuote = (quote) => {
    container.innerHTML = quote;
}  

const formatQuote = (data, age) => {
    const figure = document.createElement("figure");
    figure.classList.add("quote-block-container");
    
    const blockquote = document.createElement("blockquote");
    blockquote.classList.add("quote-block");
    blockquote.setAttribute("cite", data.permalink);

    const quote = document.createElement("p");
    quote.classList.add("quote-block__quote");
    quote.appendChild(document.createTextNode(data.quote));

    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("quote-block-container__quote-source");
     
    const author = document.createElement("p");
    autor.appendChild(document.createTextNode(`— ${data.author}, ${age}`));
    
    
    let photoContainer;
    let authorPhoto;
    if (data.photo !== ""){
      photoContainer = document.createElement("div");
      photoContainer.classList.add("author-photo");
      
      authorPhoto = document.createElement("img");
      authorPhoto.src = data.photo;
      authorPhoto.alt = data.author; 
      photoContainer.appendChild(authorPhoto);
    }
    
    blockquote.appendChild(quote);
    figcaption.appendchild(author);
    if (photoContainer !== undefined){
      figcaption.appendChild(photoContainer);
    }
    figure.appendChild(blockquote);
    figure.appendChild(figcaption);
    
    return figure;
}

const errorMessage = () => {
    return `
            <div class="error-message">
                Something Went wrong please try again 🙁
            </div>
        `
}
