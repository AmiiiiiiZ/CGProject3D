

var scene;
function initScene() {
    scene = new THREE.Scene();
    //scene.fog = new THREE.Fog('#ff0000');
    //renderer.setClearColor(scene.fog.color, 1);
}

var renderer;
function initRenderer() {
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0.5);
    document.body.appendChild(renderer.domElement);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 5000);
    var camPosition = new THREE.Vector3(0,200,300);
    camera.position.set(camPosition.x, camPosition.y, camPosition.z);
    var camDirection = new THREE.Vector3(0,0,0);
    camera.lookAt(camDirection.x, camDirection.y, camDirection.z);
    scene.add(camera);
}

var orbitControls;
function initOrbitControls() {
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.enableZoom = true;
}

var stats;
function initStats() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}


/////////////
// control //
/////////////
var dirLightControl = new function() {
    this.intensity = 1;
    this.inclination = 30; //倾角 0-180
    this.azimuth = 90; //方位角 0-360
};

var gui = new dat.GUI();
gui.add(dirLightControl, 'intensity', 0, 1).onChange(updateSun);
gui.add(dirLightControl, 'inclination', 0, 45, 1).onChange(updateSun);
gui.add(dirLightControl, 'azimuth', 0, 360, 1).onChange(updateSun);

/////////////
/// 调参数 ///
/////////////
function updateSun() {
    //弧度 = 角度 * Math.PI / 180
    var distance = 250;
  	var alpha = dirLightControl.inclination * Math.PI / 180;
  	var beta = dirLightControl.azimuth * Math.PI / 180;

    directionalLight.intensity = dirLightControl.intensity;
    directionalLight.position.x = distance * Math.cos( alpha ) * Math.sin( beta );
    directionalLight.position.y = distance * Math.sin( alpha );
    directionalLight.position.z = - ( distance * Math.cos( alpha ) * Math.cos( beta ) );
}


/////////////
/// light ///
/////////////
var ambientLight;
var hemiLight;
var directionalLight;

function initLights() {
    ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
    scene.add(ambientLight);

    hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.2);
    hemiLight.position.set(0,150,0);
    scene.add(hemiLight);

    directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(200, 150, 0);
    directionalLight.target.position.set(0, 0, 0);

    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024; //阴影映射宽度
    directionalLight.shadow.mapSize.height = 1024; //阴影映射高度
    directionalLight.shadow.camera.near = 1; //投影近点，距离光源多近能产生阴影
    directionalLight.shadow.camera.far = 400; //投影远点，到哪一点为止不再产生阴影
    directionalLight.shadowCameraLeft = -150;
    directionalLight.shadowCameraRight = 150;
    directionalLight.shadowCameraTop = 150;
    directionalLight.shadowCameraBottom = -150;

    scene.add(directionalLight);
    scene.add(directionalLight.target);
}



var ground;
function initGround() {
    var groundGeo = new THREE.PlaneGeometry(300, 300);
    var groundMat = new THREE.MeshLambertMaterial({color: 0xD2B48C, side: THREE.DoubleSide});
    ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = - Math.PI/2; //-90 degrees around the x-axis
    ground.receiveShadow = true;
    scene.add(ground);
}


// var model;
// function initModel() {
//     var loader = new THREE.PLYLoader();
//     loader.load("/models/Building.ply", function(geometry) {
//         //更新顶点的法向量
//         geometry.computeVertexNormals();
//         //创建纹理，并将模型添加到场景道中
//         var material = new THREE.MeshLambertMaterial({color: 0x00ffff});
//         model = new THREE.Mesh(geometry, material);
//         model.rotation.y = Math.PI;
//         model.scale.set(0.1, 0.1, 0.1);
//         scene.add(model);
//     });
// }


/////////////
/// model ///
/////////////
var loader = new THREE.PLYLoader();
loader.load("models/Building.ply", function(geometry) {
    //更新顶点的法向量
    geometry.computeVertexNormals();
    //创建纹理，并将模型添加到场景道中
    var material = new THREE.MeshLambertMaterial({color: 0x4169E1});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.3, 0.3, 0.3);
    mesh.castShadow = true;
    scene.add(mesh);
  });


var camHelper;
var axisHelper;
var hemiLightHelper;
var dirLightHelper;

function initHelpers() {
    camHelper = new THREE.CameraHelper(camera);
    scene.add(camHelper);

    axisHelper = new THREE.AxisHelper(200); //红x 绿y 蓝z
    scene.add(axisHelper);

    hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 100); //size of the mesh used to visualize the light.
    scene.add(hemiLightHelper);

    // var dirLightHelper = new THREE.DirectionalLightHelper(directionalLight);
    // scene.add(dirLightHelper);

    dirLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    scene.add(dirLightHelper);
  }



//this function is called when the window is resized
var MyResize = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
};
window.addEventListener('resize', MyResize);



function animation() {
    renderer.render(scene, camera);
    requestAnimationFrame(animation);

    stats.update();
}

function threeStart() {
    initScene();
    initCamera();
    initRenderer();
    initStats();
    initOrbitControls()
    initLights();
    initGround();
    initHelpers()

    animation();
}

threeStart();
