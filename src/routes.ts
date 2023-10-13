import { Router, Request, Response } from "express";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.send("HOT RELOAD DqqES");
});

router.get("/test", async (req: Request, res: Response) => {
  res.send("test");
});

router.post(
  "/lucky_draw",
  (await import("./controllers/api/lucky_draw/create.ts")).default
);

router.get(
  "/users/:id",
  (await import("./controllers/api/users/show.ts")).default
);

router.get(
  "/lucky_draw",
  (await import("./controllers/api/lucky_draw/create.ts")).default
);

export default router;
// router.post('/api/wishlists', (await import('./controllers/api/wishlists/create.js')).default)
