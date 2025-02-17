import notesData from "./data/notes.js";
import "./components/note-form.js";
import "./components/note-item.js";

class NotesApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notes = notesData;
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener("note-added", (e) => {
      this.addNote(e.detail);
    });
  }

  addNote(note) {
    this.notes.push(note);
    this.renderNotes();
  }

  renderNotes() {
    const list = this.shadowRoot.getElementById("notesList");
    list.innerHTML = "";
    this.notes.forEach((noteData) => {
      const noteItem = document.createElement("note-item");
      noteItem.note = noteData;
      list.appendChild(noteItem);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
            .container {
                max-width: 768px;
                margin: auto;
                padding: 2rem;
            }

            #notesList {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                gap: 1rem;
            }

            @media (max-width: 768px) {
                #notesList {
                    grid-template-columns:repeat(auto-fill, minmax(210px, 1fr));
                }
            }

            @media (max-width: 375px) {
                .container{
                    padding: 1rem;
                    width: 100%;
                }
            }
        </style>

        <div class="container">
            <section>
                <note-form></note-form>
            </section>
            <br/>
            <section id="notesList" aria-label="Daftar Catatan"></section>
        </div>
    `;
    this.renderNotes();
  }
}

customElements.define("note-app", NotesApp);
export default NotesApp;
