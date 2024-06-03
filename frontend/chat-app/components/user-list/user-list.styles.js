import "../common.css";

export function getUserListStyle() {
  return `
     <style>
       @import url('../common.css');
       
       .user-list {
         display: none;
         position: absolute;
         top: 4.2rem;
         left: 0;
         width: 95%;
         background-color: var(--mid-light-gray-background);
         border-radius: 1rem;
         transition: transform 0.5s ease-in-out;
         transform: translateY(100%);
         will-change: transform;       
       }
       .group {
         padding: 1rem;
         font-style: italic;
       }
       
       .open {
         display: flex;
         flex-direction: column;
         transform: translateY(0);
       }

       .user-list-empty {
         text-align: center;
         padding: 1rem;
       }

       .user-list__item {
          padding: 1.25rem;
          transition: background-color 0.2s ease-in-out, border-radius 0.2s ease-in-out;
       }

       .user-list__item:hover {
         background: var(--white-background);
         cursor: pointer;
         border-radius: 1rem;
      }

     </style>
 `;
}
