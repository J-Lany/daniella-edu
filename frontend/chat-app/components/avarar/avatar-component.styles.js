import "../common.css";

export function getAvatarStyles() {
  return `
  <style>
    @import url('../common.css');
    .avatar{
      max-width: 4.5rem;
      max-height: 4.5rem;
      border-radius: 3.2rem;
    }
      
    @media screen and (max-width: 600px) {
      .avatar {
        max-width: 2.4rem;
        max-height: 2.4rem;
      }
    }
 </style>
`;
}
