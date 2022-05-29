//Main functions
function init_shader(){
  //-----------------------

  //Init shader stuff
  const [vs, fs] = create_shader();
  init_program(vs, fs);
  init_params();

  //-----------------------
}

//Subfunctions
function init_program(vs, fs) {
  gl = info.webgl.context
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
  info.shader.program = program;
}
function init_params(){
  gl = info.webgl.context
  program = info.shader.program;
  //-----------------------

  //Stock info
  info.shader.attribut.location = gl.getAttribLocation(program, 'in_position');
  info.shader.attribut.color = gl.getAttribLocation(program, 'in_color');
  info.shader.uniform.in_mvp = gl.getUniformLocation(program, 'in_mvp');
  info.shader.uniform.is_point = gl.getUniformLocation(program, 'is_point');
  info.shader.uniform.point_size = gl.getUniformLocation(program, 'point_size');

  //-----------------------
}
function create_shader(){
  //-----------------------

  // Vertex shader program
  const shader_vertex =
  `#version 300 es

  in vec4 in_position;
  in vec4 in_color;
  out vec4 frag_color;
  uniform float point_size;

  void main(){
    gl_Position = in_position;
    gl_PointSize = point_size;

    frag_color = in_color;
  }
  `;

  // Fragment shader program
  const shader_fragment =
  `#version 300 es

  precision highp float;
  uniform bool is_point;
  in vec4 frag_color;
  out vec4 out_color;

  void main() {
    if(is_point){
      float r = 0.0, delta = 0.0, alpha = 1.0;
      vec2 cxy = 2.0 * gl_PointCoord - 1.0;
      r = dot(cxy, cxy);
      if (r > 1.0) {
        discard;
      }
    }
    out_color = frag_color;
  }
  `;

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
