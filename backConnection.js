let apiCall = (id, x, y) => {
    fetch(`http://35.173.199.111:8080/v1/conservative/position/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            x : x,
            y : y,
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        client.setPosition(res);
    });
};