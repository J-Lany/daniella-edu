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
       }

       .modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
      }
      
      .modal .open {
        display: block;
      }
      
       .avatar{
        max-width: 2rem;
        max-height: 2rem;
       }
     </style>
 `;
}
