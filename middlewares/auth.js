const {validateToken} = require("../services/auth");

// Middleware to get the logged-in user's info for showing their name in the navbar dropdown

function checkAuthenticationCookie(cookieName) {
    // Returns an Express middleware function
    return (req, res, next) => { 
        // Get the token value from the specified cookie

        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }

        try {
            // Validate the token and attach the user payload to the request
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        }
        catch (err) {
            // If token validation fails, ignore and continue
        }
        return next(); 
    }
}

module.exports = {
    checkAuthenticationCookie,
};