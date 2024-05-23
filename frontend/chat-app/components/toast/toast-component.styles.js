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
     
      .toast{
        border-left: 0.5rem solid ${colorByType.color};
        padding: 1.25rem;
        border-radius: 0.5rem;
        background-color: var(--white-background);
        display: grid;
        grid-template-columns: 1.3fr 6fr 0.5fr;
        box-shadow: 0 1px 5px var(--gray-text-color);
        max-width: 20rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
        color: var(--gray-text-color);
      }
   </style>
  `;
};

export { getToastComponentStyle };
