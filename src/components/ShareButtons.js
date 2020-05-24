import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";

export const ShareButtons = ({ twitterHandle, url, title, tags }) => (
  <div className="social-share">
    <FacebookShareButton url={url}>
      <FacebookIcon
        className="social-share__icon"
        bgStyle={{
          fill: "transparent",
        }}
        iconFillColor="#706c6c"
      />
    </FacebookShareButton>

    <TwitterShareButton
      url={url}
      title={title}
      via={twitterHandle}
      hashtags={tags}
    >
      <TwitterIcon
        className="social-share__icon"
        bgStyle={{ fill: "transparent" }}
        iconFillColor="#706c6c"
      />
    </TwitterShareButton>

    {/* <LinkedinShareButton url={url}>
      <LinkedinIcon />
    </LinkedinShareButton> */}

    {/* <RedditShareButton url={url} title={title}>
      <RedditIcon />
    </RedditShareButton> */}

    <WhatsappShareButton url={url} title={title}>
      <WhatsappIcon
        className="social-share__icon"
        bgStyle={{ fill: "transparent" }}
        iconFillColor="#706c6c"
      />
    </WhatsappShareButton>
  </div>
);

export default ShareButtons;
