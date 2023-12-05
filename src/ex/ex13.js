import * as THREE from "three"
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls"

// ----- 주제: FirstPersonControls, FlyControls 대체제임, 몇가지 기능을 수정 추가한 것이라 생각해도 좋음

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
  const controls = new FirstPersonControls(camera, renderer.domElement)
  // controls.movementSpeed = 10 // wasd가 더 빨리 움직여지는거
  // controls.activeLook = false // 마우스로 주변을 움직여도 고정
  // controls.lookSpeed = 0.1 // FlyControls 에서는 rollSpeed였죠? 여기는 lookSpeed
  // controls.autoForward =true // 저절로 앞으로 가는 모션

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

    controls.update(delta) // FlyControls와 동일하게 업데이트를 할때 delta값을 넣어줘야함.

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
