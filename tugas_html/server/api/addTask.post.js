import { db } from "../db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const [result] = await db.query(
    "INSERT INTO tasks (title, description) VALUES (?, ?)",
    [body.title, body.description]
  );

  return { success: true, id: result.insertId };
});
