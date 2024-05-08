import "../common.css";

const getUserInfoBlockComponentStyle = () => {
  return `
  <style>
      @import url('../common.css');
      .user-info {
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
      }
      .user-info__img {
        max-width: 2.35rem;
        max-height:2.35rem;
        border-radius: 3.2rem;
      }
      .user-info__name {
        font-size: 1.25rem;
      }
      .user-info__status {
        font-size: 0.75rem;
        color:var(--gray-text-color);
      }
      @media screen and (max-width: 600px) {
        .user-info__img {
          max-width: 1.7rem;
          max-height: 1.7rem;
        }
        .user-info__name {
          font-size: 0.75rem;
        }
        .user-info__status {
          font-size: 0.5rem;
        }
      }
   </style>
  `;
};

export { getUserInfoBlockComponentStyle };
