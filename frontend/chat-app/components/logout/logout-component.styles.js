import "../common.css";

const getLogoutComponentStyle = () => {
  return `
  <style>
    @import url('../common.css');

    .logout {
      border-radius: 50%;
      padding-left: 0.9rem;
      padding-right: 0.9rem;
      border: 1px solid var(--blue-background);
      color: var(--blue-background);
      font-size: 2.5rem;
      font-weight: 600;
      transition: transform 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease-in-out;  
    }

    .logout:hover {
      transform: scale(1.1); 
      cursor: pointer;
      color: var(--white-background);
      background-color: var(--blue-background);
      
    }

  </style>
  `;
};

export { getLogoutComponentStyle };
