
import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = ({ isLoginPage }: { isLoginPage: boolean }) => {
  return (
    <div className="min-h-screen w-full">
      {!isLoginPage && <div className="sticky top-0 z-50">
        {/* Navbar component would be here */}
      </div>}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
