// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { ProposalController } from './proposal.controller';

describe('ProposalController', () => {

  let controller: ProposalController;

  beforeEach(() => controller = createController(ProposalController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(ProposalController, 'foo'), 'GET');
      strictEqual(getPath(ProposalController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.foo(ctx)));
    });

  });

});
