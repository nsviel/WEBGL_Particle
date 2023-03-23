//Main functions
function loop(){
  let gl = info.webgl.context;
  //-----------------------

  //main loop
  function render(){
    let rgb = convert_255_to_1(color.bkg);
    gl.clearColor(rgb[0], rgb[1], rgb[2], rgb[3]);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    tic();
    draw_scene();
    info.time.scene = toc_return();

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  //-----------------------
}
