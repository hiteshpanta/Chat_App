
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


## How To Setup

step 1: install following packages in server. Before this setup server

npm i socket.io
npm i express

first user send req through http req then it transform into web socket.
socket uses http server for fallback.

2. step 2: Then install client library in frontend(eg: react.js)

npm i socket.io-client

It is use to create websocket client


3. step 3: Design Frontend for client to communicate

4. step 4:



### Communication happen in socket by creating any events.



** server sent and client listen to that event or vice versa.

-> In this example we will see how server emit and client listen to that particular event.

## Listening:
Client can listen to the event sent by server on if client is listening

	
	useEffect(() => {
    socket.current = connectWs();

    socket.current.on("connect", () => {

      // client can listen to server event inside this section
    })
  },[])


## Server Emit

Server can emit(sent) anything to user using below function.
	
	const ROOM = 'group';

// Listen for incoming connections from clients
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);



  // Listen for a "joinRoom" event from the client. Created a group chat room for the user to join. The userName is passed from the client when the event is emitted.
  socket.on('joinRoom', async(userName) => {
    console.log(`${userName} joined the room.`);

    await socket.join(ROOM);

    // -- send to all( It will notify the user who join the group) --
    // io.to(ROOM).emit('roomNotice', userName);


    // -- broadcast ( To notify that any user join the group) --
    socket.to(ROOM).emit('roomNotice', userName)
  })
})


## user is Typing Event

To create this feature we simply create the event from client side and send it to server then server will broadcast to other user

->	server side

	const ROOM = 'group';

	io.on('connection', (socket) => {
  		console.log('a user connected', socket.id);


  		socket.on('typing', (userName) => {
    			socket.to(ROOM).emit('typing', userName);
  		});

	});

->	client side

To emit

	useEffect(() => {

    		if (text) {
      			socket.current.emit('typing', userName);
    		}

  	}, [text,userName]);


To Listen the event
	 useEffect(() => {
    		socket.current = connectWs();

 
 
      	socket.current.on('typing', (userName: string) => {
        	setTypers((prev: any) => {
          		const isExist = prev.find((typers: string) => typers === userName);
          		if (!isExist) {
            			return [...prev, userName]
          		}

          		return prev;
        		});

      		})

    		})
  	},[])



## Stop Typing Event

->	server side

	const ROOM = 'group';

	io.on('connection', (socket) => {
  		console.log('a user connected', socket.id);


  		socket.on('stopTyping', (userName) => {
    			socket.to(ROOM).emit('stopTyping', userName);
  		});

	});


->	client side

To emit

	// for Typing Event
  useEffect(() => {

    if (text) {
      socket.current.emit('typing', userName);
      //It is called Debounce when user stop typing it exit from timer
      clearTimeout(timer.current)

    }

    timer.current = setTimeout(() => {
        socket.current.emit('stopTyping', userName)

    }, 2000);

    // cleaning funciton inside useEffect
    return () => {
      clearTimeout(timer.current)
    };


  }, [text,userName])

To Listen the event
	 useEffect(() => {
    		socket.current = connectWs();

 
 
      	ssocket.current.on('stopTyping', (userName: string) => {
        setTypers((prev: any) => prev.filter((typer: any) => typer !== userName));

      })
  },[])





### Clean - up function for every event


  useEffect(() => {
    socket.current = connectWs();

    socket.current.on("connect", () => {

      socket.current.on('roomNotice', (userName: string) => {
		//code
      });

      socket.current.on('chatMessage', (msg: string) => {

        // code
      });

      socket.current.on('typing', (userName: string) => {
        //code

      });

      socket.current.on('stopTyping', (userName: string) => {
        //code

      })
 

    });
// at the end we have to clean-up every subscribed event
    return () => {

      socket.current.off('roomNotice');
      socket.current.off('chatMessage');
      socket.current.off('typing');
      socket.current.off('stopTyping');

    }
  },[])



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
