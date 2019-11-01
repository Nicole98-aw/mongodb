const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be non-negative');
            }
            resolve (a + b);
        }, 3000);
    });
}


const doWork = async () => {
    const sum = await add(12, 13);
    return sum;
}

doWork().then((result) => {
    console.log(result);
});