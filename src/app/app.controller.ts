import { controller, IAppController, HttpResponseNoContent, Hook, Options, Config, Context, Get, HttpResponseOK } from '@foal/core';
import { JWTOptional } from '@foal/jwt';
import { createConnection } from 'typeorm';

import { AuthController, ProposalController } from './controllers';
import { RefreshJWT } from './hooks/refreshToken';

@Hook(() => response => {
  response.setHeader('Access-Control-Allow-Origin', Config.get('frontendUrl', 'string', ''));
})
@JWTOptional()
@RefreshJWT()
export class AppController implements IAppController {
  subControllers = [
    controller('/auth', AuthController),
    controller('/proposal', ProposalController),
  ];

  async init() {
    await createConnection();
  }
  
  @Options('*')
  options() {
    const response = new HttpResponseNoContent();
    response.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Cookie, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers');
    response.setHeader('Access-Control-Expose-Headers', 'Content-Type,Authorization');
    return response;
  }

  @Get('/')
  index(_ctx: Context) {
    return new HttpResponseOK('Hello world!');
  }
}
