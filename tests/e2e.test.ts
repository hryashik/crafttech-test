import app from "../src/main";
import request from "supertest";

describe("/Tasks", () => {
  describe("/tasks @GET", () => {
    it("Should return 200", async () => {
      const res = await request(app).get("/tasks");
      expect(res.statusCode).toBe(200);
    });
  });
});

beforeAll(() => {
  app.close();
})