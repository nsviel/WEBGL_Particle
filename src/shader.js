

function shadering() {
  gl = info.context
  //-----------------------

  //Init shader stuff
  const [vs, fs] = create_shader();
  program = init_program(gl, vs, fs);

  //Stock info
  info.program = program;
  info.attribut.location = gl.getAttribLocation(program, 'in_position');
  info.attribut.color = gl.getAttribLocation(program, 'in_color');
  info.uniform.in_mvp = gl.getUniformLocation(program, 'in_mvp');
  info.uniform.is_point = gl.getUniformLocation(program, 'is_point');

  //-----------------------
}
function create_shader(){
  //-----------------------

  // Vertex shader program
  const shader_vertex = `
    attribute vec4 in_position;
    attribute vec4 in_color;
    uniform mat4 in_mvp;

    varying lowp vec4 frag_color;

    void main() {
      gl_Position = in_mvp * in_position;
      gl_PointSize = 5.0;

      frag_color = in_color;
    }
  `;

  // Fragment shader program
  const shader_fragment = `
    precision highp float;

    uniform bool is_point;

    varying lowp vec4 frag_color;

    void main(void) {
      if(is_point){
        float r = 0.0, delta = 0.0, alpha = 1.0;
        vec2 cxy = 2.0 * gl_PointCoord - 1.0;
        r = dot(cxy, cxy);
        if (r > 1.0) {
          discard;
        }
      }

      gl_FragColor = frag_color;
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
function init_program(gl, vs, fs) {
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
  return program;
}
