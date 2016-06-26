import ViewData from '../helpers/ViewData';
import { getFBAccount } from './auth';

export const index = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData();
    baseData.fbAccount = getFBAccount();
    return reply.view('home', baseData);
  },
};

export const pricing = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData();
    baseData.fbAccount = getFBAccount();
    return reply.view('pricing', baseData);
  },
};

export const about = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData();
    baseData.fbAccount = getFBAccount();
    return reply.view('about', baseData);
  },
};

export const maps = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData();
    baseData.fbAccount = getFBAccount();
    return reply.view('maps', baseData);
  },
};

export const faq = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData();
    baseData.fbAccount = getFBAccount();
    return reply.view('faq', baseData);
  },
};
