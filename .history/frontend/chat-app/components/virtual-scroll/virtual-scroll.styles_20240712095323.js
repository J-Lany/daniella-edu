import "../common.css";


const getVSComponentStyle = (rowHeight) => {
 

  return `
  <style>
  .container {
    overflow-y: auto;
  }

  .block {
    height: ${rowHeight}px;
  }
   </style>
  `;
};

export { getVSComponentStyle };
