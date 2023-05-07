import React, {  } from "react";

const Newsitem =(props)=>{

    let { title, description, imageurl, newsurl, author, date, source } =props;
    return (
      <div
        className="my-5"
        style={{
          boxShadow: "5px 5px 10px black",
          borderRadius: "20px",
          width: "299px",
          margin: "auto",


          
        }}
      >
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className=" badge rounded-pill bg-danger">{source}</span>
          </div>
          <img
            src={
              !imageurl
                ? "https://images.hindustantimes.com/tech/img/2023/05/01/1600x900/be05021dcfd0b5a8b45272d19c9a5b1ejpg_1650761539952_1682903681580.jpg"
                : imageurl
            }
            className="card-img-top" style={{height:'12rem'}}
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By{!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsurl} target="-blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default Newsitem;
