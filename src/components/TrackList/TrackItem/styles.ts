import styled, { css, keyframes } from 'styled-components';

interface ButtonStartPlayerProps {
  maxWidthAuxInfo: number;
}

interface ButtonFavoriteProps {
  isFavorite: boolean;
}

const favoriteSelected = keyframes`
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(1.5, 1.5);
  }
`;

export const TrackItemBase = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
`;

export const ButtonStartPlayer = styled.button<ButtonStartPlayerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  img {
    height: 70%;
    border-radius: 0.5rem;
  }

  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 1.25rem;
    ${props => 
      props.maxWidthAuxInfo !== 0 &&
      css`
        max-width: calc(${props.maxWidthAuxInfo}px);
      `}
  }
`;

export const TrackInfo = styled.div`
  width: 90%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    text-align: start;
  }

  p:nth-child(1) {
    font-size: 0.95rem;
    font-weight: 600;
  }
  p:nth-child(2) {
    margin-top: 0.1rem;
    font-size: 0.75rem;
    font-weight: 400;
  }
`;

export const TrackAuxInfo = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 1rem;
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const ButtonFavorite = styled.button<ButtonFavoriteProps>`
  margin-left: 2rem;

  svg {
    font-size: 1.75rem;
    ${props => 
      props.isFavorite &&
      css`
        color: #f72585;
        animation: ${favoriteSelected} 100ms;
      `}
  }
`;