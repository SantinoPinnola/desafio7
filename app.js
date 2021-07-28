
import fs from 'fs/promises';
import express from 'express';



function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
const app = express();


const puerto = 8080;

let visita1 = 0;
let visita2 = 0;


let arrayLength = 0;
let arrayProductos = [];

let obj = {
    items : undefined,
    cantidad : undefined
}

fs.readFile('./productos.txt', 'utf-8')
    .then((data) => {
        obj.items = arrayProductos = JSON.parse(data);
        obj.cantidad = arrayLength = arrayProductos.length;
    });
const server = app.listen(puerto,() => {
    console.log('server levantado en el puerto 3000')
})

server.on('error', error => console.log(`Error en el servidor: ${error}`));

/** 1) Ruta get '/items' que responda un objeto con todos los productos y su cantidad total en
el siguiente formato: { items: [productos], cantidad: (cantidad productos) }
 */



app.get('/items', function(request,response) {
    visita1++;
    response.send(obj);
})

/** Ruta get '/item-random' que devuelva un producto elegido al azar desde un array de
productos que se encuentran en el archivo 'productos.txt'. El formato de respuesta
será: { item: {producto} }
 */

app.get('/item-random', function(request,response) {
    visita2++;
    let num = randomNum(0,obj.cantidad)
    response.send(obj.items[num]);
})

/** La ruta get '/visitas' devuelve un objeto que indica cuantas veces se visitó la ruta del
punto 1 y cuantas la ruta del punto 2. Contestar con el formato: { visitas : { items: cantidad, item: cantidad } }
 */

let visitasTotales = {
    visitas1 : undefined,
    visitas2 : undefined
}
app.get('/visitas', function(request,response) {
    visitasTotales.visitas1 = visita1;
    visitasTotales.visitas2 = visita2;
    response.send(visitasTotales);
})
