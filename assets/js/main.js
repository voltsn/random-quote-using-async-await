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
    const response = await fetch("https://thatsthespir.it/api");
    const data = await response.json();
    displayQuote(formatQuote(data))
    setTimeout(()=>{
        document.querySelector(".quote-block-container").classList.add("slide-in");
    },500);
}

const displayQuote = (quote) => {
    container.innerHTML = quote;
}  

const formatQuote = (data) => {
    return `
        <figure class="quote-block-container">
            <blockquote class="quote-block" cite="${data.permalink}">
                <p class="quote-block__quote">
                    ${data.quote}.
                </p>
            </blockquote>
            <figcaption class="quote-block-container__quote-source">
                <p>— <span>${data.author}</span></p>
                <div class="author-photo">
                    <img src="${data.photo}" alt="${data.author}">
                </div>
            </figcaption>
        </figure>
    `
}

const errorMessage = () => {
    return `
            <div class="error-message">
                Something Went wrong please try again 🙁
            </div>
        `
}