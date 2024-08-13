import express from "express";
import colors from "colors";
import cors, { CorsOptions} from "cors"
import morgan from "morgan"
/* import swaggerUi from "swagger-ui-express"; 
import swaggerSpec from "./config/swagger"; */
import router from "./router";
import db from "./config/db";

// Conexión a la BBDD
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log( colors.blue("Conexión exitosa"))
    } catch(error) {
        console.log(error)
        console.log( colors.red.bold("Hubo un error en la conexión a la BBDD"))
    }
}
connectDB()

// Instancia de Express
const server = express()

// Permitir conexiones (CORS)
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error("Error de CORS"))
        }
    }
}
server.use(cors(corsOptions))

// Leer datos de los formularios
server.use(express.json())

server.use(morgan("dev"))

server.use("/api/products", router)

// Docs
/* server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)) */


export default server