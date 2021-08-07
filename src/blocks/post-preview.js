import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import {
    Meta,
    MetaSpan,
    MetaActions,
} from "../components/style"
import { ListAuthors } from "../components/authors"
import { PostDataContext } from "../components/siteLayout";

export function PostPreview({ data }) {
    const allPosts = React.useContext(PostDataContext);
    let posts = allPosts.filter((post) => 
        !post.node.frontmatter.draft &&
        post.node.frontmatter.type === postTypeOptions[data.postType]
    );
    posts = posts.sort((post1, post2) => {
        const date1 = new Date(post1.node.frontmatter.date);
        const date2 = new Date(post2.node.frontmatter.date);

        return date2 - date1;
    })
    const post = posts.length ? posts[0] : null;

    if (data.postType === undefined || data.postType === null)
        return null

    return (
        <>
            <h2>{data.heading}</h2>
            {post !== null && 
                <>
                    <PostPreviewWrapper>
                        <PostPreviewInner>
                        <h3>
                            <Link to={post.node.frontmatter.path}>
                            {post.node.frontmatter.title}
                            </Link>
                        </h3>
                        <p>{post.node.excerpt}</p>
                        <Meta>
                            <MetaSpan>{new Date(post.node.frontmatter.date).toDateString()}</MetaSpan>
                            {post.node.frontmatter.authors && (
                            <MetaSpan>
                                <em>By</em>&nbsp;
                                <ListAuthors authorIDs={post.node.frontmatter.authors} />
                            </MetaSpan>
                            )}
                            <MetaActions>
                            <Link to={post.node.frontmatter.path}>Read →</Link>
                            </MetaActions>
                        </Meta>
                        </PostPreviewInner>
                    </PostPreviewWrapper>
                    <p>Click <Link to={data.viewMoreLink}>here</Link> to view more {data.postType.toLowerCase()}</p>
                </>
            }
            {post === null && 
                <p>There aren't any {data.postType.toLowerCase()} published yet. When they're posted, you can view them <Link to={data.viewMoreLink}>here</Link>.</p>
            }
        </>
    )
}

const PostPreviewWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
`

const PostPreviewInner = styled.div`
    width: 90%;
    padding: 2%;
    box-shadow: 0 0 10px 1px #E2E9ED;

    &:hover {
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: ${props => props.theme.breakpoints.small}) {
        width: 100%;
    }
`

const postTypeOptions = {
    "Blog Posts": 'post',
    "Current Initiatives": 'initiative',
    "In the News": 'news',
}

export const PostPreviewBlock = {
  label: "Post Preview",
  key: "postPreview",
  name: "postPreview",
  component: "group",
  defaultItem: {
    postType: Object.values(postTypeOptions).length ? Object.values(postTypeOptions)[0] : '',
  },
  fields: [
    {
        name: "postType",
        label: "Post Type",
        component: "select",
        options: Object.keys(postTypeOptions),
    },
    {
        name: "heading",
        label: "Heading",
        component: "text",
    },
    {
        name: "viewMoreLink",
        label: "View More Link",
        component: "text",
    },
  ],
}