import React from "react";
import SingleApplication from "./SingleApplication";
import { getSingleApplicationFixture } from "./__fixtures__/applications.fixture";
import styles from "./Applications.module.css";
import { useApplications } from "./context/ApplicationsContext";
const Applications = () => {
  //const applications = getSingleApplicationFixture;
  const { applications } = useApplications();

  //Not enough time to do it, but use either render props or rearrange the below component
  //to loop through each application and render, give each a unique key id. Can be the date
  return (
    <div className={styles.Applications}>
      <SingleApplication application={applications} />
    </div>
  );
};

export default Applications;
