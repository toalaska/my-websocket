function MyWebSocket(wsurl) {
    this.wsurl = wsurl;
    this.auto_reconnect = true;
}

MyWebSocket.prototype.__onopen = function () {
    if (this.onopen) {
        this.onopen();
    }
};
MyWebSocket.prototype.__onmessage = function (d) {
    if (this.onmessage) {
        this.onmessage(d);
    }

};
MyWebSocket.prototype.__onclose = function () {
    console.info("onclose")
    this.__reconnect();
    if (this.onclose) {
        this.onclose();
    }

};
MyWebSocket.prototype.__reconnect = function () {
    if (!this.auto_reconnect) {
        return false;
    }
    var self = this;
    setTimeout(function () {
        console.info("重连中...");
        self.connect()
    }, 3000);
};
MyWebSocket.prototype.__onerror = function (e) {
    console.info("onerror")
    console.error(e);
    this.__reconnect();
    if (this.onerror) {
        this.onerror(e);
    }

};

MyWebSocket.prototype.send = function (data) {
    /*
    * 0 ：对应常量CONNECTING (numeric value 0)，
    1 ：对应常量OPEN (numeric value 1)，
    2 ：对应常量CLOSING (numeric value 2)
    3 : 对应常量CLOSED (numeric value 3)
    */
    if (this.ws.readyState === 1) {
        this.ws.send(data)
    } else {
        console.error("state_err", this.ws.readyState)
    }
}
MyWebSocket.prototype.connect = function () {
    var self = this;
    if (this.ws && (this.ws.readyState === 0 || this.ws.readyState === 2)) {
        return false;
    }
    try {
        this.ws = new WebSocket(this.wsurl);
    } catch (e) {
        self.__onerror(e)
        return false;
    }
    console.info("conn", this);
    this.ws.onopen = function () {
        if (self.__onopen) {
            self.__onopen()

        }
    };
    this.ws.onmessage = function (d) {
        if (self.__onmessage) {
            self.__onmessage(d)

        }
    };
    this.ws.onclose = function () {
        if (self.__onclose) {
            self.__onclose()

        }
    };
    this.ws.onerror = function (e) {
        if (self.__onerror) {
            self.__onerror(e || new Error("ws_close"))

        }
    };

};
