import styled, { css } from 'styled-components';

export const TrackItemBase = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;

  img {
    height: 100%;
    border-radius: 0.5rem;
  }

  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 1.25rem;
  }
`;

export const TrackInfo = styled.div`
  max-width: 14rem;

  p:nth-child(1) {
    font-size: 1rem;
    font-weight: 600;
  }
  p:nth-child(2) {
    margin-top: 0.1rem;
    font-size: 0.85rem;
    font-weight: 400;
  }
`;

interface TrackAuxInfoProps {
  isFavorite: boolean;
}

export const TrackAuxInfo = styled.div<TrackAuxInfoProps>`
  display: flex;
  align-items: center;

  span {
    margin-left: 1rem;
    font-size: 1rem;
    font-weight: 600;
  }

  button {
    margin-left: 2rem;

    svg {
      font-size: 1.75rem;
      ${props => 
        props.isFavorite &&
        css`
          color: #f72585;
        `}
    }
  }
`;