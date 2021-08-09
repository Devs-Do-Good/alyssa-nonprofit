import React from "react"
import { graphql } from "gatsby"
import styled, { withTheme } from "styled-components"
import { useLocalJsonForm } from "gatsby-tinacms-json"
import Image from 'gatsby-image';
import { useCMS } from 'tinacms'

import {
  Paper,
  Meta,
  MetaSpan,
  MetaActions,
  DraftBadge,
} from "../components/style"
import { ListAuthors, AuthorsForm } from "../components/authors"
import { Link } from "gatsby"
import { PageLayout } from "../components/pageLayout"

export default withTheme(({ data, pageContext }) => {
  const cms = useCMS();
  const [page] = useLocalJsonForm(data.page, ListForm)
  const [authors] = useLocalJsonForm(data.authors, AuthorsForm)

  const { slug, limit, skip, numPages, currentPage } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? slug : slug + "/" + (currentPage - 1).toString()
  const nextPage = slug + "/" + (currentPage + 1).toString()
  page.title = isFirst ? page.title : page.title + " - " + currentPage

  const thumbnailPosts = data.posts.edges.filter(item => item.node.frontmatter.hideOnPreview)
  const blogPosts = data.posts.edges.filter(item => !thumbnailPosts.includes(item))

  return (
    <PageLayout page={page}>
      <>
        {thumbnailPosts.length > 0 &&
          <NewsImageGridWrapper style={{marginBottom: '2%'}}>
            {thumbnailPosts.map(item => (
              <NewsImageGridItem>
                <Link to={cms.enabled ? item.node.frontmatter.path : item.node.frontmatter.link}>
                  <Image imgStyle={{ objectFit: "contain" }} fluid={item.node.frontmatter.image.childImageSharp.fluid} />
                </Link>  
              </NewsImageGridItem>
            ))}
          </NewsImageGridWrapper>
        }
        {blogPosts.length > 0 &&
          blogPosts.map(item => (
              <Paper article key={item.node.id}>
                {item.node.frontmatter.draft && <DraftBadge>Draft</DraftBadge>}
                <h2>
                  <Link to={item.node.frontmatter.path}>
                    {item.node.frontmatter.title}
                  </Link>
                </h2>
                <p>{item.node.excerpt}</p>
                <Meta>
                  <MetaSpan>{item.node.frontmatter.date}</MetaSpan>
                  {item.node.frontmatter.authors && (
                    <MetaSpan>
                      <em>By</em>&nbsp;
                      <ListAuthors authorIDs={item.node.frontmatter.authors} />
                    </MetaSpan>
                  )}
                  <MetaActions>
                    <Link to={item.node.frontmatter.path}>Read More →</Link>
                  </MetaActions>
                </Meta>
              </Paper>
          ))}
        <ListNav>
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Newer
            </Link>
          )}
          {!isLast && (
            <Link to={nextPage} rel="next">
              Older →
            </Link>
          )}
        </ListNav>
      </>
    </PageLayout>
  )
})

export const pageQuery = graphql`
  query($listType: String!, $slug: String!, $skip: Int!, $limit: Int!) {
    page: pagesJson(path: { eq: $slug }) {
      path
      title
      hero {
        headline
        textline
        large
        overlay
        ctas {
          label
          link
          primary
          arrow
        }
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      listType
      rawJson
      fileRelativePath
    }
    posts: allMarkdownRemark(
      sort: { order: [DESC, DESC], fields: [frontmatter___hideOnPreview, frontmatter___date] }
      filter: {
        frontmatter: { type: { eq: $listType } }
        published: { eq: true }
      }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            link
            title
            draft
            authors
            hideOnPreview
            image {
              childImageSharp {
                fluid(quality: 70, maxWidth: 1920, fit: INSIDE) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    authors: settingsJson(
      fileRelativePath: { eq: "/content/settings/authors.json" }
    ) {
      ...authors

      rawJson
      fileRelativePath
    }
  }
`

export const NewsImageGridWrapper = styled(Paper)`
  display: -ms-flex;
  display: -webkit-flex;
  display: flex;
  padding-left: 0;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center; 
  justify-content: center;
`

export const NewsImageGridItem = styled.div`
  flex-basis: 25%;
  margin: 2% 4%;

  @media (max-width: ${props => props.theme.breakpoints.smallish}) {
    flex-basis: 40%;
    margin: 2.5% 5%;
  }

  @media (max-width: ${props => props.theme.breakpoints.small}) {
    flex-basis: 70%;
    margin: 5% 15%;
  }
`

export const ListNav = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  a {
    display: inline-block;
    padding: 0.5rem 1rem;
  }
`

const ListForm = {
  label: "Page",
  fields: [
    {
      label: "Title",
      name: "rawJson.title",
      component: "text",
    },
    {
      label: "Hero",
      name: "rawJson.hero",
      component: "group",
      fields: [
        {
          label: "Headline",
          name: "headline",
          component: "text",
        },
        {
          label: "Textline",
          name: "textline",
          component: "text",
        },
        {
          label: "Image",
          name: "image",
          component: "image",
          parse: (media) => `../images/${media.filename}`,
          uploadDir: () => `/content/images/`,
          previewSrc: (formValues) => {
            if (!formValues.jsonNode.hero || !formValues.jsonNode.hero.image)
              return ""
            return formValues.jsonNode.hero.image.childImageSharp.fluid.src
          },
        },
        {
          label: "Actions",
          name: "ctas",
          component: "group-list",
          itemProps: (item) => ({
            key: item.link,
            label: item.label,
          }),
          fields: [
            {
              label: "Label",
              name: "label",
              component: "text",
            },
            {
              label: "Link",
              name: "link",
              component: "text",
            },
            {
              label: "Primary",
              name: "primary",
              component: "toggle",
            },
            {
              label: "Arrow",
              name: "arrow",
              component: "toggle",
            },
          ],
        },
        {
          label: "Large",
          name: "large",
          component: "toggle",
        },
      ],
    },
  ],
}
