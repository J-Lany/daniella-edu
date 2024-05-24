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
        gap: 1rem;
        border-left: 0.5rem solid ${colorByType.color};
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        padding-left: 0.75rem;
        border-radius: 0.5rem;
        background-color: rgba(var(--white-background), 0.5);
        box-shadow: 0 0.5px 3px var(--gray-text-color);
        max-width: 20rem;
        opacity: 0;
        animation: fadeIn 0.5s ease forwards;

      }

      .toast__text{
        font-size: 0.75rem;
        font-weight: 500;
      }

      .toast__text, .toast__symbol {
        align-self: center;
      }

      .toast__symbol{
        font-size: 2rem;
        color: ${colorByType.color}
      }

      .toast__button{
        align-self: flex-start;
        background: transparent;
        border: none;
        font-size: 1.6rem;
        line-height: 0;
        cursor:pointer;
        text-align: right;
        color: var(--gray-text-color);
      }
   </style>
  `;
};

export { getToastComponentStyle };
