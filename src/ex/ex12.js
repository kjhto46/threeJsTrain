import * as THREE from "three"
import { FlyControls } from "three/examples/jsm/controls/FlyControls"

// ----- 주제: FlyControls 게임을 하듯 wasd로 컨트롤이 가능함. (드론나는것같은 뷰) qe, rf 키도 있음

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

  // Controls !! 이부분 마우스를 따라 회전하는 것을 볼수있음.
  const controls = new FlyControls(camera, renderer.domElement)
  controls.rollSpeed = 0.05 // rollSpeed 기본 0.005 회전을 빠르게 함
  // controls.movementSpeed = 3; // wasd의 이동속도를 컨트롤 하는 값 ) 기본값 1
  // controls.dragToLook = true; // 마우스 포인터에따라 회전하지 않고 드래그를 하고있는것에 따라 회전함

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

    controls.update(delta) // 업데이트를 할때 delta값을 넣어줘야함.

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
