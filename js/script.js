// #7 global var currentCHannel and currentLocation
var currentChannel;
var currentLocation = {
  longitude: 14.588763,
  latitude: 121.094825,
  what3Words: 'waffle.files.pancakes'
}

/* #6 start the #external #action and say hello */
console.log("App is alive");

// #7 fix for the uncaught error\
currentChannel = SevenContinents;

/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */
function switchChannel(channelName) {
    //Log the channel switch
    console.log("Tuning in to channel", channelName);

    // #7 copy channelName to currentCHannel
    currentChannel = channelName
    console.log("Current Channel is", currentChannel);

    //Write the new channel to the right app bar
    /* #7 update to get object.*/
    document.getElementById('channel-name').innerHTML = channelName.name;

    //#6 change the #channel #location
    /* #7 update to get object.*/
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/' + channelName.createdBy + '" target="_blank"><strong>' + channelName.createdBy + '</strong></a>';

    /* #6 #liking channels on #click
    $('#channel-star').attr('src', 'http://ip.lfe.mw.tum.de/sections/star-o.png');*/

    /* #7 star filled or unfilled checker.*/
    document.getElementById('channel-star').className = (channelName.starred) ? 'fas fa-star' : 'far fa-star';

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelName.name + ')').addClass('selected');
}

/* #6 #liking a channel on #click */
function star() {
    /* #7 change star class */
    var className = (!currentChannel.starred) ? 'fas fa-star' : 'far fa-star';

    // #7 set new star
    document.getElementById('channel-star').className = className;

    // #7 used to remove old class on the channel list
    var oldClassName = (currentChannel.starred) ? 'fas fa-star' : 'far fa-star';
    $('li.selected span').children('i:first').removeClass(oldClassName);

    // #7 add the new class to the star
    $('li.selected span').children('i:first').addClass(className);

    // #7 set current star status to the currentChannel
    currentChannel.starred = !currentChannel.starred;

}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}

// #8 message contructor function
function Message(text) {
  this.createdBy = currentLocation.what3Words;
  this.longtitue = currentLocation.longitude;
  this.latitude = currentLocation.latitude;
  this.createdOn = new Date(Date.now());
  this.expiresOn = new Date(Date.now() + 15*60000);
  this.text = text;
  this.own = true;
}

// #8 send message function
function sendMessage () {
  var message = new Message(document.getElementById('txtmessage').value);
  console.log(message);

  // #8 call createMessageElement function and display it on the messages div
  $(createMessageElement(message)).appendTo('#messages');

  // #8 scroll to the bottom of the messages div
  $('#messages').scrollTop(Number.MAX_SAFE_INTEGER);

  // #8 clear the #txtmessage
  document.getElementById('txtmessage').value = '';
}

// #8 createMessageElement function to create the html messages
function createMessageElement (messageObject) {

  // #8 options to set date to locale
  var options = { hour12: false, weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  // #8 To calculate expires in
  var diffMs = messageObject.expiresOn.getTime() - messageObject.createdOn.getTime();
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

  // #8 find a way to add own class dynamically
  var own = (messageObject.own) ? ' own' : '';

  var htmlString = '<div class="message' + own + '"><h3><a href="https://what3words.com/' + messageObject.createdBy +
  '" target="_blank"><strong>' + messageObject.createdBy + '</strong></a> ' + messageObject.createdOn.toLocaleString('en-US', options) +
  ' <em>' + diffMins + ' min. left</em></h3><p>' + messageObject.text + '</p><button>+5 min.</button>';
  return htmlString;
}

// #8 create listChannels
function listChannels() {
  $(createChannelElement(Yummy)).appendTo('ul');
  $(createChannelElement(SevenContinents)).appendTo('ul');
  $(createChannelElement(KillerApp)).appendTo('ul');
  $(createChannelElement(FirstPersonOnMars)).appendTo('ul');
  $(createChannelElement(Octoberfest)).appendTo('ul');

  // #8 call switchChannel to automatically select SevenContinents on onload
  switchChannel(SevenContinents);
}

// #8 create createChannelElement
function createChannelElement (channelObject) {
  var isStarred = (channelObject.starred) ? 'fas fa-star' : 'far fa-star';
  var htmlString = '<li onclick="switchChannel(' + channelObject.name + ')"> #' +
  channelObject.name + '<span class="channel-meta"><i class="' + isStarred +
  '"></i> <span>' + getRandomNumber() + ' min</span> <span>' + getRandomNumber() +
  ' new</span> <i class="fas fa-chevron-right"></i></span></li>';
  console.log(htmlString);
  return htmlString;
}

window.onload = listChannels;

// #8 created this function to generate a random number (1-1000) for the boxes on channel list
function getRandomNumber() {
  return Math.floor(Math.random() * 1000) + 1;
}
