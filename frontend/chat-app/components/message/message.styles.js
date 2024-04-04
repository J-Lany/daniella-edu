import "../common.css";

export function getMessageStyle() {
  return `
     <style>
       @import url('../common.css');

       .message-block{
        display: flex;
        gap: 1rem;
        align-items: center;
        font-family: inter;
        font-size: 0.75rem;
      }
    
      .message-block__body{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        text-align: left;
      }   

     </style>
 `;
}
