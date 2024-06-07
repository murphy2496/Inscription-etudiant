import { io } from 'socket.io-client'

const socket = io('http://localhost:4447')

export default socket
