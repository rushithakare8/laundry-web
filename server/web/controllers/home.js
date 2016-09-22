import ViewData from '../helpers/ViewData';
import { getFBAccount } from './auth';

export const index = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData(request);
    baseData.fbAccount = getFBAccount();
    return reply.view('home', baseData);
  },
};

export const about = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData(request);
    baseData.fbAccount = getFBAccount();
    return reply.view('about', baseData);
  },
};

export const routes = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData(request);
    baseData.fbAccount = getFBAccount();
    return reply.view('routes', baseData);
  },
};

export const faq = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData(request);
    baseData.fbAccount = getFBAccount();
    return reply.view('faq', baseData);
  },
};
