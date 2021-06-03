import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
`;

export const ContainerAlignContent = styled.div`
  max-width: 1120px;
  width: 100%;
  height: 100%;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }

    div {
      p:nth-child(1) {
        font-size: 2rem;
        font-weight: 600;
      }
      p:nth-child(2) {
        font-size: 1.25rem;
        font-weight: 400;
        color: #A0AEC0;
      }
    }
  }
`;

interface InputBoxProps {
  isLoading: boolean;
}

const loadingSvg = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const InputBox = styled.div<InputBoxProps>`
  margin-top: 2rem;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  background: #222451;
  border-radius: 0.3rem;
  max-width: 400px;
  width: 100%;

  @media (max-width: 768px) {
    max-width: none;
  }

  svg {
    font-size: 1.5rem;
    ${props => 
      props.isLoading &&
      css`
        animation: ${loadingSvg} 1s infinite;
      `}
  }

  input {
    margin-left: 1rem;
    width: 100%;

    &:focus {
      outline: none;
    }

    &::placeholder { /* Firefox */
      color: #A0AEC0;
    }

    &::-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #A0AEC0;
    }

    &::-ms-input-placeholder { /* Microsoft Edge */
      color: #A0AEC0;
    }
  }
`;

export const CarouselMenu = styled.div`
  margin: 2.5rem 0 2rem 0;
  display: inline-flex;
  gap: 2rem;
`;

interface CarouselItemProps {
  isActive?: boolean;
}

export const CarouselItem = styled.button<CarouselItemProps>`
  font-size: 1.25rem;
  font-weight: ${props => props.isActive ? '700' : '400'};
`;