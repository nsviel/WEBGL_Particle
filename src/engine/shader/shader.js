//Main functions
function init_shader(){
  //-----------------------

  //Init shader stuff
  const [vs, fs] = create_shader();
  init_program(vs, fs);
  init_params();

  //-----------------------
}
function start_sharder(){
  gl = engine.context;
  //-----------------------

  gl.useProgram(engine.shader.program);
  gl.uniformMatrix4fv(engine.shader.uniform.in_mvp, false, engine.mvp.mvp);
  gl.uniform1f(engine.shader.uniform.point_size, param.point_size);

  //-----------------------
}

//Subfunctions
function init_program(vs, fs) {
  gl = engine.context
  //-----------------------

  const vertexShader = load_shader(gl, gl.VERTEX_SHADER, vs);
  const fragmentShader = load_shader(gl, gl.FRAGMENT_SHADER, fs);

  // Create the shader program
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getinfoLog(program));
    return null;
  }

  //-----------------------
  engine.shader.program = program;
}
function init_params(){
  gl = engine.context
  program = engine.shader.program;
  //-----------------------

  //Stock info
  engine.shader.attribut.location = gl.getAttribLocation(program, 'in_position');
  engine.shader.attribut.color = gl.getAttribLocation(program, 'in_color');
  engine.shader.uniform.in_mvp = gl.getUniformLocation(program, 'in_mvp');
  engine.shader.uniform.is_point = gl.getUniformLocation(program, 'is_point');
  engine.shader.uniform.point_size = gl.getUniformLocation(program, 'point_size');

  //-----------------------
}
function runtime_shader(){
  gl.uniform1f(engine.shader.uniform.point_size, param.point_size);
}
function create_shader(){
  //-----------------------
  
  const shader_vertex = create_shader_vertex();
  const shader_fragment = create_shader_fragment();

  //-----------------------
  return [shader_vertex, shader_fragment];
}
function load_shader(gl, type, source) {
  //-----------------------

  const shader = gl.createShader(type);

  // Send the source to the shader object
  gl.shaderSource(shader, source);

  // Compile the shader program
  gl.compileShader(shader);

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  //-----------------------
  return shader;
}
