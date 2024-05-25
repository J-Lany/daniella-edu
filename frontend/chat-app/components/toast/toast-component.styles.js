import "../common.css";
import { TOAST_TYPE } from "./toast-component";

const getToastComponentStyle = (type) => {
  const colorByType = {
    borderColor:
      type === TOAST_TYPE.sucsess ? "var(--green-color)" : "var(--red-error)",
    backgroundColor:
      type === TOAST_TYPE.sucsess
        ? "var(--light-green-background)"
        : "var(--red-error-background)",
  };

  return `
  <style>
      @import url('../common.css');

      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }

      @keyframes fadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }      
 
      .toast {
        display: flex;
        justify-content: space-between;
        min-width: 20rem;
        border: 1px solid ${colorByType.borderColor};    background-color: ${colorByType.backgroundColor};
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: inset 0 0 1px ${colorByType.borderColor};
        max-width: 20rem;
        opacity: 0;
        animation: fadeIn 0.5s ease forwards;

      }

      .fade-out {
        animation: fadeOut 0.2s ease forwards;
      }
      

      .toast__text{
        font-size: 0.9rem;
      }

      .toast__text, .toast__symbol {
        align-self: center;
      }

      .toast__symbol{
        font-size: 2rem;
        color: ${colorByType.borderColor}
      }

      .toast__button{
        background: transparent;
        border: none;
        font-size: 1.6rem;
        color: ${colorByType.borderColor};
        line-height: 0;
        cursor:pointer;
        text-align: right;
      }

      @media screen and (max-width: 600px) {
        .toast {
          min-width: 15rem;
        }
      }
   </style>
  `;
};

export { getToastComponentStyle };
