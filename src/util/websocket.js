import ElementUI from 'element-ui';
import store from '../store'

function init(username) {
  console.log("初始化连接......")
  const wsUri = `ws://47.107.41.106:8848/websocket/${username}`;
  this.socket = new WebSocket(wsUri)
  this.socket.onerror = onerror;
  this.socket.onmessage = onmessage;
  this.socket.onclose = close;
}

function onerror(e) {
  console.log(e, "onerror")
  // ElementUI.Notification({
  //   title: '',
  //   message: "WebSocket连接发生错误",
  //   type: 'error',
  //   duration: 0,
  // });
}

function onmessage(e) {
  console.log(e, "onmessage")
  store.dispatch('updateListOnlineUsers', JSON.parse(e.data))
}

function close() {
  this.socket && this.socket.close() // 关闭 websocket
}

function send(agentData) {
  this.socket.send(agentData);
}

export default {
  init, close, send, onmessage
}
