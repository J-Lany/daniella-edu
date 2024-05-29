import "../common.css";

export function getUserListStyle() {
  return `
     <style>
       @import url('../common.css');
       
       .user-list {
         display: none;
         position: absolute;
         top: 4rem;
         left: 0;
         width: 100%;
         height: 100%;
         background-color: var( --light-gray-background);
       }

       .open {
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
