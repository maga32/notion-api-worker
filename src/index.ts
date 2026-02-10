import { Hono } from "hono";

import { notionWhitelist } from "./utils/notionWhitelist.js";
import { pageRoute } from "./routes/notion-page.js";
import { tableRoute } from "./routes/table.js";
/*
import { userRoute } from "./routes/user.js";
import { searchRoute } from "./routes/search.js";
const app = new Hono().basePath("/v1");

app.get("/page/:pageId", pageRoute);
app.get("/table/:pageId", tableRoute);
app.get("/user/:userId", userRoute);
app.get("/search", searchRoute);
*/

const app = new Hono();

app.get("/util/notion", notionWhitelist, async (c) => {
  const pageId = (c as any).get("pageId") as string;
  c.req.param = (() => pageId) as unknown as typeof c.req.param;
  return tableRoute(c);
});

export default app;
