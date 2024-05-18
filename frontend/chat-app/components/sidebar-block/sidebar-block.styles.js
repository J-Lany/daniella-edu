import "../common.css";

export function getSidebarBlockStyle() {
  return `
     <style>
       @import url('../common.css');
       
       .sidebar-block {
          display: flex;
          flex-direction: column;
       }

       .sidebar-empty {
         text-align: center;
       }

       .sidebar-block__item {
          padding: 1.25rem;
          transition: background-color 0.2s ease-in-out;
       }

       .sidebar-block__item:hover {
         background: var(--white-background);
         cursor: pointer;
      }

     </style>
 `;
}
