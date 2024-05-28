import "../common.css";

const getHeaderComponentStyle = () => {
  return `
  <style>
      @import url('../common.css');

      .header {
        background-color: var(--light-gray-background);
        padding-top: 1rem;
        padding-bottom: 1rem;
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
        border: none;
        color: var(--blue-background);
        font-size: 0.9rem;
        font-weight: 500;
        padding: 1rem;
      }

      .logout:hover {
        cursor: pointer;
        color: var(--light-blue-background:);
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
