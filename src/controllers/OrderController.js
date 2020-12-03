const Order = require('../models/OrderModel');

class OrderController  {
    async index(req, res) {
        const { query } = req.params;

        if(!query) {
            const orders = await Order.find();
            return res.json(orders);
        }

        try {
            const orders = await Order.find({table: query}).exec();
            res.json(orders);
        }catch {
            res.json({code: 'algo deu errado'});
        }
    
    };

    async create(req, res) {
        const { table, description, values } = req.body;

        if(!table || !description || !values) {
            return res.sendStatus(400);
        }

        try {
            let value = values.reduce((total, item) => total + item, 0);

            const order = await Order.create({
                table, description, value
            });
    
            req.io.emit('newOrder', order);
    
            res.json(order);
        }catch {
            res.json({code: 'algo deu errado'});
        }
    };

    async update(req, res) {
        const { id } = req.params;
        const { status } = req.body;

        if(!status) {
            return res.sendStatus(400);
        };

        try {
            const order = await Order.findByIdAndUpdate(
                { _id: id },
                { status },
                { new: true },
            );
    
            req.io.emit('statusChange', order);
    
            res.json(order);
        }catch {
            res.json({code: 'algo deu errado'});
        }

    };
    async calculator(req, res) {
        const { query } = req.params;

        if(!query) {
            return res.sendStatus(400);
        };

        try {
            const order = await Order.find({table: query}).exec();
        
            if(!order.length) {
                return res.json({code: 'not found'})
            };

            const orderCalculated = order.reduce((total, item) => total + item.value, 0);

            res.json({orders: order, calculated: orderCalculated});
        }catch {
            res.json({code: 'algo deu errado'});
        }
    };
    async delete(req, res) {
        const { id } = req.params;

        try {
            await Order.findByIdAndDelete(id, () => {
                res.json({code: 'deletado'});
            });
        }catch {
            res.json({code: 'algo deu errado'});
        }
    
    };
}

module.exports = new OrderController;