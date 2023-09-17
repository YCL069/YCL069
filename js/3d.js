import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';
import { getUrlParams } from './function.module.js';

let stats;
let camera, scene, renderer, effect, composer;

const name = getUrlParams("name");
const file = `https://github.ycl.cool/models/${name}/index.pmx`;
const gammaValue = 1.0;

Ammo().then(function (AmmoLib) {
  Ammo = AmmoLib;
  init(file);
  animate();
});

function init(file) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  // 相机
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 30;
  // 背景(颜色黑色)
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x151515);
  // 光照
  const ambientLight = new THREE.AmbientLight(0xd8d8d8);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xd8d8d8, 3);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);
  // 抗锯齿
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 渲染器
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  // 其他
  effect = new OutlineEffect(renderer);
  stats = new Stats();
  container.appendChild(renderer.domElement);
  container.appendChild(stats.dom);
  // 提示信息
  let htmlObj = document.getElementById('text_div');
  var a = document.createElement('h3');
  a.innerHTML = "模型加载器初始化成功.";
  htmlObj.appendChild(a);
  var a = document.createElement('h3');
  // 模型加载
  const loader = new MMDLoader();
  loader.load(file, function (mesh) {
    // 添加到屏幕( X:0 y:-10 Z:0)
    mesh.position.y = -10;
    scene.add(mesh);
    // 提示信息
    var a = document.createElement('h3');
    a.innerHTML = "模型主文件加载完成<br><br>开始加载模型材质...<br><br><a style='color:red'>无法获取进度,请自行判断模型材质加载进度!</a><br><a style='color:aqua'></a>";
    htmlObj.appendChild(a);
    setTimeout(function () {
      document.getElementById('progrsess').style.display = "none";
    }, 4000);
    },
    function (xhr) {
      // 提示信息
      a.innerHTML = "加载模型主文件..." + (xhr.loaded / xhr.total * 100).toFixed(4) + "%";
      htmlObj.appendChild(a);
    }
  );

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 10;
  controls.maxDistance = 100;
  // 相机事件
  window.addEventListener('resize', onWindowResize);
}
// 相机事件
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  stats.begin();
  composer.render();
  renderer.toneMappingExposure = Math.pow(gammaValue, 1);
  renderer.render(scene, camera);
  stats.end();
}
