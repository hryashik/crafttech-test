import app from "../src/main";
import request from "supertest";

let taskId: number;

describe("Tasks", () => {
  describe("/tasks @POST", () => {
    describe("Incorrect data", () => {
      it("Should return 400", async () => {
        const res1 = await request(app)
          .post("/tasks")
          .send({ description: "asd" });
        const res2 = await request(app)
          .post("/tasks")
          .send({ description: "asd", status: "in_process" });
        const res3 = await request(app).post("/tasks").send({ title: "as" });
        expect(res1.statusCode).toBe(400);
        expect(res2.statusCode).toBe(400);
        expect(res3.statusCode).toBe(400);
      });
    });
    describe("Correct data", () => {
      it("Should return 201", async () => {
        const res = await request(app)
          .post("/tasks")
          .send({ title: "first task", description: "some" });

        taskId = res.body.id;
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
      });
    });
  });
  describe("/tasks @GET", () => {
    describe("Correct", () => {
      it("Should return 200", async () => {
        const res = await request(app).get("/tasks");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
      });
    });
  });
  describe("/tasks/:id @GET", () => {
    describe("Incorrect id", () => {
      it("Should return 400", async () => {
        const res = await request(app).get("/tasks/asda");
        expect(res.statusCode).toBe(400);
      });
    });
    describe("Id not found", () => {
      it("Should return 404", async () => {
        const res = await request(app).get("/tasks/999");
        expect(res.statusCode).toBe(404);
      });
    });
    describe("correct id", () => {
      it("Should return 200", async () => {
        const res = await request(app).get(`/tasks/${taskId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(taskId);
      });
    });
  });
  describe("/tasks/:id @PUT", () => {
    describe("Incorrect id", () => {
      it("Should return 400", async () => {
        const res = await request(app)
          .put("/tasks/asda")
          .send({ title: "updated task" });
        expect(res.statusCode).toBe(400);
      });
    });
    describe("Id not found", () => {
      it("Should return 404", async () => {
        const res = await request(app)
          .put("/tasks/999")
          .send({ title: "updated task" });
        expect(res.statusCode).toBe(404);
      });
    });
    describe("correct id", () => {
      it("Should return 200", async () => {
        const res = await request(app)
          .put(`/tasks/${taskId}`)
          .send({
            title: "updated task",
            description: "some description",
            status: "completed",
          });
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(taskId);
      });
    });
  });
  describe("/tasks/:id @DELETE", () => {
    describe("Incorrect id", () => {
      it("Should return 400", async () => {
        const res = await request(app).delete("/tasks/asda");
        expect(res.statusCode).toBe(400);
      });
    });
    describe("Id not found", () => {
      it("Should return 404", async () => {
        const res = await request(app).delete("/tasks/999");
        expect(res.statusCode).toBe(404);
      });
    });
    describe("correct id", () => {
      it("Should return 204", async () => {
        const res = await request(app).delete(`/tasks/${taskId}`);
        expect(res.statusCode).toBe(204);
      });
    });
  });
});

afterAll(() => {
  app.close();
});
