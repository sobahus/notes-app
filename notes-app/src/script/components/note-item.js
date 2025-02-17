class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  set note(data) {
    this._note = data;

    if (this._note.archived) {
      this.setAttribute("archived", "true");
    } else {
      this.removeAttribute("archived");
    }
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .note {
          border: 2px solid #928dab;
          box-shadow: 0 4px 6px rgba(0 , 0, 0, 0.2);
          padding: 1rem;
          border-radius: 10px;
          margin: auto;
          background: #928dab;
          color: #fcf7f8;
        }

        .note-title {
          text-decoration: underline solid #8B5DFF 5px;
          font-weight: bold;
          margin-bottom: 1rem;
          font-size: 1em;
        }

        .note-body {
          white-space: pre-wrap;
        }

        :host([archived]) .note {
          background: #f0f0f0;
          text-decoration: line-through;
        }
      </style>
      <div class="note">
        <div class="note-title">${this._note.title}</div>
        <div class="note-body">${this._note.body}</div>
      </div>
    `;
  }
}
customElements.define("note-item", NoteItem);
export default NoteItem;
