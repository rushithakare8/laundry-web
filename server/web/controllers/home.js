import ViewData from '../helpers/ViewData';
import uuid from 'node-uuid';

exports.index = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData();
    baseData.fbAccount = {
      appId: '881601445289245',
      csrf: uuid.v1(),
      version: 'v2.5',
    };
    return reply.view('home', baseData);
  },
};

exports.pricing = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData();
    baseData.fbAccount = {
      appId: '881601445289245',
      csrf: uuid.v1(),
      version: 'v2.5',
    };
    return reply.view('pricing', baseData);
  },
};

exports.about = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData();
    baseData.fbAccount = {
      appId: '881601445289245',
      csrf: uuid.v1(),
      version: 'v2.5',
    };
    return reply.view('about', baseData);
  },
};

exports.maps = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData();
    baseData.fbAccount = {
      appId: '881601445289245',
      csrf: uuid.v1(),
      version: 'v2.5',
    };
    return reply.view('maps', baseData);
  },
};

exports.faq = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData();
    baseData.fbAccount = {
      appId: '881601445289245',
      csrf: uuid.v1(),
      version: 'v2.5',
    };
    return reply.view('faq', baseData);
  },
};
