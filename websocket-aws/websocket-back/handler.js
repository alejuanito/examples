'use strict';

const {
  handlerSocketSendMessage,
  handleSocketConnect,
  handleSocketDisconnect,
  defaultSocketHandler
} = require('./src/controllers/websocket.controller');


module.exports.defaultSocketHandler = defaultSocketHandler;
module.exports.handleSocketConnect = handleSocketConnect;
module.exports.handleSocketDisconnect = handleSocketDisconnect;
module.exports.handlerSocketSendMessage = handlerSocketSendMessage;