import * as THREE from './three.module.min.js';

var cy;

console.log(cy);

function main() {
  const canvas = document.querySelector('#background');
  const renderer = new THREE.WebGLRenderer({canvas});

  var interactions = {
    "width": document.getElementById("width"),
    "y":document.getElementById("y"),
    "distance": document.getElementById("distance"),
    "color":document.getElementById("color")
  }

  //SETUP

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);


  //var floor = make_floor(scene,5,-2);

  const cG = new THREE.CylinderGeometry(1, 1, 1, 120);
  let cM = new THREE.MeshPhongMaterial({ color: 0xff0000 });

  cy = new THREE.Mesh(cG, cM)
  scene.add(cy)
  cy.position.x = 0
  cy.position.y = 0
  cy.position.z = -5

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  var lastColor = interactions.color.value;

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    /*floor.forEach(element => {
      scene.remove(element);
    });
    floor = make_floor(scene,interactions.width.value, interactions.y.value, interactions.distance.value);
    */

    let c = interactions.color.value;

    if(lastColor != c){
      //cM = new THREE.MeshBasicMaterial(c);
      //cy = new THREE.Mesh(cG, cM);
      //scene.add(cy);
      cy.material.color.set(c)
      lastColor = c;
    }


    cy.scale.x = interactions.distance.value;
    cy.scale.y = interactions.y.value;
    cy.scale.z = interactions.width.value;
    cy.rotation.x = time;
    cy.rotation.z = time*Math.PI;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

function make_floor(scene,width,y,distance){
  const length = 50;
  const lineGeo = new THREE.CylinderGeometry(.1,.1,length,100);
  const lineMat = new THREE.MeshPhongMaterial(0x000000);

  const lines = []

  function make_line(x,y){
    const l = new THREE.Mesh(lineGeo, lineMat);
    l.position.set(x,y,0);
    l.rotation.x = Math.PI/2
    scene.add(l)
    return l;
  }

  for (var x = -width; x<width;x++){
    lines.push(make_line(x*distance,y));
  }
  return lines;
}

function reMeshIfChanged(){

}

main();
