const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it("Obteniendo un 200 y Obteniendo cafes en un arreglo", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        expect(status).toBe(200);
        const cafes = response.body;
        expect(cafes).toBeInstanceOf(Array);
    });

    it("Eliminando un cafe que no existe", async () => {
        const jwt = "token";
        const idDeCafeAEliminar = "este id no existe"
        const { statusCode } = await request(server)
            .delete(`/cafes/${idDeCafeAEliminar}`)
            .set("Authorization", jwt)
            .send();
        expect(statusCode).toBe(404)  
    });

    it("Agregando un nuevo cafe", async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = { id, nombre: "Nuevo cafe" };
        const { statusCode } = await request(server)
            .post("/cafes")
            .send(cafe);
        expect(statusCode).toBe(201)
    });

    it("Editando un cafe diferente a payload", async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = {id ,nombre:"nuevo cafe"}
        const { statusCode } = await request(server)
            .put(`/cafes/1`)
            .send(cafe);
        expect(statusCode).toBe(400);
    });

});
