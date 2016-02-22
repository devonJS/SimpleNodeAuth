# SimpleNodeAuth
Simple Node/Express/MongoDB authentication using passport.js

##Example usage:
**POST** request to '/users/signup' with the following req.body:
'username': "User",
'email': 'user@user.com',
'password': 'abc123'

Will return the 1 of 3 following responses:
* Error: if there is an error creating the sign-up
* Message: an object with a "message" key indicating if the email already exists in the user database
* User: the user information of the sign-up

On success: will store a local object with the keys username, email and password, the password being salted and hashed.

**POST** request to '/users/login' with the following req.body:
'email': 'user@user.com',
'password' 'abc123'

Will return the 1 of 3 following responses:
* Error: if there is an error trying to log-in
* Message: an object with a "message" key indicating if the username or password is incorrect
* User: the user information of login

Will check your password with the salted and hashed value in your MongoDB.

Special thanks to the following link: https://scotch.io/tutorials/easy-node-authentication-setup-and-local
