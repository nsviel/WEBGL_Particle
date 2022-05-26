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
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  resizeCanvasToDisplaySize(canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  //Stock info
  info.context = gl;
  info.canvas = canvas;
  info.limit = [0.8, 0.8];
  info.param.nb_point = 50;
  info.param.bkg = 1;
  info.param.nb_point = 50;
  info.param.nb_link = 3;
  info.param.primitiv_rgb = 0;
  info.param.primitiv_alpha = 0.5;
  info.param.speed = 0.001;

  //HTML links
  canvas.addEventListener("mousemove", event => get_mouse_pos(event, canvas));
  document.getElementById("cpt_points").value = info.param.nb_point;
  document.getElementById("slider_points").value = info.param.nb_point;

  document.getElementById("cpt_links").value = info.param.nb_link;
  document.getElementById("slider_links").value = info.param.nb_link;

  document.getElementById("cpt_speed").value = info.param.speed;
  document.getElementById("slider_speed").value = info.param.speed;

  //-----------------------
}
function resizeCanvasToDisplaySize(canvas) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth  = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  const needResize = canvas.width  !== displayWidth ||
                     canvas.height !== displayHeight;

  if (needResize) {
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }

  return needResize;
}
function get_webgl_info(){
  //-----------------------

  say(gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
  say(gl.getParameter(gl.VERSION));

  //-----------------------
}
