import React from "react"
import Image from "gatsby-image"
import styled from "styled-components"

export function TeamSection({ data }) {
    if (data === null || data === undefined)
        return null

    const members = data.fields.filter((member) => member !== null && member !== undefined && !member.hide)

    return members.length ? (
        <TeamGrid>
            {members.map((member) => (
                <TeamColumn>
                    <TeamUser>
                        <div class="avatar-wrapper">{member.image && <Image className="avatar" fluid={member.image.childImageSharp.fluid} />}</div>
                        <div class="member-name">{member.name}</div>
                        <div class="member-title">{member.position}</div>
                        <div class="member-description">
                            {member.description}
                        </div>
                    </TeamUser>
                </TeamColumn>
            ))}
        </TeamGrid>
    ) : null;
}

const TeamUser = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translate(0, -50%);
    text-align: center;

    & .avatar-wrapper {
        width: 98px;
        height: 98px;
        border-radius: 100%;
        margin: 0 auto 20px;
        overflow: hidden;
    }

    & .avater-wrapper.avatar {
        display: block;
        width: 100%;
        max-width: 100%;
    }

    & .member-name {
        color: #313435;
        font-family: "Roboto", sans-serif;
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 2.625rem;
    }

    & .member-title {
        color: #6F808A;
        font-family: "Roboto", sans-serif;
        font-size: 1rem;
        line-height: 2.5rem;
    }

    & .member-description {
        opacity: 0;
        transition: opacity 0.2s ease;
        font-size: 0.875rem;
        line-height: 1rem;
    }
`

const TeamColumn = styled.div`
    z-index: 0;
    position: relative;
    background: #FFF;
    box-shadow: 0 0 0 1px #E2E9ED;
    padding: 10px;
    box-sizing: border-box;
    transition: box-shadow 0.2s ease, transform 0.2s ease, z-index 0s 0.2s ease;

    &:before {
        content: "";
        display: block;
        padding-top: 100%;
    }

    &:hover {
        z-index: 1;
        box-shadow: 0 8px 50px rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
        transition: box-shadow 0.2s ease, transform 0.2s ease, z-index 0s 0s ease;
    }

    &:hover ${TeamUser} .member-description {
        opacity: 1;
    }
`

const TeamGrid = styled.div`
    column-count: 3;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background: #FFF;
    border: 1px solid #E2E9ED;

    & ${TeamColumn} {
        width: 50%;
        max-width: 50%;
        min-width: 50%;
        flex-basis: 50%;
    }

    @media (max-width: ${props => props.theme.breakpoints.small}) {
        & ${TeamColumn} {
            width: 100%;
            max-width: 100%;
            min-width: 100%;
            flex-basis: 100%;
        }
    }
`

export const TeamMemberBlock = {
    label: "Team Member",
    key: "teamMember",
    name: "teamMember",
    component: "group",
    defaultItem: {
        name: "",
        position: "",
        description: "",
        hide: false,
    },
    fields: [
        {
            label: "Member's Photo",
            name: "image",
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
        {
            label: "Team Member Name",
            name: "name",
            component: "text",
        },
        {
            label: "Team Member Position",
            name: "position",
            component: "text",
        },
        {
            label: "Team Member Description",
            name: "description",
            component: "text",
        },
        {
            label: "Hide",
            name: "hide",
            component: "toggle",
        }
    ],
}

export const TeamSectionBlock = {
    label: "Team Section",
    key: "team",
    name: "team",
    component: "group",
    fields: [
        {
            label: "Fields",
            name: "fields",
            component: "blocks",
            templates: {
                TeamMemberBlock,
            },
        },
    ],
}