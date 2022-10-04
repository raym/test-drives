import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'
import videojs from 'video.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite + Video.js!</h1>
    <video
      id="my-video"
      class="video-js"
      controls
      preload="auto"
      width="640"
      height="264"
      poster="//vjs.zencdn.net/v/oceans.png"
      data-setup='{}'
    >
      <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
      <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm">
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank"
          >supports HTML5 video</a
        >
      </p>
    </video>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

videojs('my-video')
setupCounter(document.querySelector('#counter'))
