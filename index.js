const express = require("express");
const path = require ("path");
const usuariosRutas = require("./routes/UsuariosRutas")
const app = express();
app.set("view engine","ejs");
app.use("/",express.static(path.join(__dirname,"/web")));
app.use(express.urlencoded({extended:true}));
app.use("/", usuariosRutas);

const port=process.env.port || 3000;
app.listen(port, ()=>{
    console.log("Sitio en http://localhost:"+port);
});