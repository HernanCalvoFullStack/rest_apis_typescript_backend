import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

// Routing
router.get("/", getProducts)
router.get("/:id", 
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    getProductById
)

router.post("/", 
    // VALIDACIÓN
    body("name")
        .notEmpty().withMessage("El Nombre del Producto es Obligatorio"),
    
    body("price")
        .isNumeric().withMessage("El Precio del Producto no es Válido")
        .notEmpty().withMessage("El Precio del Producto es Obligatorio")
        .custom(value => value > 0).withMessage("El Precio no puede ser Negativo"),
    handleInputErrors,
    createProduct
)

router.put("/:id", 
    param("id").isInt().withMessage("ID no válido"),
    body("name")
        .notEmpty().withMessage("El Nombre del Producto es Obligatorio"),
    
    body("price")
        .isNumeric().withMessage("El Precio del Producto no es Válido")
        .notEmpty().withMessage("El Precio del Producto es Obligatorio")
        .custom(value => value > 0).withMessage("Precio no válido"),
    
    body("availability")
        .isBoolean().withMessage("Valor para la disponibilidad no válido"),
    handleInputErrors,
    updateProduct
)

router.patch("/:id", 
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    updateAvailability
)

router.delete("/:id", 
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    deleteProduct
)

export default router