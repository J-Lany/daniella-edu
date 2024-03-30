import "../common.css";

export function getNessageInfoBlockStyle() {
  return `
  <style>
    @import url('../common.css');

    .message-info{
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .message-info__author{
      font-weight: bold;
      font-size: 1.25rem;
    }
    
    .message-info__time{
      font-size: 0.75rem;
      color:var(--gray-text-color);
    }
  </style>
`;
}
