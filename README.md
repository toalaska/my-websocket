# websocket客户端简单封装

1. 取消实例化时连接,改成手动连接
1. 自动断线重连
1. 与原生接口保持一致

# Quick Start

    //实例化(不进行连接)
    window.ws = new MyWebSocket("ws://127.0.0.1:11301");
    //设置回调事件
    ws.onopen = function () {
        ws.send("test")
    }
    ws.onmessage = function (data) {
        console.info(data.data)
    }
    ws.onclose = function () {
        console.info()
    }
    ws.onerror = function (data) {
        console.info(data)
    }
    //进行连接
    ws.connect();
