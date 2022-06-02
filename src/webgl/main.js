main();


function main() {
  //-----------------------

  init_wgl_context();
  init_configuration();
  init_ui();
  init_shader();

  loop();

  //-----------------------
}
