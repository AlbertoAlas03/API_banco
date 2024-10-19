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

    const data = new datausuario({
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


exports.modifyUsuario = async(req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Espera recibir el nuevo estado en el cuerpo de la solicitud

    try {
        // Actualiza el estado del usuario en la base de datos
        const usuarioActualizado = await datausuario.findByIdAndUpdate(
            id,
            { Status: status }, // Cambia el campo `Status` con el valor recibido
            { new: true } // Devuelve el documento actualizado
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(usuarioActualizado); // Devuelve el documento actualizado
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado', error });
    }
}


exports.listusuarioByStatus = async(req, res) => {

    try {
        const usuariosEncontrados = await datausuario.find({ Status: false });

        if (usuariosEncontrados.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios con el estado false' });
        }

        res.json(usuariosEncontrados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
        
}

