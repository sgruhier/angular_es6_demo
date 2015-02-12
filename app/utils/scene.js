import { target, distance, update, initEvents } from './events';
import { getCoords, arc } from './helpers';

export class Scene {
  constructor(element) {
    this.element = element;
    this.animate = this.animate.bind(this);

    this.origin = new THREE.Vector3();
    this.rotation = {x: 0, y: 0};
    this.arcs = []

    this.createRenderer();
    this.createScene()

    this.addGlobe();
    this.animate();
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  width() {
    return this.element.clientWidth;
  }

  height() {
    return this.element.clientHeight;
  }

  createRenderer() {
    // Create canvas
    var canvas = d3.select(this.element).append("canvas")
      .attr("width", this.width())
      .attr("height", this.height())
      .style('background-color', '#FFFFFF')
    canvas.node().getContext("webgl");
    initEvents(canvas);

    // Create rendered
    this.renderer = new THREE.WebGLRenderer({canvas: canvas.node(), antialias: true});
    this.renderer.setSize(this.width(), this.height());

    this.element.appendChild(this.renderer.domElement);
  }

  createScene() {
    // Create camera
    this.camera = new THREE.PerspectiveCamera(70, this.width() / this.height(), 1, 5000);
    this.camera.position.z = 1000;

    // Create scene
    this.scene = new THREE.Scene();
    var light = new THREE.HemisphereLight('#ffffff', '#666666', 1.5);
    this.scene.add(light);
  }

  onWindowResize() {
    this.camera.aspect = this.width() / this.height();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.width(), this.height() );
  }

  addGlobe () {
    var world = THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg');

    var earth  = new THREE.MeshPhongMaterial({map: world, shininess: 10});
    var sphere = new THREE.SphereGeometry(200, 80, 40);

    var globe = new THREE.Mesh(sphere, earth)
    globe.rotation.y = Math.PI;
    this.scene.add(globe);
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.render();
  }

  render() {
    this.rotation.x += (target.x - this.rotation.x) * 0.1;
    this.rotation.y += (target.y - this.rotation.y) * 0.1;

    update((distance.t - distance.v) * 0.3);

    this.camera.position.x = distance.v * Math.sin(this.rotation.x) * Math.cos(this.rotation.y);
    this.camera.position.y = distance.v * Math.sin(this.rotation.y);
    this.camera.position.z = distance.v * Math.cos(this.rotation.x) * Math.cos(this.rotation.y);
    this.camera.lookAt(this.origin);

    this.renderer.render(this.scene, this.camera);
  }

  setArcs (arcs, replace = true) {
    // REMOVE EXISTING IF FLAG === true
    if (replace) {
      this.arcs.forEach( (arc, i) => {
        this.scene.remove(arc);
      })
      this.arcs = [];
    }

    // CREATE NEW ARCS. ADD TO SCENE AND ACTIVE ARRAY
    arcs.forEach( (d, i) => {
      var beg = getCoords(d.source_lat, d.source_lng);
      var end = getCoords(d.dest_lat, d.dest_lng);

      var geometry = arc(beg, end, 10);
      var lineMaterial = new THREE.LineBasicMaterial({
        color: d.color, linewidth: 1
      });

      var mesh = new THREE.Line(geometry, lineMaterial);

      this.arcs.push(mesh)
      this.scene.add(mesh)
    });
  }
}
