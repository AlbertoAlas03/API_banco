const dataIngresos = require('../models/Ingresos');
const dataEgresos = require('../models/Egresos');
const datausuario = require('../models/usuario');

//CRUD para ingresos

exports.listingreso = async (req, res) => {
    try {
        const data = await dataIngresos.find({});
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(200).send(error);
        next();
    }
};

exports.addingreso = async (req, res) => {
    const { Tipo_ingreso, Monto } = req.body;

    const data = new dataIngresos({
        Tipo_ingreso: Tipo_ingreso || ("Sin definir"),
        Monto: Monto || 0
    })

    try {
        await data.save();
        res.json({ message: "Added new message", data: data });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.deleteingreso = async (req, res, next) => {
    try {
        const data = await dataIngresos.findOneAndDelete(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        );
        if (!data) {
            return res.status(400).json({ message: "Ingreso no encontrado" })
        }
        res.json({ message: "Ingreso eliminado", data: data });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" });
        next(error);
    }

};

//CRUD para egresos

exports.listegreso = async (req, res) => {
    try {
        const data = await dataEgresos.find({});
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(200).send(error);
        next();
    }
};

exports.addegreso = async (req, res) => {
    const { Tipo_egreso, Monto } = req.body;

    const data = new dataEgresos({
        Tipo_egreso: Tipo_egreso || ("Sin definir"),
        Monto: Monto || 0
    })

    try {
        await data.save();
        res.json({ message: "Added new message", data: data });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.deleteegreso = async (req, res, next) => {
    try {
        const data = await dataEgresos.findOneAndDelete(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        );
        if (!data) {
            return res.status(400).json({ message: "Egreso no encontrado" })
        }
        res.json({ message: "Egreso eliminado", data: data });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" });
        next(error);
    }

};

//CRUD para usuario

exports.listusuario = async (req, res) => {
    try {
        const data = await datausuario.find({});
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(200).send(error);
        next();
    }
};


exports.addusuario = async (req, res) => {
    const { Nombre_producto, Foto_carnet, Foto_rostro, Direccion, Telefono, Status } = req.body;

    const data = new dataIngresos({
        Nombre_producto: Nombre_producto || ("sin definir"),
        Nombre_usuario: ("Juan"),
        Foto_carnet: Foto_carnet || ("sin definir"),
        Foto_rostro: Foto_rostro || ("sin definir"),
        Direccion: Direccion || ("sin definir"),
        Telefono: Telefono || ("sin definir"),
        Status: Status || false
    })

    try {
        await data.save();
        res.json({ message: "Added new message", data: data });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

