"use client";

import { Switch } from "@/components/ui/switch";
import { PageState } from "./login/page";
import { useTheme } from "next-themes";
import React from "react";

type HeaderProps = {
  pageState: PageState;
  setPageState: React.Dispatch<React.SetStateAction<PageState>>;
};

export default function Header({ pageState, setPageState }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  const [themeState, setThemeState] = React.useState<boolean>();

  React.useEffect(() => {
    if (theme === "dark" || theme === "system") {
      setThemeState(true);
    } else {
      setThemeState(false);
    }
  }, [theme]);

  return (
    <header className="flex gap-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="airplane-mode" className="text-white font-medium">
          Dark mode
        </label>
        <Switch
          checked={themeState}
          onCheckedChange={(checked) => {
            setTheme(checked ? "dark" : "light");
            setThemeState(checked);
          }}
          id="theme-changer"
        />
      </div>
      <button
        onClick={() => setPageState("Login")}
        className="mr-2  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bg-[#1e1e1e]"
      >
        Sign in
      </button>
      <button
        onClick={() => setPageState("SignUp")}
        className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign up
      </button>
    </header>
  );
}
