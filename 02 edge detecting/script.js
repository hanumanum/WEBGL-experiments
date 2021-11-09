(async function () {
    //made from 2 triangles
    const vertices = new Float32Array([
        -1, -1,
        -1, 1,
        1, 1,
        -1, -1,
        1, 1,
        1, -1
    ]);

    const imageUrl = "images/colored.jpeg" 

    const vertexShaderSourceCode = await loadShader("shaders/vertexShader.vert")
    const fragmentShadeSourceCode = await loadShader("shaders/framgentShader.frag")
    /** @type {HTMLimageFile} */
    const image = await loadImage(imageUrl);

    const canvas = document.getElementById("webgl-canvas")
    /** @type {WebGLRenderingContext} */
    const gl = canvas.getContext("webgl")
    
    if (!gl) {
        console.log("your browser does not support webgl")
        return
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight

    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0.25, 0.25, 0.8, 09) //Just setting
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPT_BUFFER_BIT) //do the job TOUNDERSTAND ինչ է սա COLOR_BUFFER_BIT և DEPT_BUFFER_BIT ?????

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    gl.shaderSource(vertexShader, vertexShaderSourceCode)
    gl.shaderSource(fragmentShader, fragmentShadeSourceCode)

    gl.compileShader(vertexShader)
    checkCompileErrors(gl, vertexShader, "vertexShader")
    gl.compileShader(fragmentShader)
    checkCompileErrors(gl, fragmentShader, "vertexShader")

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("ERROR linking programm", gl.getProgramInfoLog(program))
        return;
    }

    gl.validateProgram(program)
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error("ERROR validateing programm", gl.getProgramInfoLog(program))
        return
    }


    const triangleVerticesBufferObject = gl.createBuffer();  //պարզաբանել էս մասը
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVerticesBufferObject) //պարզաբանել էս մասը
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)


    const positionAttribLocation = gl.getAttribLocation(program, "position")
    gl.vertexAttribPointer(
        positionAttribLocation, //attribute location
        2, //number of elements per attribute
        gl.FLOAT, // type of elements
        gl.FALSE,
        0,
        0
    )
    gl.enableVertexAttribArray(positionAttribLocation)

    const u_size = gl.getUniformLocation(program, "u_size")
    gl.uniform1f(u_size, Math.max(canvas.width, canvas.height));
   
    const texture = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

    gl.drawArrays(gl.TRIANGLES, 0, 6)

})();


