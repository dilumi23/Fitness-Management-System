import React, { useEffect, useState } from "react";

import axios from "axios";

import "./ArticleList.css";

export default function ArticleList() {
  const [articlePost, setArticlePost] = useState([]);

  useEffect(() => {
    const sendData = async () => {
      try {
        await axios
          .get(process.env.REACT_APP_BACKEND_URL + "/api/fitnessUpdate")
          .then((res) => {
            console.log(res.data);
            setArticlePost(res.data);
            // setLoading(false);
          })
          .catch((error) => {
            console.log("No data");
          });
      } catch (error) {
        console.log("No Data CATCH");
      }
    };

    sendData();
  }, []);

  return (
    <div>
      <div class="row">
        {/* ArticleList Column */}
        {articlePost.map(function (articlepost) {
          return (
            <div class="col-md-12 articleColumn">
              <div class="card" style={{ margin: "5px" }}>
                <div
                  class="card-body"
                  style={{
                    borderRadius: "10px",
                    boxShadow: "1px 2px 6px rgb(146,146,147)",
                  }}
                >
                  <div class="row">
                    <div class="col-md-4" style={{ padding: "30px" }}>
                      <div
                        class="card"
                        style={{ borderColor: "rgb(244,244,244)" }}
                      >
                        <img
                          class="img-fluid card-img  d-block"
                          // style={{
                          //   width: "200px",
                          //   height: "200px",
                          // }}
                          src={articlepost.image}
                          alt="ImageArticle"
                        />
                      </div>
                    </div>
                    <div class="col-md-8" style={{ padding: "20px 10px" }}>
                      <br />
                      <h4>
                        {articlepost.topic}
                        <br />
                      </h4>
                      <p>{articlepost.description}</p>
                      <a href={articlepost.link} target="_blank">
                        Read more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/*End ArticleList Column */}
      </div>
    </div>
  );
}
