
export default function socketIoMiddleware(socket, option = [], { eventName = 'action' } = {}) {
  return ({ dispatch }) => {
    // Wire socket.io to dispatch actions sent by the server.
    socket.on(eventName, dispatch);
    return next => (action) => {
      const { type } = action;
      if (type) {
        let emit = false;
        if (typeof option === 'string') {
          // String prefix
          emit = type.indexOf(option) === 0;
        } else if (typeof option === 'function') {
          // Test function
          emit = option(type, action);
        } else if (Array.isArray(option)) {
          // Array of types
          emit = option.some(item => type.indexOf(item) === 0);
        }
        if (emit) {
          socket.emit(eventName, action);
        }
      }
      return next(action);
    };
  };
}
