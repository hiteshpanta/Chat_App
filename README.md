
# Chat App Project

- For real time application we use web socket


## Need for this

user-A wants to send msg to  user-B

- Use WebRTC to communicate between browser to browser
- peer to peer connection.
- WebRTC : use when we have to send real time data, video steaming(video 		call/ audio call), msg sending
- When we have to sent just msg WebRTC gets overkilled.

## Client-Server Architecture

- In this client has to request(ask) to  the server.
- Server cannot directly req to client.
- Client has to req(ask) every time is there any msg for me if there is it will forward that msg to the client. This is called Polling.
- Problem: Due to Polling, servers resources are unused.

 	user-A   ---->	Server	---->	user-B

	req	----->	serve	---->	res


### Solution For This

Use Web Socket
It gives you bidirectional connection between both end user.
Both user can send/receive msg at any time.
It solves the problem of real time chat application.

	
	user-A	<--->	server	<--->	user-B



![arch image](/frontend/public/image.png)























## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
