import React from "react";
import { Link } from "react-router-dom";

const ResponseList = ({ responses }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Responses</span>
      </div>
      <div className="card-body">
        {responses &&
          responses.map((response) => (
            <p className="pill mb-3" key={response._id}>
              {response.responseBody} {"// "}
              <Link
                to={`/profile/${response.username}`}
                style={{ fontWeight: 700 }}
              >
                {response.username} on {response.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default ResponseList;
