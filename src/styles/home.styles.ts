import styled, { css, keyframes } from 'styled-components';

export const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
`;

export const ContainerAlignContent = styled.section`
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
  margin: 2rem 0 2.5rem 0;
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

interface CarouselMenuProps {
  appear: boolean;
}

export const CarouselMenu = styled.div<CarouselMenuProps>`
  margin-bottom: 3rem;
  display: inline-flex;
  gap: 2rem;
  ${props => props.appear &&
    css`
      display: none;
    `}
`;

interface CarouselItemProps {
  isActive: string;
  optionMenu: string;
}

export const CarouselItem = styled.button<CarouselItemProps>`
  display: flex;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: ${props => props.isActive === props.optionMenu ? '700' : '400'};
  position: relative;
  ${props =>
    props.isActive === props.optionMenu &&
    css`
      & > div {
        display: flex;
      }
    `}
`;

export const CustomIndicator = styled.div`
  position: absolute;
  display: none;
  width: 3rem;
  height: 0.25rem;
  background: rgb(92,32,166);
  background: linear-gradient(90deg, rgba(92,32,166,1) 0%, rgba(181,114,216,1) 100%);
  bottom: -1rem;
`;