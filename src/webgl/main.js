main();


function main() {
  //-----------------------

  init_wgl_context();
  init_configuration();
  init_shader();
  init_object();
  init_scene();
  init_gui();

  loop();

  //-----------------------
}
