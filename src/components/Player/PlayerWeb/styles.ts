import styled, { css } from 'styled-components';

export const Container = styled.div`
  z-index: 10;
`;

interface FlexProps {
  maximizeView: boolean
}

export const Flex = styled.div<FlexProps>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  transition: transform 600ms;
  transform: translateY(100vh);

  ${props => 
    props.maximizeView &&
    css`
      transform: translateY(0);
    `}
`;

interface ImageProps {
  src: string;
}

export const BigImage = styled.div<ImageProps>``;

export const LinkDeezer = styled.a``;

export const Footer = styled.div`
  width: 100vw;
  height: 4.5rem;
  display: flex;
  align-items: center;

  position: absolute;
  bottom: 0;
  left: 0;

  background: #1D1F3E;
  box-shadow: 0px -2px 8px 0px rgba(255,255,255,0.05);
  -webkit-box-shadow: 0px -2px 8px 0px rgba(255,255,255,0.05);
  -moz-box-shadow: 0px -2px 8px 0px rgba(255,255,255,0.05);

  padding: 0 3rem;
  z-index: 10;
`;

export const StackActions = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
`;

interface ButtonsActionProps {
  enabledChangeTrack: string
}

export const ButtonGoBackTrack = styled.button<ButtonsActionProps>`
  svg {
    font-size: 1.2rem;
    ${props =>
      props.enabledChangeTrack === 'block_previous' &&
      css`
        color: rgba(255, 255, 255, 0.3);
      `}
  }
`;

export const ButtonPlayTrack = styled.button`
  svg {
    font-size: 1.85rem;
  }
`;

export const ButtonGoNextTrack = styled.button<ButtonsActionProps>`
  svg {
    font-size: 1.2rem;
    ${props =>
      props.enabledChangeTrack === 'block_next' &&
      css`
        color: rgba(255, 255, 255, 0.3);
      `}
  }
`;

interface ButtonMinimizeMaximizeProps extends FlexProps {}

export const ButtonMinimizeMaximize = styled.button<ButtonMinimizeMaximizeProps>`
  width: 100%;
  height: 100%;
  margin-left: 2rem;

  display: flex;
  align-items: center;

  & > svg {
    font-size: 2rem;
    margin-left: auto;
    transition: transform 0.5s;

    ${props => 
      props.maximizeView &&
      css`
        transform: rotate(-180deg);
      `}
  }
`;

export const HStackTimeTrack = styled.div`
  display: flex;
  align-items: center;

  p {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.65)
  }
`;

export const HStackInfo = styled.div`
  margin-left: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const BoxImage = styled.div<ImageProps>`
  width: 3rem;
  height: 3rem;
  background: url(${props => props.src});
  background-size: cover;
  border-radius: 0.25rem;
`;

export const VStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  p:nth-child(1) {
    font-size: 1rem;
    font-weight: 600;
  }
  p:nth-child(2) {
    font-size: 0.85rem;
    font-weight: 400;
  }
`;
