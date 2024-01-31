import React, { useEffect, useState } from "react";
import SingleApplication from "./SingleApplication";
import { getSingleApplicationFixture } from "./__fixtures__/applications.fixture";
import styles from "./Applications.module.css";
import { fakeLoanHistory } from "../json-server/db";
import axios from "axios";
import { Button } from "./ui/Button/Button";
const Applications = () => {
  const [startIndex, setStartIndex] = useState(0);

  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/applications"
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  //const applications = getSingleApplicationFixture;

  const renderNext5Items = () => {
    setStartIndex((prevIndex) => prevIndex + 5);
  };
  //Not enough time to do it, but use either render props or rearrange the below component
  //to loop through each application and render, give each a unique key id. Can be the date
  return (
    <div className={styles.Applications}>
      <ul>
        <>
          {data.slice(startIndex, startIndex + 5).map((item, index) => (
            <SingleApplication application={item} />
          ))}
          <Button
            className={Button}
            onClick={renderNext5Items}
            disabled={startIndex + 5 >= data.length}
          >
            Load More
          </Button>
        </>
      </ul>
    </div>
  );
};

export default Applications;
