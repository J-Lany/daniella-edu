import "../common.css";

export function getSidebarStyle() {
  return `
     <style>
       @import url('../common.css');
       
       .chat-sidebar{
          display: flex;
          flex-direction: column;
          gap: 1rem;
       }

       .user-info {
         display: flex;
         justify-content: center;
         align-items: center;
         gap: 1rem;
         border-bottom: 0.5px solid var( --gray-text-color);
       }

       .user-info__name {
          font-size: 1.5rem;
       }

       .avatar{
        max-width: 2rem;
        max-height: 2rem;
       }
     </style>
 `;
}
