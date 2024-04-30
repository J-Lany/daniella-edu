import { createAvatarTemplate } from "./avatar-component.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

const avatarAttribute = {
  USER_ID: "user-id",
};

export class AvatarComponent extends HTMLElement {
  #userService = diContainer.resolve(SERVICES.user);
  #userId;

  #ATTRIBUTE_MAPPING = new Map([
    [avatarAttribute.USER_ID, this.setUserId.bind(this)],
  ]);

  static get name() {
    return "avatar-component";
  }

  static get observedAttributes() {
    return Object.values(avatarAttribute);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.unsubscribeFromUser = this.#userService.subscribeUserById(
      this.#userId,
      this.render.bind(this)
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      if (callback) {
        callback(newValue);
        this.render();
      }
    }
  }

  disconnectedCallback() {
    this.unsubscribeFromUser();
  }

  setUserId(newId) {
    this.#userId = newId;
  }

  render(user) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createAvatarTemplate(user);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
