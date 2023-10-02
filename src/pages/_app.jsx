import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from 'next/head';

import "../styles/index.css";

import "../styles/home/Home.css";
import "../styles/home/HomeButtonsAndForms.css"
import "../styles/home/MonthlyExpenses.css"

import "../styles/debt/DebtItem.css";
import "../styles/debt/DebtChart.css";
import "../styles/debt/Debt.css";

import "../styles/Group.css";
import React, { useState } from "react";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
