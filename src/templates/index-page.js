import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";
import vimeo from "../img/social/vimeo.svg";

import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";

export const IndexPageTemplate = ({ image, title, heading, subheading }) => (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        display: "flex",
      }}
    >
      <div className="header-text">
        <h1 className="main-header is-size-3-mobile is-size-2-tablet is-size-1-widescreen">
          {title}
        </h1>
        <h3 className="sub-header is-size-5-mobile is-size-5-tablet is-size-4-widescreen">
          {subheading}
        </h3>
        <div
          className="social-header social footer-column"
          style={{ padding: "0px" }}
        >
          <div className="social-icons social-icons-header">
            <a
              title="facebook"
              href="https://www.facebook.com/SoUsHiiiii?ref=br_rs"
            >
              <img
                src={facebook}
                alt="Facebook"
                style={{ width: "1em", height: "1em" }}
              />
            </a>
            <a title="twitter" href="https://twitter.com">
              <img
                className="fas fa-lg"
                src={twitter}
                alt="Twitter"
                style={{ width: "1em", height: "1em" }}
              />
            </a>
            <a title="instagram" href="https://instagram.com">
              <img
                src={instagram}
                alt="Instagram"
                style={{ width: "1em", height: "1em" }}
              />
            </a>
            <a title="vimeo" href="https://vimeo.com">
              <img
                src={vimeo}
                alt="Vimeo"
                style={{ width: "1em", height: "1em" }}
              />
            </a>
          </div>
        </div>
      </div>
      <div
        className="hero-img"
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          })`,
        }}
      />
    </div>
    <section className="index-section section section--gradient">
      <div className="columns" style={{ margin: "0px" }}>
        <div className="content">
          <div className="column is-12" style={{ padding: "0" }}>
            <h3 className="stories-header is-size-2">Latest stories</h3>
            <BlogRoll />
            <div
              className="column is-12 has-text-centered"
              style={{ marginTop: "60px" }}
            >
              <Link className="btn" to="/blog">
                Read more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        heading
        subheading
        description
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
