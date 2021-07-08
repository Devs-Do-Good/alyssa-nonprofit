import React, { useState } from "react"
import { graphql } from "gatsby"
import { Paper } from "../components/style"
import { Form, FormBlock } from "../blocks/form"
import { Title, TitleBlock } from "../blocks/title"
import { Image, ImageBlock } from "../blocks/image"
import { Content, ContentBlock } from "../blocks/content"
import { LocationsMap, LocationsMapBlock } from "../blocks/locations-map"
import { PageLayout } from "../components/pageLayout"
import TinaWrapper from '../components/tinaWrapper'
import { Footer } from "../components/footer"

import { useLocalJsonForm } from "gatsby-tinacms-json"

export default function Page({ data }) {
  // hacky way to get map data since I've given up
  const blocksJson = JSON.parse(data.page.rawJson).blocks

  // const { edit, setEdit } = useEditState();
  const [edit, setEdit] = useState(false);

  const [page] = useLocalJsonForm(data.page, PageForm)
  const blocks = page.blocks ? page.blocks : []

  const pageContent = (
    <>
    <PageLayout page={page}>
      <Paper>
        {blocks &&
          blocks.map(({ _template, ...data }, i) => {
            switch (_template) {
              case "TitleBlock":
                return <Title page={page} data={data} />
              case "ImageBlock":
                return <Image data={data} />
              case "FormBlock":
                return <Form form={data} />
              case "ContentBlock":
                if (data.content && page.childrenPagesJsonBlockMarkdown[i])
                  return (
                    <Content
                      data={data}
                      html={
                        page.childrenPagesJsonBlockMarkdown[i]
                          .childMarkdownRemark.html
                      }
                    />
                  )
                break
              case "LocationsMapBlock":
                // use JSON with map data
                return <LocationsMap data={blocksJson[i]} />
              default:
                return true
            }
          })}
      </Paper>
    </PageLayout>
    <Footer edit={edit} setEdit={setEdit} />
    </>
  );

  if (edit) {
    return (
      <TinaWrapper>
        {pageContent}
      </TinaWrapper>
    )
  }
  else {
    return pageContent;
  }
}

const PageForm = {
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
          parse: (filename) => `../images/${filename}`,
          uploadDir: () => `/content/images/`,
          previewSrc: (formValues, input) => {
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
    {
      label: "Page Sections",
      name: "rawJson.blocks",
      component: "blocks",
      templates: {
        TitleBlock,
        ImageBlock,
        FormBlock,
        ContentBlock,
        LocationsMapBlock,
      },
    },
  ],
}

export const pageQuery = graphql`
  query($path: String!) {
    page: pagesJson(path: { eq: $path }) {
      title
      displayTitle
      hero {
        headline
        textline
        large
        overlay
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        ctas {
          label
          link
          primary
          arrow
        }
      }
      blocks {
        _template
        content
        name
        title
        underline
        center
        recipient
        fields {
          label
          inputType
          autocomplete
        }
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      childrenPagesJsonBlockMarkdown {
        childMarkdownRemark {
          html
        }
      }

      rawJson
      fileRelativePath
    }
  }
`
