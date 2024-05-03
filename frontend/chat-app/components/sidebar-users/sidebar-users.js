import { createUsersSidebarTemplate } from "./sidebar-users.template";

const usersAttribute = {
  USERS: "users",
};

export class UsersSidebar extends HTMLElement {
  #users;
  #ATTRIBUTE_MAPPING = new Map([[usersAttribute.USERS, this.setUsers]]);

  static get name() {
    return "users-sidebar";
  }

  static get observedAttributes() {
    return Object.values(usersAttribute);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      if (callback) {
        callback(this, newValue);
      }
    }
  }

  setUsers(_, newUsers) {
    this.#users = newUsers;
  }

  render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createUsersSidebarTemplate(this.#users);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
