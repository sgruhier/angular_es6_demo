export function getCoords(lat, lng) {
  var gamma = (90  - lat) * Math.PI / 180;
  var theta = (180 - lng) * Math.PI / 180;

  var x = 200 * Math.sin(gamma) * Math.cos(theta);
  var y = 200 * Math.cos(gamma);
  var z = 200 * Math.sin(gamma) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

// Reference: http://nisatapps.prio.org/armsglobe/

var origin = new THREE.Vector3(0,0,0);

export function arc(beg, end, detail){

  var distance = beg.distanceTo(end);
  
  var mid = beg.clone().lerp(end, 0.5);
  var midLength = mid.length();

  mid.normalize();
  mid.multiplyScalar(midLength + distance * 0.7);

  var normal = (new THREE.Vector3()).subVectors(beg, end);
  normal.normalize();

  var distanceHalf = distance * 0.5;

  var begAnchor    = beg;
  var midbegAnchor = mid.clone().add(normal.clone().multiplyScalar( distanceHalf));
  var midEndAnchor = mid.clone().add(normal.clone().multiplyScalar(-distanceHalf));
  var endAnchor    = end;

  var splineCurveA = new THREE.CubicBezierCurve3(beg, begAnchor, midbegAnchor, mid);
  var splineCurveB = new THREE.CubicBezierCurve3(mid, midEndAnchor, endAnchor, end);

  var vertexCount = Math.floor(distance * 0.02 + 6 ) * detail;

  var points = splineCurveA.getPoints(vertexCount);
  points = points.splice(0, points.length - 1); // Avoid Duplicate
  points = points.concat(splineCurveB.getPoints(vertexCount));

  var geometry = new THREE.Geometry();
  geometry.vertices = points;

  return geometry;
}





