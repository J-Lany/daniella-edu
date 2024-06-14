import "../common.css";

const getLogoutComponentStyle = () => {
  return `
  <style>
    @import url('../common.css');

    .logout {
      border: none;
      color: var(--blue-background);
      font-size: 2.5rem;
      font-weight: 600;
      transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;  
    }

    .logout:hover {
      transform: scale(1.1); 
      cursor: pointer;
      color: var(--light-blue-background);
    }

  </style>
  `;
};

export { getLogoutComponentStyle };
