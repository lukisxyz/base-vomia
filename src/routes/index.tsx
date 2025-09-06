import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "@coinbase/onchainkit/wallet";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <Wallet />
    </main>
  );
}
