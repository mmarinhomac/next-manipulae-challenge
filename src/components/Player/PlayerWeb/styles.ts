import styled, { css } from 'styled-components';

interface FlexProps {
  maximizeView: boolean
}

interface ImageProps {
  src: string;
}

interface ProgressBarTrackProps {
  progress: number;
}

interface ButtonsActionProps {
  enabledChangeTrack: string
}

interface ButtonMinimizeMaximizeProps extends FlexProps {}

export const Container = styled.div`
  z-index: 10;
`;

export const Flex = styled.div<FlexProps>`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;

  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(29, 31, 62, 0.98);
  transition: transform 400ms;
  transform: translateY(100vh);

  ${props => 
    props.maximizeView &&
    css`
      transform: translateY(0);
    `}
`;

export const BigImage = styled.div<ImageProps>`
  width: 30vw;
  height: 30vw;
  background: url(${props => props.src});
  background-size: cover;
  border-radius: 0.5rem;
`;

export const VStackInfoMaximized = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-left: 0.1rem solid #fff;
  padding: 4rem 3rem;

  p:nth-child(1) {
    font-size: 1.25rem;
    font-weight: 600;
  }
  p:nth-child(2) {
    margin-top: 0.2rem;
    font-size: 0.95rem;
    font-weight: 400;
  }

  & > a {
    margin-top: 3rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 2.5rem;
    color: #fff;
    background: rgb(92,32,166);
    background: linear-gradient(45deg, rgba(92,32,166,1) 0%, rgba(181,114,216,1) 100%);
    border-radius: 0.25rem;

    svg {
      font-size: 1.5rem;
    }
  }
`;

export const Footer = styled.div`
  width: 100vw;
  height: 5rem;
  display: flex;
  align-items: center;
  padding: 0 3rem;

  position: absolute;
  bottom: 0;
  left: 0;

  background: #1D1F3E;
  box-shadow: 0px -2px 8px 0px rgba(255,255,255,0.1);
  -webkit-box-shadow: 0px -2px 8px 0px rgba(255,255,255,0.1);
  -moz-box-shadow: 0px -2px 8px 0px rgba(255,255,255,0.1);
  z-index: 10;
`;

export const ProgressBarTrack = styled.div<ProgressBarTrackProps>`
  width: 100%;
  height: 0.1rem;
  position: absolute;
  top: 0;
  left: 0;

  & > div {
    width: 0%;
    height: 100%;
    background: rgb(95,22,188);
    background: linear-gradient(90deg, rgba(95,22,188,1) 0%, rgba(163,56,224,1) 50%, rgba(224,90,247,1) 100%);
    border-radius: 0.25rem;
    transition: width 600ms;

    ${props => 
      props.progress &&
      css`
        width: ${props.progress}%;
      `}
  }
`;

export const StackActions = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
`;

export const ButtonGoPreviousTrack = styled.button<ButtonsActionProps>`
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
  gap: 0.3rem;
  position: relative;

  p:nth-child(1) {
    position: absolute;
  }

  p:nth-child(2) {
    margin-left: 2.5rem;
  }  

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

export const VStackInfoMinimized = styled.div`
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
