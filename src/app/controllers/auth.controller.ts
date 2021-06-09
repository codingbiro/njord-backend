import { ApiOperation, Context, dependency, Get, HttpResponseOK, HttpResponseUnauthorized, Post, verifyPassword } from '@foal/core';
import { getSecretOrPrivateKey } from '@foal/jwt';
import { sign } from 'jsonwebtoken';
import { Connection } from 'typeorm';

import { User } from '../entities';

export interface ContextUser {
  id: number;
  email: string;
  name: string;
}

export class AuthController {
  @dependency
  connection: Connection;
  
  @Post('/login')
  @ApiOperation({
    summary: 'Login',
    description: 'Login with email and password',
    responses: {},
  })
  async login(ctx: Context<ContextUser>) {
    const user = await this.connection.getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email: ctx.request.body.email })
      .addSelect('user.password')
      .getOne();

    if (!user || !user.password) {
      return new HttpResponseUnauthorized();
    }
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
  whoami(context: Context<ContextUser>) {
    if (context.user) {
      return new HttpResponseOK({ id: context.user.id, email: context.user.email, name: context.user.name });
    }
    return new HttpResponseUnauthorized();
  }
}
