import ViewData from '../helpers/ViewData';

exports.index = {
  handler(request, reply) {
    const baseData = ViewData.getBaseData();
    return reply.view('home', baseData);
  },
};
