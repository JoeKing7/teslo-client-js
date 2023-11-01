import { connectToServer } from './socket-client'
import './style.css'
// import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>WebSocket - client</h1>
    <input id="jwtToken" placeholder="Json Web Token"></input> 
    <button id="btnConnect">Connect</button>
    <br/>
    <span id="serverStatus">offline</span>
    <div>
      <ul id="clientsUl"><ul>  
    </div>
    
    <form id="messageForm">
      <input type="text" placeholder="message" id="messageInput">
    </form>

    <h3>Messages</h3>
    <ul id="messagesUl">

    </ul>

  </div>
`


// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// connectToServer();

const inputJwt = document.querySelector<HTMLInputElement>('#jwtToken')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btnConnect')!;


btnConnect.addEventListener('click', () => {
  if (inputJwt.value.trim().length <= 0) return alert('Enter a valid JWT')
  connectToServer(inputJwt.value.trim());
})




