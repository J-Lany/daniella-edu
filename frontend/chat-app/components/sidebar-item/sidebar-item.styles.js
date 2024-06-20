import "../common.css";

export function getSidebarItemStyle() {
  return `
  <style>
    @import url('../common.css');

    .sidebar-item {
      display: flex;
      gap: 1rem;
      align-items: center;
      font-family: inter;
      font-size: 0.75rem;
    }

    .sidebar-item__body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      text-align: left;
    }
      
  </style>
 `;
}
