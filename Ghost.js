import * as THREE from 'three';
import { PeppersGhostEffect } from 'three/addons/effects/PeppersGhostEffect.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

//Se instancian las variables
    let container;

    let camera, scene, renderer, effect;

    let textureLoader = new THREE.TextureLoader();
    let textura = textureLoader.load('shroom_Base_Color2.png'); 


//Se crea un contenedor
    container = document.createElement( 'div' );
    document.body.appendChild( container );

//render

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setAnimationLoop( animate );
    container.appendChild( renderer.domElement );

//Se crea el efecto PeppersGhost
    effect = new PeppersGhostEffect( renderer );
    effect.setSize( window.innerWidth, window.innerHeight );
    effect.cameraDistance = 5;

    window.addEventListener( 'resize', onWindowResize );

//Camara
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 );

//Escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff,1);
    hemiLight.color.setHSL(10,10,10);
    hemiLight.position.set(0,0,0);
    scene.add(hemiLight);

    //comienzo de fbx
//var Myfbx;

const grupogirar = []; //OBJETO GIRAR

const fbxLoader = new FBXLoader()
fbxLoader.load('mushroom7.fbx', (object) => {
    object.scale.set(0.006, 0.006, 0.006); // Escalar si es necesario tamaño
    object.position.set(0,-2,0);
    scene.add(object);
    grupogirar.push(object);

    object.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                map: textura});
        }
    });

}, 

(xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% cargado'); }, 
(error) => { console.error('Error al cargar FBX:', error); });

//Ajuste de pantalla

function onWindowResize(){

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

effect.setSize(window.innerWidth, window.innerHeight);

}

//Animaciones
function animate(){
    grupogirar.some(object => object.rotation.y += 0.02);
;

effect.render(scene, camera);
}
animate();
 

 
