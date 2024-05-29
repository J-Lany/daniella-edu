import "../common.css";

export function getUserListStyle() {
  return `
     <style>
       @import url('../common.css');
       
       .chat-list {
          display: flex;
          flex-direction: column;
       }

       .chat-list-empty {
         text-align: center;
       }

       .chat-list__item {
          padding: 1.25rem;
          transition: background-color 0.2s ease-in-out;
       }

       .chat-list__item:hover {
         background: var(--white-background);
         cursor: pointer;
      }

     </style>
 `;
}