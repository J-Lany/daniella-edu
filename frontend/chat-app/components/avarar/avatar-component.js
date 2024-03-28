import { createAvatarTemplate } from "./avatar-component.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class AvatarComponent extends HTMLElement {
  #userService = diContainer.resolve(SERVICES.user);

  static get name() {
    return "avatar-component";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const user = this.#userService.getCurrentUser()
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createAvatarTemplate(user);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
