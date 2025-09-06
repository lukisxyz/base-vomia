import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@coinbase/onchainkit/styles.css";
import OnchainProviders from "@/providers/web3.provider";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OnchainProviders>
      <RouterProvider router={router} />
    </OnchainProviders>
  </StrictMode>,
);
