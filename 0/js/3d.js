import * as THREE from 'three';
import { EffectComposer } from 'three/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/postprocessing/RenderPass.js';
import Stats from 'three/libs/stats.module.js';
import { OrbitControls } from 'three/controls/OrbitControls.js';
import { OutlineEffect } from 'three/effects/OutlineEffect.js';
import { MMDLoader } from 'three/loaders/MMDLoader.js';
import { MMDAnimationHelper } from 'three/animation/MMDAnimationHelper.js';

let stats;
let helper, mesh;
let camera, scene, renderer, effect, composer;
let info = document.getElementById('info');
// 获取网页URL参数
// const name = getUrlParams("name");
// const number = getUrlParams("weapons");
// const pmxfile = `https://ycl069.github.io/models/${name}/index.pmx`;
const pmxfile = `models/index.pmx`;
const vmdfile = `0.vmd`;
const number = 0

const clock = new THREE.Clock();
// 主函数
try {
  Ammo().then(function (AmmoLib) {
    Ammo = AmmoLib;
    init(pmxfile, vmdfile);
    animate();
  });
} catch (err) {
  info.style.width = "100%";
  info.style.backgroundColor = "red";
  info.innerHTML = "模型加载器初始化出错, 请刷新页面以重新加载!<br>如多次出现初始化错误,请将下面的详细内容复制并<a href='https://ycl.cool/blog/index.php/archives/17/'>点此反馈.</a><br><hr>" + err;
}
// 场景配置
function init(pmxfile, vmdfile) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  // 相机
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 40;
  // 背景(黑色)
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
  info.innerHTML = "模型加载器初始化成功.<hr>若页面长时间未响应请刷新页面!<br>如多次出现,请<a href='https://ycl.cool/blog/index.php/archives/17/'>点此反馈.</a>";
  // 人物模型
  const loader = new MMDLoader();
  // loader.load(
  //   pmxfile,
  //   (mesh) => {
  //     // 添加到屏幕( X:0 y:-10 Z:0)
  //     mesh.position.y = -10;
  //     scene.add(mesh);
  //     Finish();
  //   },
  //   (xhr) => {
  //     info.innerHTML = "加载模型主文件..." + (xhr.loaded / xhr.total * 100).toFixed(2) + "%<br>" + (xhr.loaded / 1024).toFixed(0) + " KB / " + (xhr.total / 1024).toFixed(0) + " KB";
  //   },
  //   (err) => {
  //     document.getElementById('error').innerHTML = "1";
  //     console.error(err);
  //   }
  // );
  // ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
  // if ( 1 = 2 ) {
  helper = new MMDAnimationHelper();
  loader.loadWithAnimation(
    pmxfile,
    vmdfile,
    (mmd) => {
      // 添加到屏幕( X:0 y:-10 Z:0)
      mesh = mmd.mesh;
      mesh.position.y = -10;
      scene.add(mesh);
      // 提示信息
      Finish(false);
      // 监听
      const audioListener = new THREE.AudioListener();
      camera.add(audioListener);
      // 音频对象
      const oceanAmbientSound = new THREE.Audio(audioListener);
      scene.add(oceanAmbientSound);
      // 加载音频资源
      const loader = new THREE.AudioLoader();
      loader.load(
        '0.mp3',
        (audioBuffer) => {
          // 处理音频
          oceanAmbientSound.setBuffer(audioBuffer);
          helper.add(mesh, {
            animation: mmd.animation,
            physics: true
          });
          // 播放音频
          oceanAmbientSound.play();
          // 提示信息
          info.style.backgroundColor = "green";
          info.innerHTML = "加载完成.";
          setTimeout(() => {
            document.getElementById('progrsess').style.transition = "3s"
            document.getElementById('progrsess').style.top = "-200px";
          }, 2000);
        },
        // 声音的回调函数
        (xhr) => {
          info.innerHTML = "加载音频文件..." + (xhr.loaded / xhr.total * 100).toFixed(2) + "%<br>" + (xhr.loaded / 1024).toFixed(0) + " KB / " + (xhr.total / 1024).toFixed(0) + " KB";
        },
        (err) => {
          document.getElementById('error').innerHTML = "1";
          console.error(err);
        }
      );
    },
    // 模型和动作的回调函数
    (xhr) => {
      info.innerHTML = "加载模型主文件..." + (xhr.loaded / xhr.total * 100).toFixed(2) + "%<br>" + (xhr.loaded / 1024).toFixed(0) + " KB / " + (xhr.total / 1024).toFixed(0) + " KB";
    },
    (err) => {
      document.getElementById('error').innerHTML = "1";
      console.error(err);
    }
  );
  // 武器模型 
  // weapons(loader, number);
  // 相机
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 10;
  controls.maxDistance = 100;
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
// 渲染场景
function animate() {
  requestAnimationFrame(animate);
  stats.begin();
  composer.render();
  renderer.toneMappingExposure = Math.pow(1.0, 1);
  renderer.render(scene, camera);
  stats.end();
  render();
}
// 加载武器模型
function weapons(loader, number) {
  if (number == 1) {
    loader.load(`https://ycl069.github.io/models/${name}/1.pmx`, function (mesh) {
      // 添加到屏幕( X:-10 y:-10 Z:0)
      mesh.position.x = -10;
      mesh.position.y = -10;
      scene.add(mesh);
    })
  } else if (1 < number && number <= 4) {
    let x = [0, -10, +10, +5, -5, -10];
    let z = [0, 0, 0, -10, -10, 0];
    for (let i = 1; i <= number; i++) {
      loader.load(`https://ycl069.github.io/models/${name}/${i}.pmx`, function (mesh) {
        // 添加到屏幕(X,Y,Z)
        mesh.position.x = x[i];
        mesh.position.y = -10;
        mesh.position.z = z[i];
        scene.add(mesh);
      });
    }
  } else if (number = 4 && number != 7) {
    // 姬子
    let x = [0, -20, +20, +10, -10, -20];
    let z = [0, 0, 0, -20, -20, -20];
    for (let i = 1; i <= number; i++) {
      loader.load(`https://ycl069.github.io/models/${name}/${i}.pmx`, function (mesh) {
        // 添加到屏幕(X,Y,Z)
        mesh.position.x = x[i];
        mesh.position.y = -10;
        mesh.position.z = z[i];
        scene.add(mesh);
      });
    }
  } else if (number = 7) {
    // 玲可
    let x = [0, -15, +20, +10, -10, -20, 0, +20];
    let z = [0, 0, 0, -15, -15, -15, -15, -15];
    for (let i = 1; i <= number; i++) {
      loader.load(`https://ycl069.github.io/models/${name}/${i}.pmx`, function (mesh) {
        // 添加到屏幕(X,Y,Z)
        mesh.position.x = x[i];
        mesh.position.y = -10;
        mesh.position.z = z[i];
        scene.add(mesh);
      });
    }
  }
}
// 加载完成提示信息
function Finish(isclose, text1, text2) {
  if (document.getElementById('error').innerHTML == 1) {
    info.style.width = "50%";
    info.style.backgroundColor = "goldenrod";
    info.innerHTML = "加载出现非致命性错误, 若无法正常渲染请刷新页面!<br>如多次出现,请<a href='https://ycl.cool/blog/index.php/archives/17/'>点此反馈.</a>"
  } else {
      info.innerHTML = "预加载模型材质..."
      onAfterRender(mesh, 0, 0, () => {
        info.style.backgroundColor = "green";
        info.innerHTML = "等待网络响应...";
      })
  }

  if (isclose) {
    setTimeout(() => {
      document.getElementById('progrsess').style.transition = "3s"
      document.getElementById('progrsess').style.top = "-200px";
    }, 2000);
  }
}
/**
 * 获取模型当前已渲染的贴图数
 * @param model       模型对象
 * @returns {number}  贴图数
 */
function getImageCount(model) {
  let iCount = 0

  model.traverse(item => {
    if (item instanceof THREE.Mesh) {
      if (Array.isArray(item.material)) {
        item.material.forEach(m => {
          if (m.map && m.map.image) {
            iCount++
          }
        })
      } else {
        if (item.material.map && item.material.map.image) {
          iCount++
        }
      }
    }
  })

  return iCount
}
/**
 *
 * @param model     模型对象
 * @param ic        贴图计数器
 * @param ec        重复次数
 * @param callback  回调函数
 */
function onAfterRender(model, ic, ec, callback) {
  const wait = 3

  let iCount = ic

  let equalCount = ec

  setTimeout(() => {
    const res = getImageCount(model)

    if (iCount === res) {
      if (equalCount === wait) {
        callback()
      } else {
        equalCount++
        onAfterRender(model, iCount, equalCount, callback)
      }
    } else {
      iCount = res
      equalCount = 0
      onAfterRender(model, iCount, equalCount, callback)
    }
  }, 100)
}
function render() {

  helper.update(clock.getDelta());
  renderer.render(scene, camera);

}
