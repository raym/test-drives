import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'
import Hls from 'hls.js'

function setupHlsJs(videoElement) {
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.on(Hls.Events.MEDIA_ATTACHED, function() {
      console.log('video and hls.js are now bound together !');
    });
    hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
      console.log(
        'manifest loaded, found ' + data.levels.length + ' quality level'
      );
      console.log('the full manifest:')
      console.log(data)
    });
    hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
    // bind them together
    hls.attachMedia(videoElement);

    videoElement.play()
    // MEDIA_ATTACHED event is fired by hls object once MediaSource is ready
  } else {
    console.log('HLS not supported')
  }
}

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite + hls.js!</h1>
    <video id="video" controls></video>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupHlsJs(document.querySelector('#video'))
setupCounter(document.querySelector('#counter'))
