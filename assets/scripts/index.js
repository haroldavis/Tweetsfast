const listTweets = document.getElementById('List-twets');

eventlisteners();
//lack ensure that the text input area is 58 characters
function eventlisteners(){
  const formTweet = document.querySelector('#Form');
  formTweet.addEventListener('submit', addTweet);

  listTweets.addEventListener('click', deleteTweet);

  document.addEventListener('DOMContentLoaded', localStorageReady);

}

function addTweet(e){
    e.preventDefault();
    const tweet = document.getElementById('tweet').value;
    const formTweet = document.querySelector('#Form');
    
    const buttonDelete = document.createElement('a')
    buttonDelete.classList = 'delete-tweet';
    buttonDelete.innerText = 'X';

    const li = document.createElement('li')
    li.innerText = tweet;
    li.appendChild(buttonDelete);

    listTweets.appendChild(li);  

    addTweetToLocalStorage(tweet);
    formTweet.reset();
}

function deleteTweet(e){
  e.preventDefault();
  if(e.target.className === 'delete-tweet'){
    e.target.parentElement.remove();
    deleteTweetOfLocalStorage(e.target.parentElement.innerText);    
  } 
}

function addTweetToLocalStorage(tweet){
  let tweets;

  tweets = getTweetLocalStorage();
  tweets.push(tweet);  
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetLocalStorage() {
  let tweets;
  if (localStorage.getItem('tweets') === null) {
      tweets = [];
  } else {
      tweets = JSON.parse(localStorage.getItem('tweets'));
  }
  return tweets;
}

function localStorageReady(){
    let tweets;

    tweets = getTweetLocalStorage();

    tweets.forEach(function(tweet){
      const buttonDelete = document.createElement('a')
      buttonDelete.classList = 'delete-tweet';
      buttonDelete.innerText = 'X';
  
      const li = document.createElement('li')
      li.innerText = tweet;
      li.appendChild(buttonDelete);
  
      listTweets.appendChild(li);  
    });    
}

function deleteTweetOfLocalStorage(tweet){
  let tweets, tweetDeleted;

  tweetDeleted = tweet.substring(0, tweet.length - 1);
  tweets = getTweetLocalStorage();
  tweets.forEach(function(tweet, index){
    if(tweetDeleted === tweet){
      tweets.splice(index, 1);
    }
  });
  localStorage.setItem('tweets', JSON.stringify(tweets));
}