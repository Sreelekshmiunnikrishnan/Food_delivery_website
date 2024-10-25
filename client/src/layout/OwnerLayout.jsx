import React from 'react'
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { Outlet } from "react-router-dom";
export const OwnerLayout = () => {
  return (
    <div className="pt-3 ">
            <Header />
            
            <div className="min-h-110">
                <Outlet />

            </div>
            <Footer />
        </div>
  )
}