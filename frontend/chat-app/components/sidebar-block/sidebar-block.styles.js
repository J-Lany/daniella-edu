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
     </style>
 `;
}
