const ProductModel = require('../models/ProductModel');

class ProductController {
    async index(req, res) {
        const { query } = req.params;

        if(!query) {
            try {
                const product = await ProductModel.find();
                return res.json(product);
            }catch(erro) {
                res.json({code: erro, msg: 'algo deu errado'});
            }
        }

        try {
            const product = await ProductModel.find({name: query}).exec();
            res.json(product);
        }catch(erro) {
            res.json({code: erro, msg: 'algo deu errado'});
        };

    };
    async create(req, res) {
        const { name, value } = req.body;

        if(!name || !value) {
            return res.json({msg: 'campos obrigatorios'});
        };

        try {
            const product = await ProductModel.create({
                name,
                value
            });
            res.json(product);
        }catch(erro) {
            res.json({code: erro, msg: 'algo deu errado'});
        }
    };
    async update(req, res) {
        const { id } = req.params;
        const { name, value } = req.body;

        if(!name && !value) {
            res.json({msg: 'os dois parametros estao vazio'});
        }else if(!name) {
            try {
                const product = await ProductModel.findByIdAndUpdate(
                    {_id: id},
                    {value},
                    {new: true}
                );
                res.json(product);
            }catch(erro) {
                res.json({code: erro, msg: 'algo deu errado'});
            }
        }else {
            try {
                const product = await ProductModel.findByIdAndUpdate(
                    {_id: id},
                    {name},
                    {new: true}
                );
                res.json(product);
            }catch(erro) {
                res.json({code: erro, msg: 'algo deu errado'});
            }
        }
    };
    async delete(req, res) {
        const { id } = req.params;

        if(!id) {
            res.sendStatus(400).code('nenhum paramentro foi enviado');
        };

        try {
            await ProductModel.findByIdAndDelete(id, () => {
                res.json({msg: 'deletado com sucesso'});
            });
        }catch(erro) {
            res.json({code: erro, msg: 'algo deu errado'});
        };
    }
}

module.exports = new ProductController;