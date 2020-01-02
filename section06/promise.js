const p = new Promise((resolve, reject) => {
    // resolve(1);
    reject(new Error('err'));
});

p
.then(result => console.log(result))
.catch(err => console.log(err.message));
