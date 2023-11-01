import { Manager, Socket } from "socket.io-client"


let socket: Socket;

export const connectToServer = (jwt: string) => {
    const manager = new Manager('https://teslo-shop-api.onrender.com:3001/socket.io/socket.io.js', {

        extraHeaders: {
            authentication: jwt
        }

    });
    socket?.removeAllListeners();
    socket = manager.socket('/');
    addListeners();

    // http://localhost:3000/socket.io/socket.io.js
}

const addListeners = () => {
    const serverStatusLabel = document.querySelector('#serverStatus')!;
    const clientsUl = document.querySelector('#clientsUl')!;
    const messageForm = document.querySelector<HTMLFormElement>('#messageForm')!;
    const messageInput = document.querySelector<HTMLInputElement>('#messageInput')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messagesUl')!;

    
    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'Connected';
    })

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'Disonnected';
    })

    socket.on('clients-updated', (clients: string[]) => {
        let clienstHtml = '';
        clients.forEach( clientId => {
            clienstHtml += `
            <li>${ clientId }</li>
            `
        })
        clientsUl.innerHTML = clienstHtml;
    })

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (messageInput.value.trim().length <= 0) return;

        socket.emit('message-from-client', {
            id: 'me', message: messageInput.value
        });

        messageInput.value = '';
    })

    socket.on('message-from-server', (payload: { fullname: string, message: string }) => {
        const newMessage = `
        <li>
            <strong>${payload.fullname}</strong>
            <span>${payload.message}</span>
        </li>
        `;
        
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li);
        
    })
    
}