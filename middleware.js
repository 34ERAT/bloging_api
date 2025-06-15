export function validateId(req, res, next) {
  if (!req.params.id) return req.status(400).json({ error: "id is required" });
  next();
}
export function validateUser(req, res, next) {
  const { firstName, lastName, emailAddress, username } = req.body;
  const user = {
    firstName,
    lastName,
    emailAddress,
    username,
  };
  for (let key in user) {
    if (user[key] == undefined)
      return res.statu(400).json({ error: `${key} is required` });
  }
  next();
}

export function validatePost(req, res, next) {
  const { title, content, usersId } = req.body;
  const post = { title, content, usersId };
  for (let key in post) {
    if ((post[key] = undefined))
      return res.statu(400).json({ error: `${key} is required` });
  }
  next();
}
