import { Context, Hook, HookDecorator, HttpResponse, isHttpResponseServerError } from '@foal/core';
import { getSecretOrPrivateKey } from '@foal/jwt';
import { sign } from 'jsonwebtoken';

import { User } from '../entities';

export function RefreshJWT(): HookDecorator {
  return Hook((ctx: Context<User>) => {
    if (!ctx.user) {
      return;
    }

    return (response: HttpResponse) => {
      if (isHttpResponseServerError(response)) {
        return;
      }

      const newToken = sign(
        { sub: ctx.user.id.toString(), id: ctx.user.id, email: ctx.user.email, name: ctx.user.name },
        getSecretOrPrivateKey(),
        { expiresIn: '1h' }
      );
      response.setHeader('Authorization', newToken);
      response.setHeader('Access-Control-Expose-Headers', 'Content-Type,Authorization');
    };

  });
}