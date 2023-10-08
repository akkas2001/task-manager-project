const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let Token = req.headers["token"];
    JWT.verify(Token, "SecretKey123", (error, decode) => {
        if(error) {
            console.log(Token);
            res.status(401).json({
                status:Unauthorized,
            });
        }
        else {
            let email = decode["data"];
            console.log(email);
            req.headers.email = email;
            next();
        }
    });
};