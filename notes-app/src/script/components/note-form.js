class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
        <style>
            form {
                display: flex;
                margin: 1rem;
                flex-direction: column;
                gap: 1rem;
                background-color: #928dab;
                padding: 2rem;
                border-radius: 20px;
                flex-wrap: no-wrap;
                box-shadow: 0 6px 4px rgba(0, 0, 0, 0.2)
            }

            input, textarea {
                padding: 1rem;
                outline: none;
                border: none;
                border-radius: 10px;
                font-size: 1em;
                transition: 0.3s ease-out;
            }

            textarea:focus{
                box-shadow: 0 6px 6px gray;
                transform: translateY(-1px);
            }

            input:focus {
                outline: none;
                transform: translateY(-1px);
                box-shadow: 0 4px 6px gray;
            }

            button {
                font-size: 1em;
                padding: 1rem;
                width: auto;
                background: #fcf7f8;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                transition: ease-out 0.3s ;
                color: #09122C;
            }

            button:hover {
                background: #fff;
                color: #000;
                transform: translateY(-1px);
                box-shadow: 0 8px 6px gray;
            }

            .error {
                color: #E52020;
                font-size: 0.9em;
            }

        </style>
        <form id="noteForm">
          <input type="text" id="title" name="title" placeholder="Judul Catatan" required>
          <textarea id="body" name="body" placeholder="Isi Sebuah Catatan" rows="4" required></textarea>
          <span id="error" class="error"></span>
          <button type="submit">Tambahkan Catatan</button>
        </form>
      `;

    const form = this.shadowRoot.getElementById("noteForm");
    form.addEventListener("submit", this.handleSubmit.bind(this));

    const titleInput = this.shadowRoot.getElementById("title");
    const bodyInput = this.shadowRoot.getElementById("body");
    titleInput.addEventListener("input", this.validate.bind(this));
    bodyInput.addEventListener("input", this.validate.bind(this));
  }
  validate() {
    const title = this.shadowRoot.getElementById("title").value;
    const body = this.shadowRoot.getElementById("body").value;
    const errorSpan = this.shadowRoot.getElementById("error");
    if (title.trim() === "" || body.trim() === "") {
      errorSpan.textContent = "Semua Field harus Diisi!";
      return false;
    } else {
      errorSpan.textContent = "";
      return true;
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    if (!this.validate()) return;
    const newNote = {
      id: "notes-" + Date.now(),
      title: this.shadowRoot.getElementById("title").value,
      body: this.shadowRoot.getElementById("body").value,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.dispatchEvent(
      new CustomEvent("note-added", {
        detail: newNote,
        bubbles: true,
        composed: true,
      })
    );
    event.target.reset();
  }
}
customElements.define("note-form", NoteForm);
export default NoteForm;
