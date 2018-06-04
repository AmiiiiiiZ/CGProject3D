// //skybox
//  var geometry = new THREE.CubeGeometry(800, 800, 800);
//
//  var cubeMaterial = [];
//  cubeMaterial.push( new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("image/front.jpg"), side: THREE.DoubleSide} ));
//  cubeMaterial.push( new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("image/back.jpg"), side: THREE.DoubleSide} ));
//  cubeMaterial.push( new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("image/up.jpg"), side: THREE.DoubleSide} ));
//  cubeMaterial.push( new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("image/down.jpg"), side: THREE.DoubleSide} ));
//  cubeMaterial.push( new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("image/right.jpg"), side: THREE.DoubleSide} ));
//  cubeMaterial.push( new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("image/left.jpg"), side: THREE.DoubleSide} ));
//
//  var skyBox = new THREE.Mesh(geometry, cubeMaterial);
//  scene.add(skyBox);

//////////////////
//// skydome ////
//////////////////

var skyDomeTextureLoader = new THREE.TextureLoader();

var skyDomeGeometry = new THREE.SphereGeometry(3000, 60, 40);
var uniforms = {
texture: { type: 't', value: THREE.ImageUtils.loadTexture('skytest.png') }
};

var skyDomeMaterial = new THREE.ShaderMaterial( {
uniforms:       uniforms,
vertexShader:   document.getElementById('sky-vertex').textContent,
fragmentShader: document.getElementById('sky-fragment').textContent
});

var skyDome = new THREE.Mesh(skyDomeGeometry, skyDomeMaterial);
skyDome.scale.set(-1, 1, 1);
skyDome.eulerOrder = 'XZY';
skyDome.renderDepth = 1000.0;
scene.add(skyDome);

//////////////////
// skydome ends //
//////////////////
