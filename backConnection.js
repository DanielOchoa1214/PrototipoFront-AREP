let apiCall = (id, x, y) => {
    fetch(`http://localhost:8080/${id}`, {
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
        client.setPosition(res);
    });
};