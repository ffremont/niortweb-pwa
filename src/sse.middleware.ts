import { Injectable, NestMiddleware } from '@nestjs/common';
import { SseService } from './sse/sse.service';
import { EventData } from 'express-sse-middleware/dist';
import { MsgData } from './models/msg-data';

@Injectable()
export class SseMiddleware implements NestMiddleware {

  idCounter = 0;
  clientId = 0;
  clients = new Map<number, any>();

  constructor(readonly sseService: SseService) {
    sseService.sseMsg$.subscribe((msgData: MsgData) => {
      console.log('subscribe');

      [ ...this.clients.values() ].forEach( ( sse ) => {
        console.log(this.idCounter);
        
        this.idCounter += 1;
        const eventData: EventData<MsgData> = {
          id: String(this.idCounter),
          event: 'newData',
          data: msgData,
        };
        sse.send( eventData ); // <- Push EventData with typed payload
      } );
    });
  }

  use(req: any, res: any, next: () => void) {
    const sse = res.sse();
    this.clientId += 1;
    const clientId = this.clientId;
    this.clients.set( clientId, sse );
    req.on( 'close', () => {
      sse.close();
      this.clients.delete( clientId );
    } );
  }


}
