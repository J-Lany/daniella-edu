import "../common.css";


const getVSComponentStyle = () => {
 

  return `
  <style>
  .container {
    display: grid;
    overflow-y: auto;
    height: 100%;
  }

  .sub-container {
    align-self: end;
  }

   </style>
  `;
};

export { getVSComponentStyle };
