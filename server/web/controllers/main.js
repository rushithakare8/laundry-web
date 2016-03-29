import Boom from 'boom';
import ViewData from '../helpers/ViewData';
import appRender from '../helpers/appRender';
import { getState } from '../helpers/stateCreator';

exports.index = {
  auth: 'session',
  handler(request, reply) {
    const baseData = ViewData.getBaseData();
    getState(request).then((state) => {
      baseData.state = state;
      console.log(state);
      appRender(request.path, state).then((html) => {
        baseData.html = html;
        return reply.view('main', baseData);
      }).catch((err) => {
        console.log(err);
        reply(new Boom(err));
      });
    }).catch((err) => {
      console.log(err);
      reply(new Boom(err));
    });
  },
};
