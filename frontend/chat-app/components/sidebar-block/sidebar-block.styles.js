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
       }

       .close-button{
         border-bottom: 0.5px solid var(--gray-text-color);
         border-top: 0.5px solid var(--gray-text-color);
         font-weight: bold;
         padding: 0.5rem;
         color: var(--gray-text-color);
         transition: background-color 0.2s ease-in-out;
       }

       .close-button:hover {
         background: var(--light-gray-background);
         cursor: pointer;
       }

     </style>
 `;
}
