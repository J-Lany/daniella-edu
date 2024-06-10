import "../common.css";

const getHeaderComponentStyle = () => {
  return `
  <style>
      @import url('../common.css');

      .header {
        background-color: var(--light-gray-background);
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-right: 0.5rem;
        display: grid;
        grid-template-columns: 1fr auto; 
        justify-content: space-between;
        align-items: center;
      }

      .user-info {
        justify-self: center;
      }

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

      @media screen and (max-width: 600px) {
        .header {
          padding-bottom: 0.75rem;
          padding-top:0.75rem;
        }
      }
   </style>
  `;
};

export { getHeaderComponentStyle };
