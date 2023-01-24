import React from "react";
import OutlookIcon from "../../public/icons/Outlook_Icon.svg";
import HomeIcon from "../../public/icons/Home Icon.png";
import ProfileIcon from "../../public/icons/Profile Icon.png";
import { get } from "../../utilities";
import { post } from "../../utilities";
import * as chrono from "chrono-node";

import "../../utilities.css";
import "./NavBar.css";

const TEST_CONTENT =
  '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="Generator" content="Microsoft Word 15 (filtered medium)"><style><!--@font-face{font-family:"Cambria Math"}@font-face{font-family:Calibri}@font-face{font-family:Constantia}@font-face{font-family:"Book Antiqua"}@font-face{font-family:"Bell MT"}@font-face{font-family:"Monotype Corsiva"}p.MsoNormal, li.MsoNormal, div.MsoNormal{margin:0in;font-size:11.0pt;font-family:"Calibri",sans-serif}a:link, span.MsoHyperlink{color:#0563C1;text-decoration:underline}strong{font-family:"Times New Roman",serif}.MsoChpDefault{font-size:10.0pt}@page WordSection1{margin:1.0in 1.0in 1.0in 1.0in}div.WordSection1{}--></style></head><body lang="EN-US" link="#0563C1" vlink="#954F72" style="word-wrap:break-word"><div class="WordSection1"><p class="MsoNormal"><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif">Dear Students:</span></p><p class="MsoNormal"><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif">&nbsp;</span></p><p class="MsoNormal"><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif">You are invited to attend the OME’s Networking Mixer with the OME’s Industrial <span style="color:black">Advisory Council for Minority Education (IACME). Visit with compan</span>ies<span style="color:black"> and organizations, e.g.,</span> Blue Origin, Eli Lilly, Google, Lockheed Martin, MIT Lincoln Laboratory, NASA Goddard, NASA JPL (to name a few). P<span style="color:black">ick up fun swag and win great raffle prizes donated by our sponsor companies.</span></span></p><p class="MsoNormal"><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif; color:black"><br></span><strong><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif; color:black">Date | Time: </span></strong><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif; color:black">Thursday, February 2, 2023 | 12:00-1:30pm (ET</span><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif">)</span></p><p class="MsoNormal"><b><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif">Location:</span></b><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif"> Lobby 13</span></p><p class="MsoNormal"><strong><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif; color:black">To RSVP</span></strong><strong><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif">, <span style="color:black">click </span></span></strong><a href="https://www.surveymonkey.com/r/9885V9G"><b><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif">here</span></b></a><strong><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif; color:black">: </span></strong><strong><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif">(</span></strong><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif; color:#2F5597"><a href="https://www.surveymonkey.com/r/9885V9G">https://www.surveymonkey.com/r/9885V9G</a></span><strong><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif">)</span></strong><strong><span style="font-family:&quot;Book Antiqua&quot;,serif"></span></strong></p><p class="MsoNormal"><b><span style="font-size:12.0pt; font-family:&quot;Book Antiqua&quot;,serif; color:black">Lunch will be provided</span></b>';
/**
 * NavBar is the component on the main website page responsible for navigating between pages.
 *
 * Proptypes
 * @param {string} user_id user id of the client
 */
const writetoDB = () => {
  post("/api/emails", {}).then((response) => {
    console.log(response);
  });
};

const getLinks = (email_content) => {
  const rawHTML = email_content;
  const doc = document.createElement("html");
  doc.innerHTML = rawHTML;
  const links = doc.getElementsByTagName("a");
  const urls = [];

  for (var i = 0; i < links.length; i++) {
    urls.push(links[i].getAttribute("href"));
  }
  console.log(urls);
  // return urls;
  // alert(urls);
};

// const URLS = getLinks(TEST_CONTENT);

const parseDateTime = () => {
  const result = chrono.parse(TEST_CONTENT);
  console.log(result[0].text);
  // return result;
};

const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="u-flexColumn NavBar-headers">
        <span className="NavBar-headerItem u-flex-alignCenter">
          <img src={OutlookIcon} alt="Outlook Icon" className="NavBar-icon" />
          <p>Outlook</p>
        </span>

        <span className="NavBar-headerItem u-flex-alignCenter">
          <img src={HomeIcon} alt="Home Icon" className="NavBar-icon" />
          <p>Home</p>
        </span>

        <span className="NavBar-headerItem u-flex-alignCenter">
          <img src={ProfileIcon} alt="Profile Icon" className="NavBar-icon" />
          <p>Profile</p>
        </span>
        {/* code to create button that sends data to database */}
        <button onClick={writetoDB}>Send to DB</button>
      </div>
    </nav>
  );
};

export default NavBar;
