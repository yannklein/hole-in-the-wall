import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { initYoutubePlayer } from './youtubePlayer';

const initCSS3DRenderer = () => {
  return new CSS3DRenderer();
}

var iFrameElement = function ( id, x, y, z, rx, ry, rz, h, w) {

  var div = document.createElement( 'div' );
  div.classList.add('manual-display');
  div.style.width = `${h}px`;
  div.style.height = `${w}px`;
  div.style.backgroundColor = '#000';

  var subDiv = document.createElement( 'div' );
  subDiv.id = 'youtube-player';
  subDiv.style.width = `${h}px`;
  subDiv.style.height = `${w}px`;
  div.appendChild( subDiv );

  initYoutubePlayer(id, h, w);

  var object = new CSS3DObject( div );
  object.scale.multiplyScalar(1);
  object.position.set( x, y, z );
  object.rotation.set( rx, ry, rz );
  object.name = id;

  return object;
};

export {initCSS3DRenderer, iFrameElement}


// <iframe width="560" height="315"
// src="https://www.youtube.com/embed/PmrWwYTlAVQ"
// frameborder="0"
// allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
// allowfullscreen></iframe>

// <iframe width="560" height="315"
// src="https://www.youtube.com/embed/pm-R3dvrUZg"
// frameborder="0"
// allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
// allowfullscreen></iframe>
