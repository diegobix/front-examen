import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
// @deno-types="npm:@types/jsonwebtoken"
import jwt from "npm:jsonwebtoken";
import { State } from "../types.ts";

export async function handler(req: Request, ctx: FreshContext<State>) {
  if (
    ctx.destination !== "route" || ctx.route === "/login" ||
    ctx.route === "/register"
  ) {
    return await ctx.next();
  }

  const secret = Deno.env.get("SCRT");
  if (!secret) {
    throw new Error("No jwt secret provided");
  }

  const auth = getCookies(req.headers).auth;
  if (!auth) {
    return new Response(null, {
      status: 307,
      headers: { "location": "/login" },
    });
  }

  try {
    const { name, email, id } = jwt.verify(auth, secret) as State;
    if (!name || !email || !id) {
      return new Response(null, {
        status: 307,
        headers: { "location": "/login" },
      });
    }
    ctx.state = { name, email, id };
    return await ctx.next();
  } catch (_e) {
    return new Response(null, {
      status: 307,
      headers: { "location": "/login" },
    });
  }
}
