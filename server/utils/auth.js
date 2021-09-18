const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },

    authMiddleware: function({ req }) {
        //allows toked to be sent via req body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization

        //separate 'Bearer' from <tokenvalue>
        if (req.headers.authorization) {
            token = token
                .split(' ')
                .pop()
                .trim()
        }
        //if not token return req obj as is
        if (!token) {
            return req;
        }

        try {
            //decode & attach user data to req obj
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }
        //return updated request obj
      
    return req;
},
signToken: function({ username, email, _id }) {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
};