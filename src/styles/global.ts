import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    outline-color: transparent;
    outline-style: none;
  }

  html {
    font-size: 100%;
  }

  @media (max-width: 1024px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 768px) {
    html {
      font-size: 87.5%;
    }
  }

  @media (max-width: 640px) {
    html {
      font-size: 81.25%;
    }
  }

  body {
    background: #1D1F3E;
    color: white;
  }

  html, body {
    -ms-overflow-style: none;
    scrollbar-width: none;
    overscroll-behavior: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  body, input, textarea, select, button {
    font: 500 1rem 'Poppins', sans-serif;
    letter-spacing: 0.03rem;
    color: #fff;
  }

  a, button, input {
    border: none;
    background: transparent;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  a, button {
    cursor: pointer;
  }
`;