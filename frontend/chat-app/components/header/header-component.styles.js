import "../common.css";

const getHeaderComponentStyle = () => {
  return `
  <style>
      @import url('../common.css');

      .header {
        background-color: var(--light-gray-background);
        padding-top: 2rem;
        padding-bottom: 2rem;
      }
      @media screen and (max-width: 600px) {
        .header {
          padding-bottom: 1.125rem;
          padding-top: 1.125rem;
        }
      }
   </style>
  `;
};

export { getHeaderComponentStyle };
