import { createAvatarTemplate } from "./avatar-component.template";
import defaultAvatar from "../../accets/defaultAvatar.jpg";

export class AvatarComponent extends HTMLElement {
  static get name() {
    return "avatar-component";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render(defaultAvatar);
  }

  render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createAvatarTemplate(defaultAvatar);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
