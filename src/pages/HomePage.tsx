import React from "react";
import { Box } from "@mui/material";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomePage from "@/components/home/HomePage";

export default function Home() {
  return (
    <Box>
      <Header />
      <HomePage />
      <Footer />
    </Box>
  );
}
