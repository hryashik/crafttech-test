import Joi from "joi";
import express from "express";

const schema = Joi.object().keys({
  title: Joi.string().required().min(3),
  description: Joi.string(),
  status: Joi.custom(value => {
    if (value == "in_process" || value == "completed") {
      return value;
    } else {
      throw new Error();
    }
  }),
});

export async function validateCreateTask(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const dto = req.body;
    await schema.validateAsync(dto);
    next();
  } catch (e) {
    if (e instanceof Joi.ValidationError) {
      res.status(400).send({ err: e.message });
    }
  }
}
