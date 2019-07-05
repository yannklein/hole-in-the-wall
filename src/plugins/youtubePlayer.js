import { pleaseWaitMessage, successMessage } from './initSweetAlert2';

const initYoutubePlayer = (id, h, w) => {

  // This code loads the IFrame Player API code asynchronously.
  console.log("init youtube");
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    let waitTime = 3000;
    pleaseWaitMessage(waitTime + 1000);
    setInterval( () => {
      console.log("iframe ready")
      player = new YT.Player('youtube-player', {
        height: h,
        width: w,
        videoId: id,
        events: {
          'onReady': onPlayerReady
        }
      });

    }, waitTime);

  }

   // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    window.player = event.target;
    console.log("play video 1");
    event.target.playVideo();
  }

  console.log("hook youtube api ready");
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
};

export { initYoutubePlayer };
