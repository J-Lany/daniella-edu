import "../common.css";

export function getUserListStyle() {
  return `
     <style>
       @import url('../common.css');
       
       .user-list {
         display: flex;
         flex-direction: column;
         position: absolute;
         transform: translateY(-150%);
         left: 0;
         width: 95%;
         background-color: var(--mid-light-gray-background);
         border-radius: 1rem;
         opacity: 0;
         z-index: 0; 
         transition: transform 0.5s ease-in-out, z-index 0.5s ease-in-out, opacity 0.5s ease-in-out; 
       }
       
       .group {
         padding: 1rem;
         font-style: italic;
       }
       
       .open {
         opacity: 1;
         z-index: 2;
         transform: translateY(-12rem);
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
