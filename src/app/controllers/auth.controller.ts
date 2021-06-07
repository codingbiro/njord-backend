import { ApiOperation, Context, Get, HttpResponseOK, HttpResponseUnauthorized, Post, verifyPassword } from '@foal/core';
import { getSecretOrPrivateKey } from '@foal/jwt';
import { sign } from 'jsonwebtoken';

import { User } from '../entities';

export class AuthController {
  
  @Post('/login')
  @ApiOperation({
    summary: 'Login',
    description: 'Login with email and password',
    responses: {},
  })
  async login(ctx: Context<User>) {
    const user = await User.findOne({
      email: ctx.request.body.email
    });
    if (!user || !user.password) {
      return new HttpResponseUnauthorized();    }  
    if (!(await verifyPassword(ctx.request.body.password, user.password))) {
      return new HttpResponseUnauthorized();
    }
    
    const token = sign(
      { sub: user.id.toString(), id: user.id, email: user.email, name: user.name },
      getSecretOrPrivateKey(),
      { expiresIn: '1h' }
    );

    return new HttpResponseOK({ token, id: user.id, email: user.email, name: user.name });
  }

  @Get('/whoami')
  @ApiOperation({
    summary: 'who am I?',
    description: 'Get email address and id of the currently logged in user',
    responses: {},
  })
  whoami(context: Context<User>) {
    if (context.user) {
      console.log(context.user);
      return new HttpResponseOK({ id: context.user.id, email: context.user.email, name: context.user.name });
    }
    return new HttpResponseUnauthorized();
  }
}
