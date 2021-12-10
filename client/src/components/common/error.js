import React from "react";

const Error = ({ errors }) => {
  return (
    <div>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <h4>Oooops....</h4>
          <ul className="my-0">
            {errors.map((err) => (
              <li key={err.message}> {err.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Error;
