const fs = require('fs');
const moment = require('moment');

let add = (cart, req) => {
  cart.contents.push(req.body);
  stats('add', 'server/db/stats.json', req.body);
  return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
  let find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  stats('change', 'server/db/stats.json', find);
  return JSON.stringify(cart, null, 4);
};
let del = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    cart.contents.splice(cart.contents.indexOf(find), 1);
    stats('delete', 'server/db/stats.json', find);
    return JSON.stringify(cart, null, 4);
};
let stats = (query, file, cart, req) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            data = JSON.parse(data);
            let date = moment().format('MMMM Do YYYY, h:mm:ss a');
            data.push({
                query: query,
                name: cart.product_name,
                date: date
            });
            data = JSON.stringify(data, null, 4);
            fs.writeFile(file, data, (err)=> {
                if (err){
                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                } else {
                    res.send({result: 1, text: 'Success!'})
                }
            })

        }
    })
};
module.exports = {
    add,
    change,
    del
};