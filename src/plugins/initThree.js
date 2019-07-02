import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { initARJS } from './initAR';

let camera;
let scene;
let renderer;
let mesh;
let controls;
let onRenderFcts =[];

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const addObjects = (myScene) => {
  const texture = new THREE.TextureLoader().load('images/yann.jpg');
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 0.5;
  myScene.add(mesh);
};

const groundObject = (myScene) => {
  let geometry = new THREE.PlaneGeometry( 10, 10, 1 );
  let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  let ground = new THREE.Mesh( geometry, material );
  ground.rotation.x = - Math.PI / 2;
  ground.position.y = -0.01;
  myScene.add(ground);
}

const init = (withAR = false) => {
  //Error if not WebGL compatible
  if ( WEBGL.isWebGLAvailable() === false ) {
      document.body.appendChild( WEBGL.getWebGLErrorMessage() );
  }

  // init renderer
  var renderer  = new THREE.WebGLRenderer({
    antialias : true,
    autoResize : true,
    alpha: true
  });
  renderer.setClearColor(new THREE.Color('lightgrey'), 0);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0px';
  renderer.domElement.style.left = '0px';
  //renderer.setClearColor(new THREE.Color('lightgrey'), 0)
  document.body.appendChild( renderer.domElement );

  // Scene settings
  scene = new THREE.Scene();

  // Create a camera
  var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1500 );
  scene.add(camera);

  var light = new THREE.AmbientLight( 0xffffff ); // soft white light
  light.intensity = 0.7;
  scene.add( light );

  // Control for non AR
  if (!withAR) {

    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 0;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2;
  }

  // Add objects to the ThreeJS scene
  if (withAR) {
    addObjects(initARJS(scene, camera, onRenderFcts, renderer));
  } else {
    addObjects(scene);
    groundObject(scene);
  }

  // render the scene
  onRenderFcts.push(function(){
    renderer.render( scene, camera );
  })

  // run the rendering loop
  var lastTimeMsec= null
  requestAnimationFrame(function animate(nowMsec){
    // keep looping
    requestAnimationFrame( animate );
    // measure time
    lastTimeMsec  = lastTimeMsec || nowMsec-1000/60
    var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
    lastTimeMsec  = nowMsec
    // call each update function
    onRenderFcts.forEach(function(onRenderFct){
      onRenderFct(deltaMsec/1000, nowMsec/1000)
    })
  })
};


export { init };
