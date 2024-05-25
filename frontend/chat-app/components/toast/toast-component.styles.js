import "../common.css";
import { TOAST_TYPE } from "./toast-component";

const getToastComponentStyle = (type) => {
  const colorByType = {
    color:
      type === TOAST_TYPE.sucsess ? "var(--green-color)" : "var(--red-error)",
  };

  return `
  <style>
      @import url('../common.css');

      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }

 
      .toast {
        display: flex;
        justify-content: space-between;
        min-width: 20rem;
        border: 1px solid ${colorByType.color};
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: inset 0 0 3px ${colorByType.color};
        max-width: 20rem;
        opacity: 0;
        animation: fadeIn 0.5s ease forwards;

      }

      .toast__text{
        font-size: 1rem;
      }

      .toast__text, .toast__symbol {
        align-self: center;
      }

      .toast__symbol{
        font-size: 2rem;
        color: ${colorByType.color}
      }

      .toast__button{
        background: transparent;
        border: none;
        font-size: 1.6rem;
        color: ${colorByType.color};
        line-height: 0;
        cursor:pointer;
        text-align: right;
      }
   </style>
  `;
};

export { getToastComponentStyle };
