
export var canvas = d3.select("body").append("canvas")
  .attr("width", window.innerWidth)
  .attr("height", window.innerHeight)
  .style('background-color', '#FFFFFF');

canvas.node().getContext("webgl");

export var renderer = new THREE.WebGLRenderer({canvas: canvas.node(), antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.z = 1000;

export var scene = new THREE.Scene();

export var light = new THREE.HemisphereLight('#ffffff', '#666666', 1.5);
scene.add(light);

export var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.bottom = '45px';
document.body.appendChild(stats.domElement);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}