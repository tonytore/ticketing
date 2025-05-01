import React from "react";
import { Box } from "@mui/material";

import TicketPurchaseFlow from "@/components/tickets/TicketPurchaseFlow"; // Adjust path as needed
import Footer from "@/components/layout/Footer"; // Adjust path as needed
import Header from "@/components/layout/Header"; // Adjust path as needed

const TicketPurchasePage = () => {
  return (
    <Box>
      <Header />

      <Box
        sx={{
          backgroundImage: 'url("/images/exhibition1.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "95vh",
          width: "100%",
          borderRadius: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Add any additional styling or content here for the landing image */}
      </Box>

      <TicketPurchaseFlow />

      {/* <br />
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button component={Link} to="/" variant="outlined">
          Return to Home Page
        </Button>
      </Box>
      <br /> */}

      <Footer />
    </Box>
  );
};

export default TicketPurchasePage;
