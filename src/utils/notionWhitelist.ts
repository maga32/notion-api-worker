import type { MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";

const ALLOWED_ORIGIN = "https://maga32.notion.site";

export const notionWhitelist: MiddlewareHandler = async (c, next) => {
  const rawUrl = c.req.query("url");

  if (!rawUrl) {
    throw new HTTPException(400, { message: "Missing url" });
  }

  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new HTTPException(400, { message: "Invalid url" });
  }

  if (parsed.origin !== ALLOWED_ORIGIN) {
    throw new HTTPException(403, { message: "Forbidden domain" });
  }

  // pageId
  const pageId = parsed.pathname.replace("/", "");
  if (!pageId) {
    throw new HTTPException(400, { message: "Invalid pageId" });
  }

  // context에 주입
  c.set("pageId", pageId);

  await next();
};
