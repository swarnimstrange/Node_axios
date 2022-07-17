const axios = require("axios");
const express = require("express");

app = express();
app.use(express.json());

const reqOne = axios.get("https://jsonmock.hackerrank.com/api/articles?page=1");
const reqTwo = axios.get("https://jsonmock.hackerrank.com/api/articles?page=2");
const reqThree = axios.get(
  "https://jsonmock.hackerrank.com/api/articles?page=3"
);
const reqFour = axios.get(
  "https://jsonmock.hackerrank.com/api/articles?page=4"
);
const reqFive = axios.get(
  "https://jsonmock.hackerrank.com/api/articles?page=5"
);

axios
  .all([reqOne, reqTwo, reqThree, reqFour, reqFive])
  .then(
    axios.spread((...responses) => {
      array = [];
      newArr = [];
      for (let i = 0; i < 5; i++) {
        array.push(...responses[i].data.data);
      }
      array.sort(function (a, b) {
        return b.num_comments - a.num_comments;
      });
      const limit = 2;
      console.log(`We have limit as -: ${limit}`);
      console.log(" ");

      //If title is null we return story_title
      for (i = 0; i < limit; i++) {
        if (array[i].title === null && array[i].story_title !== null)
          console.log(array[i].story_title);
        //If both are null we return nothing
        else if (array[i].title === null && array[i].story_title === null) {
          console.log();
          //else we return title of article
        } else {
          console.log(array[i].title);
        }
      }
    })
  )
  .catch((errors) => {});

app.listen(5000, console.log("Server is running on port 5000"));
