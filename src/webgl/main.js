main();


function main() {
  //-----------------------

  init_wgl_context();
  init_parameter();
  init_ui();
  init_shader();

  loop();

  //-----------------------
}
