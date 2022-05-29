function collision(dist, i){
  let collid_thres = 0.01;
  var cpt_collision = 0;
  //-----------------------

  //Collision action
  if(dist < collid_thres){
    let Nx = getRandomArbitrary(-1, 1);
    let Ny = getRandomArbitrary(-1, 1);
    points.nxy[i] = [Nx, Ny];
    points.rgb[i] = [1, 0, 0, 1];

    if(points.nb_point < 200){
      cpt_collision++;
    }
  }

  //Decreasing colorization
  if(points.rgb[i][0] != 0){
    points.rgb[i][0] -= 0.00025;
  }

  //-----------------------
}
