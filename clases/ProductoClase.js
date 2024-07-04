class Producto{
    constructor(producto){
        this.id=producto.idproducto,
        this.nombre=producto.nombre,
        this.descripcion=producto.descripcion,
        this.precio=producto.precio
    }
    set id (id){
        this._id=id;
    }
    set nombre(nombre){
            this._nombre=nombre;
    }
    set descripcion(descripcion){
            this._descripcion=descripcion;
    }
    set precio(precio){
            this._precio=precio;
    }
    get id(){
        return this._id;
    }
    get nombre(){
        return this._nombre;
    }
    get descripcion(){
        return this._descripcion;
    }
    get precio(){
        return this._precio;
    }
    get obtenerDatos(){
        return{
           idproducto:this.id,
           nombre:this.nombre,
           descr_prod:this.descripcion,
           precio_prod:this.precio
        }
    }
}
module.exports=Producto;