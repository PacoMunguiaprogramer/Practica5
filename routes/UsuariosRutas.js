const ruta = require("express").Router();
const UsuarioClase = require("../clases/UsuarioClase");
const UsuarioBD = require("../bd/UsuarioBD");
const ProductoClase = require("../clases/ProductoClase");
const ProductoBD = require("../bd/ProductoBD");

ruta.get("/",async(req,res)=>{
    const usuariobd = new UsuarioBD();
    var usuarios= await usuariobd.mostarUsuarios();
    var usuariosCorrectos=[];
    usuarios.forEach(usuario => {
        const usuario1 = new UsuarioClase(usuario);
        if(usuario1.nombre !=undefined && usuario1.celular !=undefined && usuario1.correo != undefined){
              usuariosCorrectos.push(usuario1.obtenerDatos);
        }
    })
    res.render("mostrarUsuarios",{usuariosCorrectos});
});

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formulario")
});

ruta.post("/agregarUsuario",(req,res)=>{
    console.log(req.body);
    const usuario1 = new UsuarioClase(req.body);
    if(usuario1.nombre !=undefined && usuario1.celular !=undefined && usuario1.correo != undefined){
        const usuariobd = new UsuarioBD();
        usuariobd.nuevoUsuario(usuario1.obtenerDatos);
        res.render("mostrarDatos",usuario1.obtenerDatos);
    }
    else{
        res.render("error");
    }
});
ruta.get("/editarUsuario/:idusuario",async (req,res)=>{
    const usuariobd = new UsuarioBD();
    const [[usuario]]= await usuariobd.buscarUsuarioPorId(req.params.idusuario);
    res.render("editarUsuario",usuario);
});

ruta.post("/editarUsuario",async(req,res)=>{
    const usuariobd = new UsuarioBD();
    const usuario1 = new UsuarioClase(req.body)
    if(usuario1.nombre !=undefined && usuario1.celular !=undefined && usuario1.correo != undefined){
        await usuariobd.editarUsario(req.body);
        res.redirect("/");
    }
    else{
        res.render("error")
    }

});

ruta.get("/borrarUsuario/:idusuario",async(req,res)=>{
    const usuariobd = new UsuarioBD();
    await usuariobd.borrarUsuario(req.params.idusuario);
    res.redirect("/")
});

ruta.get("/MostarProducto",async(req,res)=>{
    const productobd = new ProductoBD();
    var productos= await productobd.mostarProductos();
    var productosCorrecto=[];
    productos.forEach(producto => {
        const producto1 = new ProductoClase(producto);
              productosCorrecto.push(producto1.obtenerDatos);
    })
    res.render("mostrarProductos",{productosCorrecto});
});

ruta.get("/agregarProducto",(req,res)=>{
    res.render("formularioProducto")
});

ruta.post("/agregarProducto",(req,res)=>{
    console.log(req.body);
    const producto1 = new ProductoClase(req.body);
        const productobd = new ProductoBD();
        productobd.nuevoProducto(producto1.obtenerDatos);
        res.render("mostrarDatosP",producto1.obtenerDatos);
});
ruta.get("/editarProducto/:idproducto",async (req,res)=>{
    const productobd = new ProductoBD();
    const [[producto]]= await productobd.buscarProductosPorId(req.params.idproducto);
    res.render("editarProducto",producto);
});

ruta.post("/editarProducto",async(req,res)=>{
    const productobd = new ProductoBD();
    const producto1 = new ProductoClase(req.body)
    if(producto1.nombre !=undefined && producto1.descripcion !=undefined && producto1.precio != undefined){
        await productobd.editarProductos(req.body);
        res.redirect("/MostarProducto");
    }
    else{
        res.render("error")
    }

});

ruta.get("/borrarProducto/:idproducto",async(req,res)=>{
    const productobd = new ProductoBD();
    await productobd.borrarProducto(req.params.idproducto);
    res.redirect("/MostarProducto")
});
module.exports=ruta; 