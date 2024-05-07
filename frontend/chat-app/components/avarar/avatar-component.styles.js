import "../common.css";

export function getAvatarStyles(displayMode) {
  const sizesByMode = {
    abbSize: displayMode == "sidebar" ? "2rem" : "3.5rem",
    gap: displayMode == "sidebar" ? "1rem" : "0.5rem",
    maxWidth: displayMode == "sidebar" ? "2rem" : "3.5rem",
  };

  return `
  <style>
    @import url('../common.css');

    .avatar__img{
      max-width: ${sizesByMode.maxWidth};
      max-height: ${sizesByMode.maxWidth};
      border-radius: 3.2rem;
    }

    .avatar__abb {
      background-color: var(--blue-background);
      color: white;
      border-radius: 5rem;
      padding: 1rem;
      font-size: ${sizesByMode.maxWidth};
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
