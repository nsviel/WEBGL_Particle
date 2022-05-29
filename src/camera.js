function compute_mvp(){
  gl = info.context;
  //-----------------------

  // Create a perspective matrix, a special matrix that is
  const fieldOfView = 90 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const proj_mat = glMatrix.mat4.create();
  //lMatrix.mat4.perspective(proj_mat, fieldOfView, aspect, zNear, zFar);
  glMatrix.mat4.ortho(proj_mat, -1.0, 1.0, -1.0, 1.0, zNear, zFar);

  // Model view matrix
  const modelview_mat = glMatrix.mat4.create();

  //Stock info into a dedicated structure
  mvp.projection = proj_mat;
  mvp.modelview = modelview_mat;
  mvp.mvp = modelview_mat;

  //-----------------------
}
