import "../common.css";


const getVSComponentStyle = () => {
 

  return `
  <style>
  :host {
    display: block;
    overflow-y: auto;
    scrollbar-width: none;
    position: relative;
    height: 100%;
  }

   .content {
     position: relative;
   }

  .placeholder {
    height: 1px;
    visibility: hidden;
  }
   </style>
  `;
};

export { getVSComponentStyle };
