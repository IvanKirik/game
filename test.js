function randomTime(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
}

console.log(randomTime(3, 6))
