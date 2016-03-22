import ViewData from '../helpers/ViewData';
import appRender from '../helpers/appRender';
import { getState } from '../helpers/stateCreator';

exports.index = {
  auth: 'session',
  handler(request, reply) {
    const baseData = ViewData.getBaseData();
    getState(request).then((state) => {
      baseData.state = state;
      appRender(request.path, state).then((html) => {
        baseData.html = html;
        return reply.view('main', baseData);
      }).catch((error) => {
        console.log(error);
        throw error;
      });
    });
  },
};
