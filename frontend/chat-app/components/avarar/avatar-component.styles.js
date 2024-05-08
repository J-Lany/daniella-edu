import "../common.css";

export function getAvatarStyles(displayMode) {
  const sizesByMode = {
    abbSize: displayMode == "sidebar" ? "1rem" : "1.375rem",
    gap: displayMode == "sidebar" ? "1rem" : "0.5rem",
    maxWidth: displayMode == "sidebar" ? "2rem" : "2.375rem",
  };

  return `
  <style>
    @import url('../common.css');

    .avatar__img{
      max-width: ${sizesByMode.maxWidth};
      max-height: ${sizesByMode.maxWidth};
      border-radius: 1rem;
    }

    .avatar__abb {
      background-color: var(--blue-background);
      color: white;
      border-radius: 1rem;
      padding: 1rem;
      font-size: ${sizesByMode.abbSize};
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
