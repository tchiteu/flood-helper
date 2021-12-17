import styled from 'styled-components/native';

interface CardProps {
  first: Boolean;
  last: Boolean,
  selected?: Boolean
}

export const Container = styled.View`
  display: flex;
  justify-content: space-between;
`

export const ListContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: 8px 0px;
`

export const Card = styled.Pressable<CardProps>`
  padding: 6px 12px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-color: #9fa6ad;

  ${props => props.first && `
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  `}

  ${props => props.last && `
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-right-width: 1px;
  `}

  ${props => props.selected && `
    background-color: #e3e6e8;
    border-color: #838c95;
  `}
`