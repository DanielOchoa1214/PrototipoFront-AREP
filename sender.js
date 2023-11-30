let randomPosition = () => {
    let isValid = Math.round(Math.random()) == 0;
    let pos = client.getPosition();
    let newPos = {
        x: isValid ? pos.x + 1 : pos.x + 2,
        y: isValid ? pos.y + 1 : pos.y + 2,
    }
    return newPos
}

for (let i = 0; i < 100; i++) {
    let newPos = randomPosition();
    // CONSERVADOR 
    client.conservativeUpdatePosition(newPos.x, newPos.y);
    // OPTIMISTA
    client.optimisticUpdatePosition(newPos.x, newPos.y);
}