import jwt from "jsonwebtoken";
import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

export async function protect(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database
      const user = await knex("users").where({ id: decoded.id }).first();

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user; // Attach user to request object
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
}
