(async function () {
    const triangleVertices = [
		0.0, 0.5,    1.0, 1.0, 0.0,
		-0.5, -0.5,  0.7, 0.0, 1.0,
		0.5, -0.5,   0.1, 1.0, 0.6,

		0.3, 0.2,    0.8, 0.3, 1.0,
		-0.2, -0.8,  0.6, 0.0, 0.8,
		0.9, -0.3,   0.4, 0.5, 0.5,

	];
    
    const vertexShaderText = await loadShader("shaders/vertexShader.vert")
    const fragmentShaderText = await loadShader("shaders/framgentShader.frag")


    const canvas = document.getElementById("webgl-canvas")
    /** @type {WebGLRenderingContext} */
    const gl = canvas.getContext("webgl")
    const padding = 50

    if (!gl) {
        console.log("your browser does not support webgl")

    }

    canvas.width = window.innerWidth - padding
    canvas.height = window.innerHeight - padding

    gl.viewport(0, 0, window.innerWidth - padding, window.innerHeight - padding)
    gl.clearColor(0.25, 0.25, 0.8, 09) //Just setting
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPT_BUFFER_BIT) //do the job TOUNDERSTAND ինչ է սա COLOR_BUFFER_BIT և DEPT_BUFFER_BIT ?????

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    gl.shaderSource(vertexShader, vertexShaderText)
    gl.shaderSource(fragmentShader, fragmentShaderText)

    gl.compileShader(vertexShader)
    checkCompileErrors(gl, vertexShader, "vertexShader")
    gl.compileShader(fragmentShader)
    checkCompileErrors(gl, fragmentShader, "vertexShader")

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW)


    const positionAttribLocation = gl.getAttribLocation(program, "vertPosition")
    gl.vertexAttribPointer(
        positionAttribLocation, //attribute location
        2, //number of elements per attribute
        gl.FLOAT, // type of elements
        gl.FALSE, //
        5 * Float32Array.BYTES_PER_ELEMENT, //size of individual vertex (triangleVertices֊ի կառուցվածքի պատճառով)
        0 * Float32Array.BYTES_PER_ELEMENT  // offfset
    )

    
    const colorAttribLocation = gl.getAttribLocation(program, "vertColor")
    gl.vertexAttribPointer(
        colorAttribLocation, //attribute location
        3, //number of elements per attribute
        gl.FLOAT, // type of elements
        gl.FALSE, //
        5 * Float32Array.BYTES_PER_ELEMENT, //size of individual vertex (triangleVertices֊ի կառուցվածքի պատճառով)
        2 * Float32Array.BYTES_PER_ELEMENT // offfset (triangleVertices֊ի կառուցվածքի պատճառով)
    )

    gl.enableVertexAttribArray(positionAttribLocation)
    gl.enableVertexAttribArray(colorAttribLocation)

    gl.useProgram(program)
    gl.drawArrays(gl.TRIANGLES, 0, triangleVertices.length/5)

})();


