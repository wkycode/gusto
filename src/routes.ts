import { Router, Request, Response } from "express";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.send("Root");
});

router.post(
  "/lucky_draw",
  (await import("./controllers/api/lucky_draw/create.ts")).default
);

router.post(
  "/lucky_draw/redeem",
  (await import("./controllers/api/lucky_draw/update.ts")).default
);

export default router;
