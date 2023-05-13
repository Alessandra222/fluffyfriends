import { Router } from "express";
import Mascota from "../models/Mascota";
import multer from 'multer';

const router = Router();
const almacenamiento = multer.memoryStorage();
const upload = multer({ storage: almacenamiento });

router.get("/", async (req, res) => {
  const todomascotas = await Mascota.find().lean();
  todomascotas.forEach(mascota => {
  mascota.imagen = mascota.imagen.toString('base64');
  });
  res.render("index", { mascotas: todomascotas });
  });

router.get("/registrar", async (req, res) => {
  res.render("insertar");
});

router.post("/registrar", upload.single('imagen'), async (req, res) => {
  const mascota = await new Mascota();
  const nuevoid = Math.floor(Math.random() * 10000000000000000);
  mascota.idmascota = nuevoid;
  mascota.especie = req.body.especie;
  mascota.nombre = req.body.nombre;
  let datoraza = "";
  if (req.body.raza == "") {
    datoraza = "Desconocida";
  } else {
    datoraza = req.body.raza;
  }
  mascota.raza = datoraza;
  mascota.edad = req.body.edad;
  mascota.dueno = req.body.dueno;

  let direccion = "";
  if (req.body.direccion == "") {
    direccion = "No Especificada";
  } else {
    direccion = req.body.direccion;
  }
  
  mascota.direccion = direccion;

  if(!req.file){
    res.redirect("/registrar");
  }else{
    mascota.imagen = req.file.buffer;
  }
  await mascota.save();

  res.redirect("/");
});

router.get("/actualizar/:idmascota", async(req, res) => {
  const idmascota = req.params.idmascota.replace(":","");
  const datomascota = await Mascota.findOne({"idmascota": idmascota}).lean();
  res.render("actualizar", {mascota: datomascota});
});

router.post("/actualizar/:idmascota", upload.single('imagen'),async(req,res) =>{
  const newidmascota = req.params.idmascota;
  const newespecie = req.body.especie;
  const newnombre = req.body.nombre;
  const newraza = req.body.raza;
  const newedad = req.body.edad;
  const newdueno = req.body.dueno;
  const newdireccion = req.body.direccion;
  
  if(!req.file){
    await Mascota.updateOne({"idmascota": newidmascota},{
      $set: {
        "especie": newespecie,
        "nombre": newnombre,
        "raza": newraza,
        "edad": newedad,
        "dueno": newdueno,
        "direccion": newdireccion,
      }
    });
  }else{
    const newimagen = req.file.buffer;
    await Mascota.updateOne({"idmascota": newidmascota},{
      $set: {
        "especie": newespecie,
        "nombre": newnombre,
        "raza": newraza,
        "edad": newedad,
        "dueno": newdueno,
        "direccion": newdireccion,
        "imagen": newimagen,
      }
    });
  }

  res.redirect("/");
});

router.get("/eliminar/:idmascota", async(req, res) => {
   await Mascota.findOneAndDelete({"idmascota": req.params.idmascota});
   console.log("hola" + req.params.idmascota);
  res.redirect("/");
});

export default router;
