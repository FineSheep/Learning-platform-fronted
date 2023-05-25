var websocket = null;
var global_callback = null;
//todo 更换环境
const isDev = process.env.NODE_ENV === 'development';
const baseURL = isDev ? '127.0.0.1:9001' : '';
const ip = `ws://${baseURL}/game/match/${localStorage.getItem('userId')}`


function initWebSocket() { //初始化weosocket
    if (localStorage.getItem('userId') == null) {
        console.log('请登录');
        return;
    }
    websocket = new WebSocket(ip);
    websocket.onmessage = function (e) {
        websocketOnMessage(e);
    }
    websocket.onclose = function (e) {
        websocketClose(e);
    }
    websocket.onopen = function () {
        websocketOpen();
    }

    //连接发生错误的回调方法
    websocket.onerror = function () {
        console.log("WebSocket连接发生错误");
    }
}

// 实际调用的方法
function sendSock(agentData, callback) {
    global_callback = callback;
    if (websocket.readyState === websocket.OPEN) {
        //若是ws开启状态
        websocketSend(agentData)
    } else if (websocket.readyState === websocket.CONNECTING) {
        // 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
            sendSock(agentData, callback);
        }, 1000);
    } else {
        // 若未开启 ，则等待1s后重新调用
        setTimeout(function () {
            initWebSocket();
            sendSock(agentData, callback);
        }, 1000);
    }
}

//数据接收
function websocketOnMessage(e) {
    global_callback(JSON.parse(e.data));
}

//数据发送
function websocketSend(agentData) {
    websocket.send(JSON.stringify(agentData));
}

//关闭
function websocketClose(e) {
    console.log("connection closed (" + e.code + ")");
}

function websocketOpen(e) {
    console.log("连接成功");
/*    setInterval(() => {
        console.log("心跳检查");
        const ping = {"type": "PING"};
        websocketSend(ping);
    }, 5000)*/
}

initWebSocket();

export {sendSock}
