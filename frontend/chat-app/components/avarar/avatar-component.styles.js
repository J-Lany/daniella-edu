import "../common.css";

export function getAvatarStyles() {
  return `
  <style>
    @import url('../common.css');

    .sidebar-avatar__img {
      max-width: 2rem;
      max-height: 2rem;
      border-radius: 1rem;
    }
    .chat-avatar__img {
      max-width: 2.375rem;
      max-height: 2.375rem;
      border-radius: 1rem;
    }

    .sidebar-avatar__abb {
      font-size: 1rem;
    }

    .chat-avatar__abb {
      font-size: 1.375rem;
    }

    .avatar__abb {
      background-color: var(--blue-background);
      color: white;
      border-radius: 1rem;
      padding: 1rem;
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
