import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

const initCSS3DRenderer = () => {
  return new CSS3DRenderer();
}

var iFrameElement = function ( id, x, y, z, ry ) {

  var div = document.createElement( 'div' );
  div.classList.add('manual-display');
  div.style.width = '480px';
  div.style.height = '360px';
  div.style.backgroundColor = '#000';

  var iframe = document.createElement( 'iframe' );
  iframe.style.width = '480px';
  iframe.style.height = '360px';
  iframe.style.border = '0px';
  iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
  div.appendChild( iframe );

  var object = new CSS3DObject( div );
  object.scale.multiplyScalar(0.1);
  object.position.set( x, y, z );
  object.rotation.y = ry;
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
