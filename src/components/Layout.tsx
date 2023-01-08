import React, { Component, FC } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen bg-[#181D31] flex flex-col overflow-auto">
      <Navbar />

      <div className="h-full overflow-auto">
        {children}

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
