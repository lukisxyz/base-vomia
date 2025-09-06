"use client";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { baseSepolia } from "viem/chains";
import { WagmiProvider } from "wagmi";
import { useWagmiConfig } from "@/lib/wagmi.lib";

type Props = { children: ReactNode };

const queryClient = new QueryClient();

function OnchainProviders({ children }: Props) {
  const wagmiConfig = useWagmiConfig();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={import.meta.env.VITE_BASE_CLIENT_API_KEY}
          chain={baseSepolia}
          config={{
            appearance: {
              mode: "light",
              theme: "base",
            },
            wallet: {
              display: "modal",
              supportedWallets: {
                rabby: true,
              },
            },
          }}
        >
          <RainbowKitProvider modalSize="compact">
            {children}
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
