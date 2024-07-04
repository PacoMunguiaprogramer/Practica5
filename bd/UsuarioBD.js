const ConectarBD = require("./ConexionBD");

class UsuarioBD extends ConectarBD{
    constructor(){
        super();
    }
    async nuevoUsuario(usuario){
        const sql="INSERT INTO usuario VALUES(null,'"+usuario.nombre+"','"+usuario.celular+"','"+usuario.correo+"');";
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
    async mostarUsuarios(){
        const sql="SELECT * FROM usuario";
        var usuarioBD;
        try{
          await this.conctarMySql();
         [usuarioBD]= await this.conexion.execute(sql);
         await this.cerrarConexion();
         console.log("Usuarios recuperados");
         //console.log(usuarioBD);
         return usuarioBD;
       }
        catch (error){
         console.error("Error al recuperar los datos"+error);
         console.error(sql);
        }
    }

    async buscarUsuarioPorId(idUsuario){
        const sql="SELECT * FROM usuario where idusuario="+idUsuario;
        try {
            await this.conctarMySql();
            const usuario=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Usuario seleccionado correctamente");
            return usuario;
        } catch (error) {
            console.error("Error al recuperar el usuario");
            console.error(sql);
        }
    }
    async editarUsario(usuario){
        const sql2=`
        UPDATE usuario SET
        nombre='${usuario.nombre}',
        celular='${usuario.celular}',
        correo='${usuario.correo}'
        WHERE idusuario=${usuario.idusuario}
        `;
        try {
            await this.conctarMySql();
            await this.conexion.execute(sql2);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al editar usuario"+error);
            console.error(sql2);
        }
    }
    async borrarUsuario(idUsuario){
        const sql="DELETE FROM usuario WHERE idusuario="+idUsuario;
        try {
            await this.conctarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al borrar el usuario"+error);
            console.error(sql);
        }
    }
}

module.exports=UsuarioBD;