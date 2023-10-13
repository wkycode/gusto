import yup from "yup";
import { Request, Response } from "express";
import prisma from "../../_helpers/prisma.js";

const createSchema = yup.object({
  phone: yup.string().required(),
});

const controllersApiUsersCreate = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const verifiedData = await createSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
    console.log(verifiedData);
    const newUser = await prisma.user.create({ data: verifiedData });
    return res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default controllersApiUsersCreate;
