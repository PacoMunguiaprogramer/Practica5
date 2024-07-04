const ConectarBD = require("./ConexionBD");

class ProductoBD extends ConectarBD{
    constructor(){
        super();
    }
    async nuevoProducto(producto){
        const sql="INSERT INTO productos VALUES(null,'"+producto.nombre+"','"+producto.descr_prod+"','"+producto.precio_prod+"');";
        try {
            await this.conctarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Dato insertado a MySql");
        } catch (error) {
            console.error("Error al ingresar el dato "+error);
            console.error(sql);
        }
    }
    async mostarProductos(){
        const sql="SELECT * FROM productos";
        var productoBD;
        try{
          await this.conctarMySql();
         [productoBD]= await this.conexion.execute(sql);
         await this.cerrarConexion();
         console.log("Productos recuperados");
         //console.log(usuarioBD);
         return productoBD;
       }
        catch (error){
         console.error("Error al recuperar los datos"+error);
         console.error(sql);
        }
    }

    async buscarProductosPorId(idproducto){
        const sql="SELECT * FROM productos where idproducto="+idproducto;
        try {
            await this.conctarMySql();
            const usuario=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Producto seleccionado correctamente");
            return usuario;
        } catch (error) {
            console.error("Error al recuperar el producto");
            console.error(sql);
        }
    }
    async editarProductos(producto){
        const sql2=`
        UPDATE productos SET
        nombre='${producto.nombre}',
        descripcion='${producto.descripcion}',
        precio='${producto.precio}'
        WHERE idproducto=${producto.idproducto}
        `;
        try {
            await this.conctarMySql();
            await this.conexion.execute(sql2);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al editar producto"+error);
            console.error(sql2);
        }
    }
    async borrarProducto(idproducto){
        const sql="DELETE FROM productos WHERE idproducto="+idproducto;
        try {
            await this.conctarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al borrar el producto"+error);
            console.error(sql);
        }
    }
}

module.exports=ProductoBD;