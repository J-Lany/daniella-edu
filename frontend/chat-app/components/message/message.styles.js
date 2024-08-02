import "../common.css";

export function getMessageStyle() {
  return `
  <style>
    @import url('../common.css');

    .message-block {
      display: flex;
      gap: 1rem;
      align-items: center;
      font-family: inter;
      font-size: 1rem;
    }

   avatar-component {
      align-self: flex-start;
    }

    .new-block {
      margin-top: 1.5rem;
    }

    .continue-block {
      margin-top: 0.2rem;
    }

 .right {
      justify-self: flex-end;
    }

    .message-block__body {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      text-align: left;
    }

    .message-block__body.right {
      align-items: flex-end;
    }

    .message-block__body.left {
      align-items: flex-start;
    }

    .message-block__text {
      background-color: var(--white-blue-background);
      padding: 0.4rem;
      padding-left: 1rem;
      padding-right: 1rem;
      border-radius: 1rem;
    }

    .message-block__left {
      border-radius: 1rem 1rem 1rem 0.2rem;
    }
    .message-block__right {
      border-radius: 1rem 1rem 0.2rem 1rem;
    }

    .next-message__left {
      border-radius: 0.2rem 1rem 1rem 0.2rem;
    }

    .next-message__right {
      border-radius: 1rem 0.2rem 0.2rem 1rem;
    }

    .message-block__right.lastElement,
    .next-message__right.lastElement  {
      border-radius: 1rem 0.2rem 1rem 1rem;
    }

    .message-block__left.lastElement,
    .next-message__left.lastElement {
      border-radius: 0.2rem 1rem 1rem 1rem;
    }

   
      
  </style>
 `;
}
