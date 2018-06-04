

    var raycaster = new THREE.Raycaster();
    var selectedObj = false;
    var boundingBox, previousSelection;
    var limit = 50;

    function onDocumentMouseDown(event)
    {

      var mouse = new THREE.Vector2;

      // transfer mouse position from 3D to the rendering screen
      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      var intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0)
      {

        if ((intersects[0].object.name!="ground") && (!selectedObj) && (intersects[0].object.name == "nature"))
        {
          // Create a bounding box around the selected object
          boundingBox = new THREE.BoxHelper(intersects[0].object, 0xffffff);
          scene.add(boundingBox);
          selectedObj = true;
          console.log(intersects[0].object.name+"selected");
          previousSelection = intersects[0].object;
        }

        else if ((intersects[0].object.name!="ground") && (selectedObj)) 
        {

          // Remove a bounding box of the selected object when Unselect
          scene.remove(boundingBox);
          selectedObj = false;
          console.log("Unselected");
          previousSelection = intersects[0].object;
        }

      if ((intersects[0].object.name=="ground") && (selectedObj))
      {
          var pos=intersects[0].point;

          // Add restriction so nature objects do not move to the middle 50x50 limit area
              if ((pos.x < limit) && (pos.x > -limit)) {
                  if ((pos.z > limit) || (pos.z < -limit)) {
                      previousSelection.position.x =pos.x;
                      previousSelection.position.z =pos.z;
                  } 

              } else if ((pos.z < limit) && (pos.z > -limit)) {
                  if ((pos.x > limit) || (pos.x < -limit)) {
                      previousSelection.position.x =pos.x;
                      previousSelection.position.z =pos.z;
                  } 

              } else {
                    previousSelection.position.x =pos.x;
                    previousSelection.position.z =pos.z;
              }
          previousSelection.position.y = -0.5;
          // bounding box follows the new position of the object
          boundingBox.update();
          console.log(pos.x + "," + pos.y + "," + pos.z);

      }
      }
    }

    // When the mouse is clicked, call the given function
    document.addEventListener('mousedown', onDocumentMouseDown, false);


function GenerateRandomModels(object,material,quantity)
{

  var counter = 0;
  while (counter < quantity) {
  //for (var i = 0; i < quantity; i++) {

    var mtlLoader = new THREE.MTLLoader();
      mtlLoader.load(material, function(materials){

        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load(object, function(mesh){

          mesh.traverse(function(child){
            if( child instanceof THREE.Mesh ){

              child.castShadow = true;
              child.receiveShadow = true;

              child.geometry.computeVertexNormals();
              child.material.shading = THREE.SmoothShading;
              child.position.x = Math.random() * 300 - 150 ;
              child.position.z = Math.random() * 300 - 150 ;
              child.position.y -= 0.5;
              child.name = "nature";

              // Add restriction for nature objects not to grown in 50x50 limit area in the middle
              if ((child.position.x < limit) && (child.position.x > -limit)) {
                  if ((child.position.z > limit) || (child.position.z < -limit)) {
                      scene.add(mesh);
                  } 

              } else if ((child.position.z < limit) && (child.position.z > -limit)) {
                  if ((child.position.x > limit) || (child.position.x < -limit)) {
                      scene.add(mesh);
                  } 

              } else {
                  scene.add(mesh);
              }
            }
          });
        });
      });

      counter++;
  }
}


        GenerateRandomModels("models/nature/tree_plateau.obj", "models/nature/tree_plateau.mtl", 30);
        GenerateRandomModels("models/nature/tree_default.obj", "models/nature/tree_default.mtl", 40);
        GenerateRandomModels("models/nature/tree_thin_dark.obj", "models/nature/tree_thin_dark.mtl", 45);
        GenerateRandomModels("models/nature/tree_pine_short_detailed.obj", "models/nature/tree_pine_short_detailed.mtl", 35);
        GenerateRandomModels("models/nature/flower_red3.obj", "models/nature/flower_red3.mtl", 50);
        GenerateRandomModels("models/nature/grass.obj", "models/nature/grass.mtl", 50);




