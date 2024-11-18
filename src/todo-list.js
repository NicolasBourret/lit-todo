import { LitElement, html, css } from "lit";

const placeHolder = "New task...";

export class TodoList extends LitElement {
  static properties = {
    _tasks: { state: true },
    _newTask: { state: true },
  };

  static styles = css`
    .button {
      background-color: tan;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
  `;

  constructor() {
    super();

    this._tasks = ["Task 1"];
    this._newTask = placeHolder;
  }

  render() {
    return html`
      <div>
        <h1>Lit Todo List!</h1>
        <form>
          <input
            @input=${this.createTask}
            id="newTask"
            placeholder="Add a new task."
          />
          <button
            @click=${() => this.addTask(this._newTask)}
            type="button"
            class="button"
          >
            Add
          </button>
        </form>
        <ul>
          ${this._tasks.map(
            (task, i) =>
              html`<li>
                <input .value=${task} disabled /><button
                  @click=${() => this.deleteTask(i)}
                >
                  X
                </button>
              </li>`
          )}
          <li>
            <input
              value=${this._newTask}
              placeholder="${this._newTask}"
              disabled
            />
          </li>
        </ul>
      </div>
    `;
  }

  get input() {
    return this.renderRoot?.querySelector("#newTask") ?? null;
  }

  createTask(event) {
    this._newTask = event.target.value;
  }

  addTask() {
    if (this.input.value) {
      this._tasks = [...this._tasks, this.input.value];
      this._newTask = placeHolder;
    }
  }

  deleteTask(id) {
    this._tasks = this._tasks.filter((task, i) => i !== id);
  }
}

customElements.define("todo-list", TodoList);
