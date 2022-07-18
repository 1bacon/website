import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.module.min.js';

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

function geo_factory(name){
    const eval_str = "THREE." + name
    switch(name){
        case "CylinderGeometry":
            return new THREE.CylinderGeometry(1,1,1,50)
        case "BoxGeometry":
            return new THREE.BoxGeometry(1,1,1)
        case "ConeGeometry":
            return new THREE.ConeGeometry(2,1,50)
        case "PlaneGeometry":
            return new THREE.PlaneGeometry(1,1,2,3)
        default:
            throw Error("Unsupported Shape passed: '"+ name +"'")
    }
}

function render(time) {
    time *= 0.001;
    resizeRendererIfSizeChanged(renderer, context)

    context.bodys.forEach((e) => context.scene.add(e))

    const name = io.shape()
    try{
        if (! (context.bodys[0].geometry.type == name)){
            context.bodys[0].geometry = geo_factory(name)
        }
    }
    catch (e){
        console.error("Shape evaluation failed for: '"+io.shape()+"'\n"+e)
    }

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
window.THREE = THREE


setup()
requestAnimationFrame(render)
