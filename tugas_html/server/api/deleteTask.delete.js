import { db } from "../db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  await db.query("DELETE FROM tasks WHERE id = ?", [query.id]);

  return { success: true };
});