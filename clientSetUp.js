let socketSetUp = (() => {
    let _publicFunctions = {};
    let _stompClient = null;

    let _connect = () => {
        let _socket = new SockJS(`http://localhost:8080/stompendpoint`);
        _stompClient = Stomp.over(_socket);
        _stompClient.connect({}, function (frame) {
            _stompClient.subscribe(`/topic/rollback`, eventbody => {
                    let positions = JSON.parse(eventbody.body);
                    client.rollback(positions);
            });
        });
    }

    _publicFunctions.connect = () => {
        _connect();
    }

    _publicFunctions.getStompClient = () => {
        return _stompClient;
    }

    return _publicFunctions;

})();

let client = ((id) => {
    let _publicFunctions = {};
    let _position = {x: 0, y: 0}
    let _id = id;

    _publicFunctions.optimisticUpdatePosition = (newX, newY) => {
        _position.x = newX;
        _position.y = newY;
        socketSetUp.getStompClient().send(`topic/updatePosition.${_id}`, {}, JSON.stringify(_position));
    };

    _publicFunctions.conservativeUpdatePosition = (newX, newY) => {
        apiCall(_id, newX, newY);
    };

    _publicFunctions.getPosition = () => {
        return _position;
    }

    _publicFunctions.setPosition = (newPosition) => {
        _position = newPosition
    };

    _publicFunctions.rollback = (positions) => {
        _position = positions[_id];
    };

    return _publicFunctions;
})();
