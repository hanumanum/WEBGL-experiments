precision mediump float;

attribute vec2 vertPosition; //input parameters
attribute vec3 vertColor;      //input parameters
varying vec3 fragColor; //output parameter

void main() {
    fragColor = vertColor;
    gl_Position = vec4(vertPosition, 0.0, 1.0);
}