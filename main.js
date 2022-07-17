import * as THREE from "three";
import { CameraHelper, Scene } from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
console.log(THREE);

const sizes = {
  width: innerWidth,
  height: innerHeight,
};

const canvas = document.getElementById("canvas");

// Scene
const scene = new THREE.Scene();

// Camere
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  3000
);
camera.position.set(0, 500, 1000);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio);

// envimage
const urls = [
  "./envImage/right.png",
  "./envImage/left.png",
  "./envImage/up.png",
  "./envImage/down.png",
  "./envImage/front.png",
  "./envImage/back.png"
]
const loader = new THREE.CubeTextureLoader();
scene.background = loader.load(urls);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(500);

const cubeCamere = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
scene.add(cubeCamere);

// object
const geometry = new THREE.SphereGeometry(350, 50, 50);
const material = new THREE.MeshBasicMaterial({
  envMap: cubeRenderTarget.texture,
});
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 100, 0);
scene.add(sphere);

function animate() {
  controls.update();
  cubeCamere.update(renderer, scene);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

animate();
