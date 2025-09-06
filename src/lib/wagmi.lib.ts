"use client";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  rabbyWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { useMemo } from "react";
import { createPublicClient } from "viem";
import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

export function useWagmiConfig() {
  const projectId = import.meta.env.VITE_WALLET_CONNECT_ID ?? "";
  if (!projectId) {
    const providerErrMessage =
      "To connect to all Wallets you need to provide a Wallet Connect ID env variable";
    throw new Error(providerErrMessage);
  }

  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        {
          groupName: "Recommended Wallet",
          wallets: [coinbaseWallet],
        },
        {
          groupName: "Other Wallets",
          wallets: [rabbyWallet, metaMaskWallet],
        },
      ],
      {
        appName: "onchainkit",
        projectId,
      },
    );

    const wagmiConfig = createConfig({
      chains: [baseSepolia],
      multiInjectedProviderDiscovery: false,
      connectors,
      ssr: true,
      transports: {
        [baseSepolia.id]: http(),
      },
    });

    return wagmiConfig;
  }, [projectId]);
}
