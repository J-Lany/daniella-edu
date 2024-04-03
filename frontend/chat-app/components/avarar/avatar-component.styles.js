import "../common.css";

export function getAvatarStyles() {
  return `
  <style>
    @import url('../common.css');

    .avatar__img{
      max-width: 4.5rem;
      max-height: 4.5rem;
      border-radius: 3.2rem;
    }

    .avatar__abb {
      background-color: var(--blue-background);
      color: white;
      border-radius: 5rem;
      padding: 1rem;
      font-size: 3rem;
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