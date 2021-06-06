import styled from 'styled-components';

export const Container = styled.div`
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

  p {
    font-size: 1rem;
  }

  p:nth-child(1) {
    font-weight: 700;
  }

  p:nth-child(2) {
    font-weight: 400;
  }
`;
