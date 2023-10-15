import yup from "yup";
import handleErrors from "../../_helpers/handle-error";
import { Response, Request } from "express";
const controllersApiLuckyDrawUpdate = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const createSchema = yup.object({
      phoneNumber: yup.string().required(),
      redeemCode: yup.string().required(),
    });
    const verifiedData = await createSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
    
  } catch (err) {
    return handleErrors(res, err);
  }
};

export default controllersApiLuckyDrawUpdate;
