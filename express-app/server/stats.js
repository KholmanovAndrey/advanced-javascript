const cart = require('./cart');
const fs = require('fs');

const actions = {
    add: cart.add,
    change: cart.change,
    del: cart.del
};

let stats = (action, file, cart, req) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            console.log('stats');
            let newData = cart.stats(action, JSON.parse(data), cart, req);
            console.log(newData);
            // fs.writeFile(file, newData, (err)=> {
            //     if (err){
            //         res.sendStatus(404, JSON.stringify({result: 0, text: err}));
            //     } else {
            //         res.send({result: 1, text: 'Success!'})
            //     }
            // })

        }
    })
};

module.exports = stats;