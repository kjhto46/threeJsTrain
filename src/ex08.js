import * as THREE from "three";
import gsap from "gsap";

// 브라우저 창 사이즈 변경 resize
export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();
  /** 안개 속성 fog */
  scene.fog = new THREE.Fog(
    "black",
    3, // near
    7 //far
  );

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각 (field of wiew)
    window.innerWidth / window.innerHeight, //종횡비 (aspect)
    0.1, // near
    1000 // far
  );
  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  // 조명
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 10;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  //  MeshBasicMaterial 빛에 영향을 안받는 물질임
  const material = new THREE.MeshStandardMaterial({
    color: "#ff0000",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  // (빠른 pc나 느린 pc의 시간 흐름을 통일 시키기 위해)
  // clock으로 시간의 흐름에 맞게 통일하는 작업
  let time = Date.now();

  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - time;
    time = newTime;

    renderer.render(scene, camera);

    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  }
  draw();
  // !! gsap 라이브러리
  gsap.to(mesh.position, {
    buration: 1,
    y: 2,
    z: 3
  });

  // 리사이즈 이벤트
  function setSize() {
    // 카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  window.addEventListener("resize", setSize);
}
