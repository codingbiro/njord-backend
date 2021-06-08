import { Context, Get, HttpResponseBadRequest, HttpResponseOK, Post } from '@foal/core';
import { JWTRequired } from '@foal/jwt';

import { Job, User } from '../entities';

@JWTRequired()
export class JobController {
  
  @Get('/all')
  async jobs(_ctx: Context) {
    const jobs = await Job.find();
    const promises: (Promise<User>|User)[] = [];
    for (const job of jobs) {
      promises.push(job.user);
    }
    await Promise.all(promises);
    return new HttpResponseOK(jobs);
  }

  @Post('/accept')
  async accept(ctx: Context) {
    const { id } = ctx.request.body;
    if (!id) return new HttpResponseBadRequest;
    const job = await Job.findOne(id);
    if (!job) return new HttpResponseBadRequest;

    // TODO accept

    return new HttpResponseOK(job);
  }

  @Post('/reject')
  async reject(ctx: Context) {
    const { id } = ctx.request.body;
    if (!id) return new HttpResponseBadRequest;
    const job = await Job.findOne(id);
    if (!job) return new HttpResponseBadRequest;

    // TODO reject

    return new HttpResponseOK(job);
  }
}
