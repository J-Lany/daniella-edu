import "../common.css";


const getVSComponentStyle = () => {
 

  return `
  <style>
  .container {
    overflow-y: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

  .sub-container {

  }

   </style>
  `;
};

export { getVSComponentStyle };
