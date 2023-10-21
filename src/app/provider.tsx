"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
