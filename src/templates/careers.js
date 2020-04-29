import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

const Careers = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
      <Layout
        pageTitle = { post.frontmatter.partnerName }
        data      = { post.frontmatter }>
        <main className = "p-interior-page" aria-label="Main content">
        </main>
      </Layout>
  )
}

export default Careers;

export const pageQuery = graphql`
  query CareerByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        link
        position
        seo {
          metaTitle
          metaDescription
          socialShareCopy
        }
      }
    }
  }
`
