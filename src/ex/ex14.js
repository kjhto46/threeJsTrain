import * as THREE from "three"
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"

// ----- 주제: PointerLockControls

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

  // Controls !! 이부분 작업
  const controls = new PointerLockControls(camera, renderer.domElement)
  // PointerLockControls을 사용하려면 controls.lock()을 지정해줘야하는데 이는 이렇게  지정할수가 없다.
  // console.log(controls.domElement === renderer.domElement) 둘은 같은것이다.
  controls.domElement.addEventListener("click", () => {
    controls.lock()
  }) // 클릭시 마우스 포인터가 사라지고 마우스 움직임을 따라 움직이는 화면을 만들게 된다.

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
