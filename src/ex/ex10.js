import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// ----- 주제: OrbitControls

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas")
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  // Scene
  const scene = new THREE.Scene()

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.y = 1.5
  camera.position.z = 4
  scene.add(camera)

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight("white", 1)
  directionalLight.position.x = 1
  directionalLight.position.z = 2
  scene.add(directionalLight)

  // Controls
  // OrbitControls은 카메라가 오브젝트를 보고 있는 (look at) 하는 상황이라 높이 지정이 달라도 정중앙으로 위치함
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  // controls.enableZoom = false;
  // controls.maxDistance = 10;//최대 줌아웃
  // controls.minDistance = 3;// 최대 줌인 설정
  // controls.minPolarAngle = Math.PI / 4; // 45도
  // controls.minPolarAngle = THREE.MathUtils.degToRad(45);
  // controls.maxPolarAngle = THREE.MathUtils.degToRad(135);
  // controls.target.set(2, 2, 2);
  // controls.autoRotate = true;
  controls.autoRotateSpeed = 50

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  let mesh
  let material
  for (let i = 0; i < 20; i++) {
    material = new THREE.MeshStandardMaterial({
      color: `rgb(
				${50 + Math.floor(Math.random() * 205)},
				${50 + Math.floor(Math.random() * 205)},
				${50 + Math.floor(Math.random() * 205)}
			)`,
    })
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (Math.random() - 0.5) * 5
    mesh.position.y = (Math.random() - 0.5) * 5
    mesh.position.z = (Math.random() - 0.5) * 5
    scene.add(mesh)
  }

  // 그리기
  const clock = new THREE.Clock()

  function draw() {
    const delta = clock.getDelta()

    controls.update()

    renderer.render(scene, camera)
    renderer.setAnimationLoop(draw)
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }

  // 이벤트
  window.addEventListener("resize", setSize)

  draw()
}
