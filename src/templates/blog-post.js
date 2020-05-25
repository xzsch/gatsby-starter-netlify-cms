import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import ShareButtons from "../components/ShareButtons";
import useSiteMetadata from "../components/SiteMetadata";
import Img from "gatsby-image";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  date,
  slug,
  featuredImage,
}) => {
  const PostContent = contentComponent || Content;
  const siteMetadata = useSiteMetadata();
  return (
    <section className="section">
      {helmet || ""}
      <div className="spacer" />
      <div className="container content">
        <div className="columns" style={{ margin: "0px" }}>
          <div style={{ maxWidth: "1160px", width: "100%" }}>
            <div className="post-header">
              <div className="post-header__left">
                <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                  {title}
                </h1>
                <p className="post-description">{description}</p>
                <p className="post-date">{date}</p>
              </div>
              <div className="post-header__right">
                {featuredImage ? (
                  <Img fluid={featuredImage} className="featured-image" />
                ) : null}
                {/* <Img fluid={featuredImage} className="featured-image" /> */}
              </div>
            </div>

            <div style={{ position: "relative", marginTop: "60px" }}>
              <ShareButtons
                tags={tags}
                title={title}
                url={`${siteMetadata.siteUrl}${slug}`}
              />
              <PostContent content={content} />
            </div>
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  let featuredImgFluid = post.frontmatter.featuredimage
    ? post.frontmatter.featuredimage.childImageSharp.fluid
    : null;

  return (
    <Layout>
      <BlogPostTemplate
        date={post.frontmatter.date}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        slug={post.fields.slug}
        featuredImage={featuredImgFluid}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
            <meta property="og:image" content={`${featuredImgFluid}`} />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fields {
        slug
      }
    }
  }
`;
