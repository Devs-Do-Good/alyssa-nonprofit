import React from "react"
import styled, { css } from "styled-components"
import { Wrapper, Overlay, LinkButton } from "./style"

export const Hero = ({ hero }) => {
  return (
    <HeroWrapper>
      <HeroBackground>
        {hero.overlay && <Overlay />}
        {hero.image && (
          <HeroImage fluid={hero.image.childImageSharp.fluid}></HeroImage>
        )}
      </HeroBackground>
      {(hero.headline || hero.textline || hero.ctas) && (
        <HeroContent large={hero.large}>
          <Wrapper>
            {hero.headline && <Headline>{hero.headline}</Headline>}
            {hero.textline && <Textline>{hero.textline}</Textline>}
            {hero.ctas && (
              <Actions>
                {Object.keys(hero.ctas).map(key => {
                  return (
                    <LinkButton
                      primary={hero.ctas[key].primary}
                      to={hero.ctas[key].link}
                    >
                      {hero.ctas[key].label}
                      {hero.ctas[key].arrow && <span>&nbsp;&nbsp;→</span>}
                    </LinkButton>
                  )
                })}
              </Actions>
            )}
          </Wrapper>
        </HeroContent>
      )}
    </HeroWrapper>
  )
}

const HeroWrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  top: 0;
  padding-top: ${props => props.theme.header.height};
  min-height: calc(
    ${props => props.theme.header.height} +
      ${props => props.theme.header.height}
  );

  ${props =>
    props.theme.hero.parallax &&
    css`
      transform-style: preserve-3d;
    `}
`

const HeroContent = styled.div`
  display: block;
  padding: 3rem 0;

  ${props =>
    props.large &&
    css`
      padding: 8rem 0;
    `}
`

export const Actions = styled.div`
  padding-bottom: 0.5rem;
  > * {
    margin-right: 1rem;
  }
`