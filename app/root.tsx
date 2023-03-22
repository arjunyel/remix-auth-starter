import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp, ClerkCatchBoundary } from "@clerk/remix";
import styles from "~/styles/shared.css";
import Header from "~/components/Header";
import { getClerkDebugHeaders } from "@clerk/remix/ssr.server";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export function headers({
  actionHeaders,
  loaderHeaders,
  parentHeaders,
}: {
  actionHeaders: Headers;
  loaderHeaders: Headers;
  parentHeaders: Headers;
}) {
  return {
    ...getClerkDebugHeaders(loaderHeaders),
  };
}

export function links() {
  return [
    { rel: "stylesheet", href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css" },
    { rel: "stylesheet", href: styles },
  ];
}

export const loader: LoaderFunction = (args) => {
  return rootAuthLoader(
    args,
    ({ request }) => {
      const { userId, sessionId, getToken } = request.auth;
      console.log("Root loader auth:", { userId, sessionId, getToken });
      return { message: `Hello from the root loader :)` };
    },
    { loadUser: true }
  );
};

function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default ClerkApp(App);

export const CatchBoundary = ClerkCatchBoundary();
