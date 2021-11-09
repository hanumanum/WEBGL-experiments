precision mediump float;

uniform float u_size;
uniform sampler2D textureSampler;

void main() {
    //Sobel algorithm

    vec2 p = gl_FragCoord.xy;
    vec4 p0 = texture2D(textureSampler, (p + vec2(-1.0, -1.0)) / u_size);
    vec4 p1 = texture2D(textureSampler, (p + vec2(0.0, -1.0)) / u_size);
    vec4 p2 = texture2D(textureSampler, (p + vec2(1.0, -1.0)) / u_size);
    vec4 p3 = texture2D(textureSampler, (p + vec2(-1.0, 0.0)) / u_size);
    vec4 p5 = texture2D(textureSampler, (p + vec2(1.0, 0.0)) / u_size);
    vec4 p6 = texture2D(textureSampler, (p + vec2(-1.0, 1.0)) / u_size);
    vec4 p7 = texture2D(textureSampler, (p + vec2(0.0, 1.0)) / u_size);
    vec4 p8 = texture2D(textureSampler, (p + vec2(1.0, 1.0)) / u_size);

    /* 
        [
            [-1,0,1],
            [-2,0,2],
            [-1,0,1]
        ]
    */
    vec4 gx = -p0 + p2 - 2.0 * p3 + 2.0 * p5 - p6 + p8;

    /* 
        [
            [-1,-2,1],
            [0,0,0],
            [1,2,1]
        ]
    */
    vec4 gy = -p0 - 2.0 * p1 - p2 + p6 + 2.0 * p7 + p8;

    gl_FragColor = vec4(length(vec2(gx.x, gy.x)), length(vec2(gx.y, gy.y)), length(vec2(gx.z, gy.z)), 1.0);

}