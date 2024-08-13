import { connectDB } from "../server"
import db from "../config/db"


// Creamo un Mock
jest.mock("../config/db")

describe("connectDB", () => {
    it("should handle database connection error", async () => {
        jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("Hubo un error en la conexión a la BBDD"))

        const consoleSpy = jest.spyOn(console, "log")

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Hubo un error en la conexión a la BBDD")
        )
    })
})

