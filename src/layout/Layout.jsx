import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Searchbar from '../components/Searchbar';


export default function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] grid-cols-1 min-h-screen">
      <header className="row-start-1 row-end-2">
        <Header />
      </header>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] row-start-2 row-end-3 gap-4">
        <aside className="col-span-1 bg-base-100 border-r p-4">
          <Sidebar />
        </aside>
        <main className="col-span-4 p-6">
          <div className="max-w-6xl mx-auto w-full">
            <Searchbar />
            <div className="mt-4">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      <footer className="row-start-3 row-end-4">
        <Footer />
      </footer>
    </div>
  );
}