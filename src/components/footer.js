import React from "react"
import { Wrapper } from "./style"
import styled from "styled-components"
import { transparentize } from "polished"

export const Footer = styled(({ edit, setEdit, ...styleProps }) => {
  const onClick = () => {
    setEdit(!edit);
  }

  return (
    <footer {...styleProps}>
      <Wrapper>
        <a onClick={onClick}>
          {edit ? 'Quit editing this site' : 'Edit this site'}
        </a>
      </Wrapper>
    </footer>
  )
})`
  font-size: 0.8rem;
  line-height: 3rem;
  text-align: center;
  height: 3rem;
  background-color: ${props =>
    transparentize(0.97, props.theme.color.foreground)};
  box-shadow: inset 0 1px 0
    ${props => transparentize(0.95, props.theme.color.foreground)};
`
