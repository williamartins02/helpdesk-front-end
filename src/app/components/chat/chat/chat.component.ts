import { Credenciais } from './../../../models/credenciais';
import { IMensagem } from './../../../models/mensagem';
import { Component, OnInit } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userName: string = '';
  escrevendo:string;
  private client: Client;
  connected: boolean = false;
  mensagens : IMensagem[] = [];
  mensagem: IMensagem = {
    texto:    '',
    type:     '',
    username: '',
    color:    '',
    //direction: 'rtl', desativado temporariamente.
    //date: 'hgajkhdhja',
  }
  
  constructor() { }

  ngOnInit(): void {
    this.client = new Client();
    //we assign the Sock js to Stomp
    this.client.webSocketFactory = () => {
      return new SockJS("http://localhost:8080/chat-websocket");
    }

    this.client.onConnect = () => {
      this.connected = true;

      this.client.subscribe('/chat/message', e => {
        let mensagem: IMensagem = JSON.parse(e.body) as IMensagem;
          if(!this.mensagem.color && mensagem.type == 'NEW_USER' && this.mensagem.username == mensagem.username){
            console.log("Essa mensagem é minha")
            this.mensagem.color = mensagem.color;
          }
        //direcionar lados de mensagens desativados temporario
        //mensagem.direction = this.mensagem.username == mensagem.username ? 'rtl' : 'ltr';
        
        console.log("Mensagens", mensagem);
        this.mensagens.push(mensagem)
        console.log("Mensagens 2", mensagem);

      });

      this.client.subscribe('/chat/escrevendo', e =>{
        this.escrevendo = e.body;
        setTimeout(() => 
        this.escrevendo = '', 3000)
      });

      this.mensagem.type = "NEW_USER";
      this.client.publish({ destination: '/app/message', body: JSON.stringify(this.mensagem)});
    }

    this.client.onDisconnect = () => {
      this.connected = false;
    }
  }

  connect(): void {
    this.client.activate();
  }
  disconnect(): void {
    this.client.deactivate();
  }

  enviarMensagem(): void{
    this.mensagem.type = "MENSAGEM"
    console.log("mensagem", this.mensagem)
    this.client.publish({ destination: '/app/message', body: JSON.stringify(this.mensagem)});
    this.mensagem.texto = '';
  }

  escreverEvento(): void{
    this.client.publish({ destination: '/app/escrevendo', body: JSON.stringify(this.mensagem.username)});
  }
}
