import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"

import { usePlugin } from "tinacms"
import { useRemarkForm, DeleteAction } from "gatsby-tinacms-remark"
import { InlineForm, InlineTextField } from "react-tinacms-inline"
import { InlineWysiwyg } from "react-tinacms-editor"

import {
  Paper,
  Meta,
  MetaSpan,
  MetaActions,
  DraftBadge,
} from "../components/style"
import { EditToggle } from "../components/editToggle"
import { ListAuthors } from "../components/authors"
import { ListTags } from "../components/tags"
import { PageLayout } from "../components/pageLayout"
import { useAuthors } from "../components/useAuthors"
import { useTags } from "../components/useTags"
import {
  NewsImageGridWrapper,
  NewsImageGridItem
} from "./list"

function Post(props) {
  const authors = useAuthors()
  const tags = useTags()
  const page = props.data.markdownRemark

  const thumbnailFormOptions = {
    actions: [DeleteAction],
    fields: [
      {
        name: "rawFrontmatter.link",
        label: "Link to Article",
        component: "text",
      },
      {
        name: "rawFrontmatter.image",
        label: "Image",
        component: "image",
        parse: (media) => `../images/${media.filename}`,
        uploadDir: () => `/content/images/`,
      },
      {
        name: "rawFrontmatter.draft",
        component: "toggle",
        label: "Draft",
      },
    ],
  }

  const formOptions = {
    actions: [DeleteAction],
    fields: [
      {
        label: "Title",
        name: "rawFrontmatter.title",
        component: "text",
      },
      {
        label: "Authors",
        name: "rawFrontmatter.authors",
        component: "authors",
        authors: authors,
      },
      {
        name: "rawFrontmatter.draft",
        component: "toggle",
        label: "Draft",
      },
      {
        label: "Date",
        name: "rawFrontmatter.date",
        component: "date",
      },
      {
        label: "Hero Image",
        name: "rawFrontmatter.hero.image",
        component: "image",
        parse: (media) => {
          if (!media) return ""
          return `../images/${media.filename}`
        },
        uploadDir: () => `/content/images/`,
        previewSrc: (src, path, formValues) => {
          if (
            !formValues.frontmatter.hero ||
            !formValues.frontmatter.hero.image
          )
            return ""
          return formValues.frontmatter.hero.image.childImageSharp.fluid.src
        },
      },
    ],
  }

  const [data, form] = useRemarkForm(page, page.frontmatter.hideOnPreview ? thumbnailFormOptions : formOptions);
  usePlugin(form)

  if (page.frontmatter.hideOnPreview) {
    return (
      <PageLayout page={data}>
        <NewsImageGridWrapper>
          <NewsImageGridItem>
            <Link to={page.frontmatter.link}>
              <Image imgStyle={{ objectFit: "contain" }} fluid={page.frontmatter.image.childImageSharp.fluid} />
            </Link>  
          </NewsImageGridItem>
        </NewsImageGridWrapper>
      </PageLayout>
    )
  }

  return (
    <InlineForm form={form}>
      <PageLayout page={data}>
        <Paper>
          <Meta>
            <MetaSpan>{data.frontmatter.date}</MetaSpan>
            {data.frontmatter.authors && data.frontmatter.authors.length > 0 && (
              <MetaSpan>
                <em>By</em>&nbsp;
                <ListAuthors authorIDs={data.frontmatter.authors} />
              </MetaSpan>
            )}
            <MetaActions>
              <Link to={window.location.pathname.split('/').slice(0, -1).join('/')}>← Back</Link>
            </MetaActions>
          </Meta>
          <h1>
            <InlineTextField name="rawFrontmatter.title" />
          </h1>
          <hr />
          <InlineWysiwyg name="rawMarkdownBody" format="markdown">
            <div
              dangerouslySetInnerHTML={{
                __html: data.html,
              }}
            />
          </InlineWysiwyg>
          {data.frontmatter.draft && <DraftBadge>Draft</DraftBadge>}
          {process.env.NODE_ENV !== "production" && <EditToggle />}
        </Paper>
        {data.frontmatter.tags && data.frontmatter.tags.length > 0 && (
          <Meta>
            <MetaSpan>
              <ListTags tagIDs={data.frontmatter.tags} />
            </MetaSpan>
          </Meta>
        )}
      </PageLayout>
    </InlineForm>
  )
}

export default Post

export const postQuery = graphql`
  query($path: String!) {
    markdownRemark(
      published: { eq: true }
      frontmatter: { path: { eq: $path } }
    ) {
      id
      excerpt(pruneLength: 160)
      html

      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        draft
        authors
        hideOnPreview
        link
        image {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        hero {
          large
          overlay
          image {
            childImageSharp {
              fluid(quality: 70, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }

      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
    authors: settingsJson(fileRelativePath: { eq: "/content/settings/authors.json" }) {
      ...authors
    }
  }
`
