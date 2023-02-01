import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Feed.css";
import Post from "./Post";
import { get, post } from "../../utilities";

/**
 * Feed is the component containing the list of posts
 *
 * Proptypes
 * @param {string} user_id user id of the client
 */

// TODO: Add date indicators between posts
const Feed = (props) => {
  let emailsList = null;
  const hasEmails = props.emailData.length !== 0;

  if (props.isLoading) {
    return <div className="u-flexColumn Feed-container">Loading</div>;
  }

  if (hasEmails) {
    emailsList = props.emailData.filter((email) => !props.readEmailIDs.includes(email.emailID));
    emailsList = emailsList.map((emailObj, id) => {
      return (
        <Post
          key={id}
          emailData={emailObj}
          ReadEmail={props.ReadEmail}
          FlagEmail={props.FlagEmail}
          unflagEmail={props.unflagEmail}
          flaggedEmailIDs={props.flaggedEmailIDs}
        />
      );
    });
  }

  return <section className="u-flexColumn Feed-container">{emailsList}</section>;
};

export default Feed;
