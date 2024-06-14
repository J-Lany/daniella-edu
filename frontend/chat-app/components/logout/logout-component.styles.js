import "../common.css";

const getLogoutComponentStyle = () => {
  return `
  <style>
    @import url('../common.css');

    .logout {
      justify-self: end;
      padding-top: 0.2rem;
      padding-bottom: 0.3rem;
      padding-left: 1rem;
      padding-right: 1rem;
      border: none;
      background: linear-gradient(to bottom,var(--blue-background), var( --light-blue-background));
      border-radius: 1rem;
      color: var( --white-background);
      font-size: 0.9rem;
      font-weight: 500;
      transition: background 0.2s ease-in-out;
    }

    .logout:hover {
      cursor: pointer;
      background: linear-gradient(to bottom,var( --light-blue-background), var(--blue-background));
    }
    
  </style>
  `;
};

export { getLogoutComponentStyle };
