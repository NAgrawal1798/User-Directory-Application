import React, { useEffect, useState } from "react";
import moment from "moment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";

const useStyles = makeStyles({
  card: {
    marginTop: "10px",
  },
});

const App = () => {
  const classes = useStyles();
  let url = "http://localhost:5000/users?_page=1";
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log(filter);
    const fetchData = async () => {
      try {
        if (filter) {
          url += "&q=" + filter;
        }
        const response = await fetch(url);
        const rawData = await response.json();
        const processedData = rawData.map((item) => ({
          ...item,
          "Date of birth": moment
            .utc(item["Date of birth"])
            .format("YYYY-MM-DD"),
          "Created at": moment.utc(item["Created at"]).format("YYYY-MM-DD"),
        }));
        setData(processedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [filter]);

  return (
    <>
      <div>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Card sx={{ maxWidth: 375 }}>
          <CardContent>
            {data.map((item, index) => (
              <div key={index} className={classes.card}>
                {Object.keys(item).map((subItem, index) => (
                  <div key={index}>
                    {subItem} : {item[subItem]}
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default App;
