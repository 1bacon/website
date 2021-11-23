import * as THREE from './three.module.min.js';

function $(q) {return document.querySelector(q)};
function $$(q) {return document.querySelectorAll(q)};

function resizeRendererIfSizeChanged(renderer, context) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false);
      context.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      context.camera.updateProjectionMatrix();
    }
}

const canvas = $("#background")
const renderer = new THREE.WebGLRenderer({canvas})

const io = {
    width: () => $("#width").value,
    height: () => $("#height").value,
    depth: () => $("#depth").value,
    color: () => $("#color").value,
    shape: () => $("#shape").value
}

const context = {
    camera: new THREE.PerspectiveCamera(75, 2, 0.1, 5000),
    light: new THREE.DirectionalLight(0xffffffff, 1),
    scene: new THREE.Scene(),
    bodys : [],
}


function setup(){   
    context.bodys.push( new THREE.Mesh(
        new THREE.CylinderGeometry(1,1,1,120),
        new THREE.MeshPhongMaterial({color: 0xff0000}))
    )
            
    context.light.position.set(-1, 2, 4);
    context.bodys[0].position.z = -5  
    
    context.scene.add(context.light);
}

function render(time) {
    time *= 0.001;
    resizeRendererIfSizeChanged(renderer, context)

    context.bodys.forEach((e) => context.scene.add(e))

    context.bodys[0].scale.x = io.width()
    context.bodys[0].scale.y = io.height()
    context.bodys[0].scale.z = io.depth()
    
    context.bodys[0].material.color.set(io.color())
    
    context.bodys[0].rotation.x = time;
    context.bodys[0].rotation.z = time*Math.PI;

    renderer.render(context.scene, context.camera);
    requestAnimationFrame(render);
}



window.context = context
window.io = io



setup()
requestAnimationFrame(render)