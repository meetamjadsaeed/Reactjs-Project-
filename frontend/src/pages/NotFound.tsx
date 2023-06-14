import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main>
      <div className="section not__found text-center">
        <h3>Page You Were Looking For Was Not Found</h3>
        <Link to="/" className="mt-3 d-inline-block">
          Go Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
