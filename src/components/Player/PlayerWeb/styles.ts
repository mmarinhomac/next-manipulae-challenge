import styled from 'styled-components';

export const Container = styled.div`
  z-index: 10;
`;

export const Flex = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
`;

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

  padding: 0 2rem;
  z-index: 10;
`;

export const StackActions = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
`;

export const ButtonGoBackTrack = styled.button`
  svg {
    font-size: 1.2rem;
  }
`;

export const ButtonPlayTrack = styled.button`
  svg {
    font-size: 1.85rem;
  }
`;

export const ButtonGoNextTrack = styled.button`
  svg {
    font-size: 1.2rem;
  }
`;

export const ButtonMinimizeMaximize = styled.button`
  width: 100%;
  margin-left: 2rem;

  display: flex;
  align-items: center;

  & > svg {
    font-size: 2rem;
    margin-left: auto;
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

interface BoxImageProps {
  src: string;
}

export const BoxImage = styled.div<BoxImageProps>`
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
