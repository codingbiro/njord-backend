import { controller, IAppController, HttpResponseNoContent, Hook, Options, Config, Context, Get, HttpResponseOK, dependency, ServiceManager } from '@foal/core';
import { JWTOptional } from '@foal/jwt';

import { AuthController, JobController } from './controllers';
import { RefreshJWT } from './hooks/refreshToken';
import { InitDb } from './services';

@Hook(() => response => {
  response.setHeader('Access-Control-Allow-Origin', Config.get('frontendUrl', 'string', ''));
})
@JWTOptional()
@RefreshJWT()
export class AppController implements IAppController {
  @dependency
  private initDbService: InitDb;

  subControllers = [
    controller('/auth', AuthController),
    controller('/job', JobController),
  ];

  async init() {
    await this.initDbService.run();
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
