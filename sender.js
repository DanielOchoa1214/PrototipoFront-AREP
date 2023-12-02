let randomPosition = () => {
    let isValid = Math.round(Math.random()) == 0;
    // let isValid = true;
    let pos = client.getPosition();
    let newPos = {
        x: isValid ? pos.x + 1 : pos.x + 2,
        y: isValid ? pos.y + 1 : pos.y + 2,
    }
    console.log(newPos);
    return newPos
}

let selectRandomPlayer = () => {
    return Math.round(Math.random() * 2);
}


document.getElementById("cons").addEventListener("click", () => {
    for (let i = 0; i < 500000; i++) {
        let newPos = randomPosition();
        client.setId(selectRandomPlayer());
        client.conservativeUpdatePosition(newPos.x, newPos.y);
    }
})

document.getElementById("opt").addEventListener("click", () => {
    for (let i = 0; i < 500000; i++) {
        let newPos = randomPosition();
        client.setId(selectRandomPlayer());
        client.optimisticUpdatePosition(newPos.x, newPos.y);
    }
})



