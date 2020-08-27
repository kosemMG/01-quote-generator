const quoteContainer = document.getElementById('quote-container');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const getQuote = async () => {
  showLoadingSpinner();
  const proxyUrl = 'http://cors-anywhere.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);

    /**
     * @type {{quoteAuthor: string, quoteText: string}}
     */
    const quoteObject = await response.json();

    if (quoteObject.quoteAuthor === '') {
      author.innerText = 'Unknown';
    } else {
      author.innerText = quoteObject.quoteAuthor;
    }

    const maxQuoteLength = 120;
    if (quoteObject.quoteText.length > maxQuoteLength) {
      quote.classList.add('long-quote');
    } else {
      quote.classList.remove('long-quote');
    }
    quote.innerText = quoteObject.quoteText;
    removeLoadingSpinner();
  } catch (error) {
    getQuote()
      .catch((error) => console.log('Whoops, no quote!', error));
  }
};

const tweetQuote = () => {
  const quoteText = quote.innerText;
  const authorName = author.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorName}`;
  window.open(twitterUrl, '_blank');
};

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

getQuote()
  .catch((error) => console.log('Whoops, no quote!', error));
