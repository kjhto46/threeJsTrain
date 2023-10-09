import * as THREE from "three";

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

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각 (field of wiew)
    window.innerWidth / window.innerHeight, //종횡비 (aspect)
    0.1, // near
    1000 // far
  );
  camera.position.z = 5;
  scene.add(camera);

  // 조명
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.x = 5;
  light.position.y = 1;
  light.position.z = 3;
  scene.add(light);
  const light2 = new THREE.DirectionalLight(0xffffff, 0.2);
  light2.position.x = -1;
  light2.position.y = -5;
  light2.position.z = -1;
  scene.add(light2);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  //  MeshBasicMaterial 빛에 영향을 안받는 물질임
  const material = new THREE.MeshStandardMaterial({
    color: "#ff0000",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  function draw() {
    // 각도는 Radian을 사용
    // 360도는 2파이를 사용
    //
    // mesh.rotation.x += 0.1; // 라디안 값 이용

    /** THREE.MathUtils.degToRad() 
     * THREE.js에서 지원해주는 함수
     * deg값을 Radian 값으로 변경 즉 1이라고 입력하면 자동으로 1에 해당하는 라디안값 변경해서 배치 */
    mesh.rotation.x += THREE.MathUtils.degToRad(1); 
    mesh.rotation.y += THREE.MathUtils.degToRad(1); 
    renderer.render(scene, camera);

    window.requestAnimationFrame(draw);
  }

  draw();

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
