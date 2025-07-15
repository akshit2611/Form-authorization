# User Authentication System---

This is a basic Node.js and Express-based user authentication system that includes:

- User Registration with time & date stamp  
- User Login with validation  
- Display of all registered users  
- Password Hashing using bcrypt  
- JWT-based authentication  
- Cookie storage using cookie-parser  
- Route protection using JWT  
- Login/Register timestamp logging  

## 🛠️ Technologies Used---

- Node.js  
- Express.js  
- MongoDB (via Mongoose)  
- bcrypt  
- JWT (jsonwebtoken)  
- cookie-parser

## 🧑‍💻 Features---

1. **User Registration**  
   - New users can register by providing their name, email, and password.
   - Passwords are securely hashed using `bcrypt`.
   - Registration time and date are recorded.

2. **User Login**  
   - Existing users can log in using the same email and password.
   - On successful login, a JWT token is generated and stored in cookies.
   - Login time and date are recorded.

3. **All Users Page**  
   - A route to view all registered users.
   - User details shown: name, email, registration time, and last login time.

4. **Security**  
   - Passwords are hashed using `bcrypt` with `gensalt`.
   - JWT is used to protect routes.
   - `cookie-parser` used to handle cookies for storing JWT.
 
Routes and their Roles---

1. /create- To create a user. 
2. /update- To Update the details of the user.
3. /users- To view all the registered users.
4. /delete- To delete any user.
5 /login- To login into the account.
