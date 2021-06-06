import styled, { css } from 'styled-components';

interface FlexProps {
  maximizeView: boolean
}

interface FooterProps extends FlexProps { }

interface ProgressBarTrackProps {
  progress: number;
}

interface ButtonsActionProps {
  enabledChangeTrack: string
}

interface ImageProps {
  src: string;
}

export const Container = styled.div`
  height: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
`;

export const Flex = styled.div<FlexProps>`
  width: 100vw;
  height: 100%;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(29, 31, 62, 0.98);
  transition: transform 400ms;
  transform: translateY(100vh);

  ${props => 
    props.maximizeView === true &&
    css`
      transform: translateY(0);
    `}
`;

export const ButtonMinimizePlayer = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  svg {
    font-size: 2rem;
    position: absolute;
    left: 0;
  }
`;

export const StackContentAlign = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const VStackInfoMaximized = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    p:nth-child(1) {
      text-align: center;
      margin-top: 2rem;
      font-size: 1.2rem;
      font-weight: 600;
    }
    p:nth-child(2) {
      margin-top: 0.2rem;
      font-size: 0.95rem;
      font-weight: 400;
    }
  }

  & > a {
    margin-top: 3rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    color: #fff;
    background: rgb(92,32,166);
    background: linear-gradient(45deg, rgba(92,32,166,1) 0%, rgba(181,114,216,1) 100%);
    border-radius: 0.25rem;

    svg {
      font-size: 1.5rem;
    }
  }
`;

export const BigImage = styled.div<ImageProps>`
  width: 50vw;
  height: 50vw;
  background: url(${props => props.src});
  background-size: cover;
  border-radius: 0.5rem;
`;

export const StackContentActions = styled.div`
  margin-top: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const ProgressBarTrackMaximized = styled.div<ProgressBarTrackProps>`
  width: 100%;
  height: 0.2rem;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;

  & > div {
    width: 0%;
    height: 100%;
    background: rgb(95,22,188);
    background: linear-gradient(90deg, rgba(95,22,188,1) 0%, rgba(163,56,224,1) 50%, rgba(224,90,247,1) 100%);
    border-radius: 0.5rem;
    transition: width 600ms;

    ${props => 
      props.progress &&
      css`
        width: ${props.progress}%;
      `}
  }
`;

export const HStackTimeTrackMaximized = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.65)
  }
`;

export const StackActionsMaximized = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

export const ButtonGoPreviousTrackMaximized = styled.button<ButtonsActionProps>`
  svg {
    font-size: 1.6rem;
    ${props =>
      props.enabledChangeTrack === 'block_previous' &&
      css`
        color: rgba(255, 255, 255, 0.3);
      `}
  }
`;

export const ButtonPlayTrackMaximized = styled.button`
  svg {
    font-size: 3rem;
  }
`;

export const ButtonGoNextTrackMaximized = styled.button<ButtonsActionProps>`
  svg {
    font-size: 1.6rem;
    ${props =>
      props.enabledChangeTrack === 'block_next' &&
      css`
        color: rgba(255, 255, 255, 0.3);
      `}
  }
`;

export const Footer = styled.div<FooterProps>`
  width: 100vw;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  position: absolute;
  bottom: 0;
  left: 0;

  background: #1D1F3E;
  box-shadow: 0px -2px 8px 0px rgba(255,255,255,0.1);
  -webkit-box-shadow: 0px -2px 8px 0px rgba(255,255,255,0.1);
  -moz-box-shadow: 0px -2px 8px 0px rgba(255,255,255,0.1);
  z-index: 10;
  transition: transform 400ms;
  transform: translateY(5rem);

  ${props => 
    props.maximizeView === false &&
    css`
      transform: translateY(0);
    `}
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

export const ButtonMaximizePlayer = styled.button`
  width: 90%;
  height: 100%;
  overflow: hidden;

  display: flex;
  align-items: center;
`;

export const BoxImage = styled.div<ImageProps>`
  flex: 0 0 auto;
  width: 3.85rem;
  height: 3.85rem;
  background: url(${props => props.src});
  background-size: cover;
  border-radius: 0.25rem;
`;

export const VStackInfoMinimized = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  p:nth-child(1) {
    white-space: nowrap;
    font-size: 0.95rem;
    font-weight: 600;
  }
  p:nth-child(2) {
    font-size: 0.75rem;
    font-weight: 400;
  }
`;

export const StackActions = styled.div`
  margin-left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const ButtonPlayTrack = styled.button`
  svg {
    font-size: 1.3rem;
  }
`;

export const ButtonGoNextTrack = styled.button<ButtonsActionProps>`
  svg {
    font-size: 1.3rem;
    ${props =>
      props.enabledChangeTrack === 'block_next' &&
      css`
        color: rgba(255, 255, 255, 0.3);
      `}
  }
`;
