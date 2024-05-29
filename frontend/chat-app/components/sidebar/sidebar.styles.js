import "../common.css";

export function getSidebarStyle() {
  return `
     <style>
       @import url('../common.css');
       
       .chat-sidebar {
          align-self: flex-end;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: var(--light-gray-background);
          padding-top: 1rem;
          height: 100vh;
          width: 19rem;
          position: relative;
       }
      
       .avatar{
        max-width: 2rem;
        max-height: 2rem;
       }
     </style>
 `;
}
