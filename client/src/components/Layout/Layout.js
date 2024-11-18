import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import { Toaster } from "react-hot-toast";

const Layout = (props) => {
  return (
    <div>
        {props.showHeader && <Header />} {/* Conditionally render Header */}
        <main>
            {props.children}
            <Toaster />
        </main>
        {props.showFooter && <Footer />} {/* Conditionally render Footer */}
    </div>
  )
}

export default Layout;
