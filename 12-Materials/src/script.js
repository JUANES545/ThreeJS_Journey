import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Textures
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Objects
// const material = new THREE.MeshBasicMaterial({color: 'yellow'} )
// material.map = doorColorTexture
// material.color.set('#ff00ff')
// material.color = new THREE.Color('#f0f')
// material.wireframe = true // triangles objects
// material.opacity = .5
// material.transparent = true // both properties to transparency effect
// material.alphaMap = doorAlphaTexture

// const material = new THREE.MeshNormalMaterial() // impressive random colors
// material.wireframe = true // the last properties work
// material.flatShading = true // more polygon figures

// const material = new THREE.MeshMatcapMaterial() // To load materials to another images
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial() //depends of the camera distances

// const material = new THREE.MeshLambertMaterial() // properties related to lights

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(.5, 16, 16),
    material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(.3, .2, 16, 32),
    material
)
torus.position.x = 1.1

scene.add(sphere, plane, torus)

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, .5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, .5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Update objects
    sphere.rotation.y = .1 * elapsedTime
    plane.rotation.y = .1 * elapsedTime
    torus.rotation.y = .1 * elapsedTime

    sphere.rotation.x = .15 * elapsedTime
    plane.rotation.x = .15 * elapsedTime
    torus.rotationx = .15 * elapsedTime

    // console.log(elapsedTime)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()