"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  Box,
  CssBaseline,
  Toolbar,
} from "@mui/material";
import NavigationBar from "./_component/navigationbar";
import SideBar from "./_component/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <NavigationBar />
            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar />
              {children}
            </Box>
          </Box>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}