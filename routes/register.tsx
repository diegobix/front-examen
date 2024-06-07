import { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import RegisterForm from "../components/RegisterForm.tsx";
// @deno-types="npm:@types/jsonwebtoken"
import jwt from "npm:jsonwebtoken";
import { State } from "../types.ts";

export const config: RouteConfig = {
  skipInheritedLayouts: true,
};

type ApiRes = {
  email: string;
  name: string;
  id: string;
};

type Data = {
  showError?: boolean;
};

export const handler: Handlers<Data, State> = {
  POST: async (req, ctx) => {
    const form = await req.formData();
    const email = form.get("email");
    const password = form.get("password");
    const name = form.get("name");

    if (!email || !password || !name) {
      return ctx.render();
    }

    const secret = Deno.env.get("SCRT");
    if (!secret) {
      throw new Error("No jwt secret provided");
    }

    const url = new URL(req.url);

    const res = await fetch("https://videoapp-api.deno.dev/register", {
      method: "post",
      body: JSON.stringify({ email, password, name }),
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
  return <RegisterForm showError={showError} />;
};
