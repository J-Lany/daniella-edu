import "../common.css";

export function getAvatarStyles() {
  return `
  <style>
    @import url('../common.css');

    .avatar {
      position: relative;
    }

    .dot {
      width: 0.5rem;
      height: 0.5rem;
      background-color: var(--orange-color);
      border: 1px solid var(--white-background);
      border-radius: 1rem;
      position: absolute;
      bottom: 0;
      right: 0;
    }

    .active {
      background-color: var(--green-color);
    }

    .sidebar-avatar__img {
      max-width: 2rem;
      max-height: 2rem;
      border-radius: 1rem;
    }
    .chat-avatar__img {
      max-width: 1.5rem;
      max-height: 1.5rem;
      border-radius: 1rem;
    }

    .sidebar-avatar__abb {
      font-size: 1rem;
    }

    .chat-avatar__abb {
      font-size: 0.8rem;
    }

    .avatar__abb {
      background-color: var(--blue-background);
      color: white;
      border-radius: 1rem;
      padding: 1rem;
      min-width: 1.3rem;
      min-height: 1.3rem;
    }
      
    @media screen and (max-width: 600px) {
      .avatar__img {
        max-width: 2.4rem;
        max-height: 2.4rem;
      }

      .avatar__abb {
        font-size: 1.50rem;
      }
    }
 </style>
`;
}
