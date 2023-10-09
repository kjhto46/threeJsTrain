import * as THREE from "three";

export default function example() {
  // 동적으로 캔버스 조립하기
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement)

  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  // PerspectiveCamera(원근 카메라)
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

  // OrthographicCamera (직교카메라)
  // const camera = new THREE.OrthographicCamera(
  //    -(window.innerWidth / window.innerHeight), //Left
  //    window.innerWidth / window.innerHeight, //Right
  //    1, //top
  //    -1, //Bottom
  //    0.1,
  //    1000
  // )
  // camera.position.x = 1;
  // camera.position.y = 2;
  // camera.position.z = 5;
  // camera.lookAt(0,0,0);
  // camera.zoom = 0.5; //z 축 이동으로는 줌인,줌아웃이 아님. z축 시점이 변경 zoom으로 제어
  // camera.updateProjectionMatrix(); //zoom 하고 난뒤 update해야함.
  // scene.add(camera);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: "#ff0000",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);
}
