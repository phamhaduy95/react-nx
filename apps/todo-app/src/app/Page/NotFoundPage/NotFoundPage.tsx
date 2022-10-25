import React from 'react';
import "./NotFoundPage.scss";

export  function NotFoundPage() {
  return (
    <div className="NotFoundPage">
      <div className="NotFound">
        <h1 className="NotFound__ErrorCode">
          4<span>0</span>4
        </h1>
        <h2 className="NotFound__Message">
        the page you requested could not found
      </h2>
      </div>
      
    </div>
  );
}
