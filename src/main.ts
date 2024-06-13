import express from "express";
import { config } from "dotenv";

config();

const app = express();


const port = process.env.APP_PORT;

const server = app.listen(port, () => console.log(`App starting on ${port} port`));

export default server;