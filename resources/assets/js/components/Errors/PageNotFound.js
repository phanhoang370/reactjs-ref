import React from 'react'

const PageNotFound = () => {

  return (
    <div className="main-404"  >
        <div className="error-message-container"  >
            <div className="error-message">
                <p className="title">Page Not Found</p>
                <p className="message">The link you clicked may be broken or the page may have been removed.</p>
                <p className="small">visit the <a href="/">homepage</a> about the problem</p>
            </div>
        </div>
    </div>
  )
}

export default PageNotFound;
