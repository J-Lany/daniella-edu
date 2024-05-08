import "../common.css";

const getHeaderComponentStyle = () => {
  return `
  <style>
      @import url('../common.css');

      .header {
        background-color: var(--light-gray-background);
        padding-top: 1rem;
        padding-bottom: 1rem;
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
