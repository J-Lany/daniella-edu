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
        max-width: 4.5rem;
        max-height: 4.5rem;
        border-radius: 3.2rem;
      }
      .user-info__name {
        font-size: 3rem;
      }
      .user-info__status {
        font-size: 1.25rem;
        color:var(--gray-text-color);
      }
      @media screen and (max-width: 600px) {
        .user-info__img {
          max-width: 2.4rem;
          max-height: 2.4rem;
        }
        .user-info__name {
          font-size: 1.5rem;
        }
        .user-info__status {
          font-size: 0.75rem;
        }
      }
   </style>
  `;
};

export { getUserInfoBlockComponentStyle };
