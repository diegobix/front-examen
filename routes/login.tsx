import { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import LoginForm from "../components/LoginForm.tsx";
import { State } from "../types.ts";
// @deno-types="npm:@types/jsonwebtoken"
import jwt from "npm:jsonwebtoken";

export const config: RouteConfig = {
  skipInheritedLayouts: true,
};

type Data = {
  showError?: boolean;
};

type ApiRes = {
  email: string;
  name: string;
  id: string;
};

export const handler: Handlers<Data, State> = {
  POST: async (req, ctx) => {
    const form = await req.formData();
    const email = form.get("email");
    const password = form.get("password");

    if (!email || !password) {
      return ctx.render({ showError: true });
    }

    const secret = Deno.env.get("SCRT");
    if (!secret) {
      throw new Error("No jwt secret provided");
    }

    const url = new URL(req.url);

    const res = await fetch("https://videoapp-api.deno.dev/checkuser", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "content-type": "application/json" },
    });
    if (!res.ok) {
      return ctx.render({ showError: true });
    }

    const data = await res.json() as ApiRes;
    const headers = new Headers();
    headers.set("location", "/");

    const token = jwt.sign(data, secret, {
      expiresIn: "24h",
    });

    setCookie(headers, {
      name: "auth",
      value: token,
      domain: url.hostname,
      path: "/",
      sameSite: "Lax",
      secure: true,
    });

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default (props: PageProps<Data, State>) => {
  const showError = props.data?.showError || false;
  return <LoginForm showError={showError} />;
};
