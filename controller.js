import { Event } from "./model.js";

export class EventController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  async init() {
    this.setUpEvents();
    await this.model.fetchEvents();
    this.view.initEvents(this.model.getEvents());
  }

  setUpEvents() {
    this.setUpAddEvent();
    this.setUpClickEvent();
  }

  setUpAddEvent() {
    this.view.addBtn.addEventListener("click", () => {
      this.view.addEvent(new Event());
      this.view.changeView(undefined, true);
    });
  }

  setUpClickEvent() {
    this.view.table.addEventListener("click", (e) => {
      const isSaveBtn = e.target.classList.contains("app__save-btn");
      const isDeleteBtn = e.target.classList.contains("app__delete-btn");
      const isEditBtn = e.target.classList.contains("app__edit-btn");
      const isCancelBtn = e.target.classList.contains("app__cancel-btn");

      let id, name, start, end;

      if (isSaveBtn || isDeleteBtn || isEditBtn || isCancelBtn) {
        id = e.target.dataset.id;
        name = document.querySelector(`.event__name[data-id="${id}"]`).value;
        start = document.querySelector(`.event__start[data-id="${id}"]`).value;
        end = document.querySelector(`.event__end[data-id="${id}"]`).value;
      }

      if (isSaveBtn) this.saveHandler(id, name, start, end, e);
      if (isDeleteBtn) this.deleteHandler(id);
      if (isEditBtn) this.editHandler(id);
      if (isCancelBtn) this.cancelHandler(id, e);
    });
  }

  saveHandler(id, name, start, end, e) {
    if (id === "undefined") {
      if (name === "" || start === "" || end === "")
        return alert("Invalid input");
      this.model.addEvent(new Event(name, start, end)).then((event) => {
        console.log(event);
        this.view.updateEvent(event, e.target);
        this.view.changeView(event.id, false);
      });
    } else {
      this.model.editEvent(id, new Event(name, start, end)).then((event) => {
        this.view.updateEvent(event);
        this.view.changeView(event.id, false);
      });
    }
  }

  deleteHandler(id) {
    this.model.removeEvent(id).then(() => {
      this.view.removeEvent(id);
    });
  }

  editHandler(id) {
    this.view.changeView(id, true);
  }

  cancelHandler(id, e) {
    if (id === "undefined") this.view.removeEvent(id, e.target);
    else this.view.changeView(id, false);
  }

  // setUpEditEvent() {
  //   this.view.table.addEventListener("click", (e) => {
  //     const isSaveBtn = e.target.classList.contains("app__save-btn");
  //     if (isSaveBtn) {
  //       const saveId = e.target.dataset.id;
  //       const name = document.querySelector(
  //         `.event__name[data-id="${saveId}"]`
  //       ).value;
  //       const start = document.querySelector(
  //         `.event__start[data-id="${saveId}"]`
  //       ).value;
  //       const end = document.querySelector(
  //         `.event__end[data-id="${saveId}"]`
  //       ).value;
  //       this.model.addEvent(saveId, new Event(name)).then((event) => {
  //         this.view.changeButton(saveId, false);
  //       });
  //     }
  //   });
  // }

  // setUpClickEvent() {
  //   this.view.todoList.addEventListener("click", (e) => {
  //     const isDeleteBtn = e.target.classList.contains("todo__delete-btn");
  //     const isEditBtn = e.target.classList.contains("todo__edit-btn");
  //     if (isDeleteBtn) {
  //       const removeId = e.target.dataset.id;
  //       this.model.removeTodo(removeId).then(() => {
  //         this.view.removeTodo(removeId);
  //       });
  //     }
  //     if (isEditBtn) {
  //       const editId = e.target.dataset.id;
  //       const title = document.querySelector(
  //         `.todo__title[data-id="${editId}"]`
  //       ).textContent;
  //       this.model.editTodo(editId, new Todo(title));
  //     }
  //   });
  // }
}
