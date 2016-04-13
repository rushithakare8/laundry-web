import ViewData from '../helpers/ViewData';
import uuid from 'node-uuid';

exports.index = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData();
    baseData.fbAccount = {
      appId: app_id,
      csrf: csrf_guid,
      version: api_version,
    };
    return reply.view('home', baseData);
  },
};
