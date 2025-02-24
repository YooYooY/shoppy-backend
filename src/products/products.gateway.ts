import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class ProductsGateWay {
  @WebSocketServer()
  private readonly server: Server;
  
  handleProductUpdated(){
    this.server.emit('productUpdated');
  }
}