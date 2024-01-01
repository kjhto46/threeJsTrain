import * as THREE from "three"
import { DragControls } from "three/examples/jsm/controls/DragControls"

// ----- 주제: DragControls 드레그 하면서 이동시킬수있는 컨트롤 기능

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

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const meshes = []
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
    mesh.name = `box-${i}` // 박스 네임 추가
    scene.add(mesh)

    meshes.push(mesh)
  }

  // Controls !! 이부분 작업
  // DragControls은 안에 들어가는 인자값이 다름.
  /**
   * DragControls
   * 드래그할 메쉬들 지정 (이는 배열로 지정해줘도 됨)
   * 카메라,
   * 돔 엘리먼트
   * meshes (드래그할 메쉬들)이 생긴 이후 작성해야 에러가 안생김
   */
  const controls = new DragControls(meshes, camera, renderer.domElement)

  // DragControls에도 드래그 한 값이 필요할 수가 있음. 여기엔 addEventListener의 dragstart를 사용할수있음
  controls.addEventListener("dragstart", (e) => {
    console.log(e.object.name)
  })

  // 그리기
  const clock = new THREE.Clock()

  function draw() {
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
