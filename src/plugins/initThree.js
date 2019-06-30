import * as THREE from 'three';

let camera;
let scene;
let renderer;
let mesh;

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const addObjects = (myScene) => {
  const texture = new THREE.TextureLoader().load('../../images/yann.jpg');
  const geometry = new THREE.BoxBufferGeometry(200, 200, 200);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  mesh = new THREE.Mesh(geometry, material);
  myScene.add(mesh);
};

const init = () => {
  // Camera and Scene settings
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;
  scene = new THREE.Scene();
  // Add objects to the ThreeJS scene
  addObjects(scene);
  // Render the scene
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  // Event listener on the scene
  window.addEventListener('resize', onWindowResize, false);
};

const animate = () => {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
};

export { init, animate };