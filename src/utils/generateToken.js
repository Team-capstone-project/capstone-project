function generateToken () {
    const token = localStorage.getItem("token");

    return token
}

export default generateToken;