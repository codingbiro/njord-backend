import { Context, dependency, Get, HttpResponseBadRequest, HttpResponseOK, Post } from '@foal/core';
import { JWTRequired } from '@foal/jwt';

import { JobService } from '../services';
import { ContextUser } from './auth.controller';

@JWTRequired()
export class JobController {
  @dependency
  jobService: JobService;
  
  @Get('/all')
  async jobs(ctx: Context<ContextUser>) {
    const jobs = await this.jobService.getAll(ctx.user.id, ctx.request.query);
    return new HttpResponseOK(jobs);
  }

  @Get('/locations')
  async locations(_ctx: Context<ContextUser>) {
    const locations = await this.jobService.getLocations();
    return new HttpResponseOK(locations);
  }

  @Post('/accept')
  async accept(ctx: Context<ContextUser>) {
    const { id } = ctx.request.body;
    if (!id) return new HttpResponseBadRequest();

    try {
      const job = await this.jobService.accept(id, ctx.user.id);
      return new HttpResponseOK(job);
    } catch (e) {
      return new HttpResponseBadRequest(e.message);
    }
  }

  @Post('/reject')
  async reject(ctx: Context<ContextUser>) {
    const { id } = ctx.request.body;
    if (!id) return new HttpResponseBadRequest;
    try {
      const job = await this.jobService.reject(id, ctx.user.id);
      return new HttpResponseOK(job);
    } catch (e) {
      return new HttpResponseBadRequest(e.message);
    }
  }
}
