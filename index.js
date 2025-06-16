import { PrismaClient } from "@prisma/client";
import express from "express";
import { validateId, validatePost, validateUser } from "./middleware.js";
const app = express();
const port = process.env.port || 3000;
const prisma = new PrismaClient();
app.use(express.json());
// asyncHandler
function asyncHandler(func) {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (err) {
      // res.send("something went wrong");
      next(err);
    }
  };
}

app.get("/", (req, res) => {
  res.send("<h1>i am ready test me out \n you will be suprised</h1>");
});
app
  .route("/users")
  .get(
    asyncHandler(async (_req, res) => {
      const users = await prisma.users.findMany();
      res.status(200).json(users);
    }),
  )
  .post(
    validateUser,
    asyncHandler(async (req, res) => {
      const { emailAddress, username } = req.body;

      const exist = await prisma.users.findFirst({
        where: { OR: [{ username: username }, { emailAddress: emailAddress }] },
      });
      if (exist)
        req
          .status(400)
          .json({ messsage: "the username or email already exists" });
      else {
        const user = await prisma.users.create({ data: req.body });
        res.status(201).json(user);
      }
    }),
  );
app.get(
  "/users/:id",
  validateId,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await prisma.users.findUnique({ where: { id } });
    res.status(200).json(user);
  }),
);

/// posts end point
app
  .route("/posts")
  .get(
    asyncHandler(async (req, res) => {
      const posts = await prisma.posts.findMany({
        where: {
          isDeleted: false,
        },
      });
      res.status(200).json(posts);
    }),
  )
  .post(
    validatePost,
    asyncHandler(async (req, res) => {
      const post = await prisma.posts.create({ data: req.body });
      res.status(200).json(post);
    }),
  );

app
  .route("/posts/:id")
  .get(
    validateId,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const posts = await prisma.posts.findUnique({
        where: { id, AND: { isDeleted: false } },
      });
      if (!posts == null)
        return res.status(200).json({ err: "seems object was deleted" });
      res.status(200).json(posts);
    }),
  )
  .put(
    validateId,
    validatePost,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const post = await prisma.posts.update({ where: { id }, data: req.body });
      res.status(200).json(post);
    }),
  )
  .delete(
    validateId,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const post = await prisma.posts.update({
        where: { id },
        data: { isDeleted: true },
      });
      res.status(200).json(post);
    }),
  );

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).send("something went wrong");
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
