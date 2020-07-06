The live preview is [available here](http://35.224.103.122:3000/).

## Installation

1. Pull the repository
2. Go to the project directory and run ```yarn update && cd server && yarn update```
3. Run ```yarn start```

### Description

A simple React application with express server in Nodejs. An api server exposed a GraphQL endpoint for loading a text stored in a file. The server also exposes a GraphQL mutaion to change and save the new version of the text. 

In the client side React Apollo useQuery hook is being used to query the saved text from the server also using the GraphQL mutation to save the new text in server.

