# About
Typescript Express Node API, for fetching API endpoint and interacting with the given result set.

To see all the routes and required parameters check the following route, BASE_ROUTE/api-docs

# Running the App
npm i, to install all dependencies.

## Production
"postinstall": "tsc",
 "start": "node src/server.js"
 
 ## Development
 "dev": "nodemon --config nodemon.json src/server.ts",
 
# About the App
Key Features:
- OOP architecture was utilized, MVC approach followed
- Typescript for secure-type checking
- Factory design pattern implemented
- Swagger docs for descriptive routes info
- Custom mail-sending functionality
- Global Error handler middleware with express-async-errors, logging with Winston logging package, ajv for body parsing, and more...
