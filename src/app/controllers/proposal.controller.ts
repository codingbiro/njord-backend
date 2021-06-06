import { Context, Get, HttpResponseOK } from '@foal/core';
import { JWTRequired } from '@foal/jwt';

import { Proposal } from '../entities';

@JWTRequired()
export class ProposalController {
  
  @Get('/all')
  async proposals(_ctx: Context) {
    const proposals = await Proposal.find();
    return new HttpResponseOK(proposals);
  }
}
