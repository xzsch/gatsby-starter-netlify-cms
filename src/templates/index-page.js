import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

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
          {/* {title} */}
          GREAT DOCTOR WITH A BIG HEART
        </h1>
        <hr
          style={{
            width: "540px",
            margin: "0",
            opacity: "0.3",
          }}
        />
        <h3 className="sub-header has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen">
          {/* {subheading} */}
          Dr Israa's pesonal blog. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod
        </h3>
      </div>
      {/* <div
        className="hero-img"
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          })`,
        }}
      /> */}
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    Latest stories
                  </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
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
      }
    }
  }
`;

// image {
//   childImageSharp {
//     fluid(maxWidth: 2048, quality: 100) {
//       ...GatsbyImageSharpFluid
//     }
//   }
// }
