const loadShader = async (url) => {
    let response = await fetch(url)
    let sourceCode = await response.text()
    return sourceCode
}

const loadImage = async(url)=>{
    const image = new Image()
    image.src = url
    await image.decode()
    return image;
}

const checkCompileErrors = (gl,shader, title) =>{
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        console.error(`ERRROR compiling shader: ${title}`, gl.getShaderInfoLog(shader))
    }
    return
}