import * as THREE from "three";

// 브라우저 창 사이즈 변경 resize
export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true, //renderer배경 투명
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  /** 배경 불투명도 */
  // renderer.setClearAlpha(0.4);
  /** 배경 이미지를 바로 지정 가능 */
  renderer.setClearColor(0x00ff00);
  renderer.setClearAlpha(0.4);

  // Scene
  const scene = new THREE.Scene();
  /** scene에 직접 칠한 색은 renderer보다 위로 올라옴(상위에 있음) */
  scene.background = new THREE.Color('blue');

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각 (field of wiew)
    window.innerWidth / window.innerHeight, //종횡비 (aspect)
    0.1, // near
    1000 // far
  );
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  scene.add(camera);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: "#ff0000",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);

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
