import "../common.css";

export function getSidebarBlockStyle() {
  return `
     <style>
       @import url('../common.css');
       
       .sidebar-block {
          display: flex;
          flex-direction: column;
          gap: 1rem;
       }

       .sidebar-block__item {
          border-bottom: 0.5px solid var(--gray-text-color);
          padding: 0.5rem;
          transition: background-color 0.2s ease-in-out;
       }

       .sidebar-block__item:hover {
         background: var(--light-gray-background);
         cursor: pointer;
      }

       .close-button{
         border-top: 0.5px solid var(--gray-text-color);
         font-weight: bold;
         color: var(--gray-text-color);
       }


     </style>
 `;
}
