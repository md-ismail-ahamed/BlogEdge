const jwt = require("jsonwebtoken");
const secret = "#ismail@1%21";

// Creates a JWT token for the given user object.
// The payload includes user ID, full name, email, and role.
// The token is signed using the secret key.

function createTokenUser(user) {
    const payload = {
        _id: user._id,          
        fullName: user.fullName, 
        email: user.email,       
        role: user.role, 
    }       
    const token = jwt.sign(payload, secret); 
    return token;
}


function validateToken(token) {
    const user = jwt.verify(token,secret);
    return user;
}

module.exports = {
    createTokenUser,
    validateToken,
}