main();


function main() {
  //-----------------------

  create_context();
  shadering();
  drawScene();

  //-----------------------
}

function create_context(){
  //-----------------------

  //Init background context
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl');
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  //Specific event actions
  canvas.addEventListener("mousemove", event => get_mouse_pos(event, canvas));

  //Stock info
  info.context = gl;
  info.canvas = canvas;
  info.limit.x = 0.8
  info.limit.y = 0.8;
  info.param.bkg = 1;
  info.param.nb_point = 50;
  info.param.primitiv_rgb = 0;
  info.param.primitiv_alpha = 0.5;

  //-----------------------
}
