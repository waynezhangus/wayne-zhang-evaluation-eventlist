import { Event } from "./model.js";

export class EventController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
    this.isFuture = false;
  }

  async init() {
    this.setUpEvents();
    await this.model.fetchEvents();
    this.view.initEvents(this.model.getEvents());
  }

  setUpEvents() {
    this.setUpAddEvent();
    this.setUpClickEvent();
    this.setUpFutureEvent();
  }

  setUpAddEvent() {
    this.view.addBtn.addEventListener("click", () => {
      if (document.querySelector("#event-new")) {
        return alert("Please finish adding current event");
      }
      this.view.addEvent(new Event());
      this.view.changeView("new", true);
    });
  }

  setUpFutureEvent() {
    this.view.futureBtn.addEventListener("click", () => {
      this.isFuture = !this.isFuture;
      this.futureHandler();
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
        id =
          e.target.dataset.id === "new" ? "new" : parseInt(e.target.dataset.id);
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

  futureHandler() {
    if (this.isFuture) {
      this.view.futureBtn.textContent = "Show all events";
      const filteredEvents = this.model
        .getEvents()
        .filter((event) => new Date(event.startDate) > new Date());
      this.view.initEvents(filteredEvents);
    } else {
      this.view.futureBtn.textContent = "Only show future events";
      this.view.initEvents(this.model.getEvents());
    }
  }

  saveHandler(id, name, start, end, e) {
    if (id === "new") {
      if (name === "" || start === "" || end === "") {
        return alert("Invalid input");
      }
      this.model.addEvent(new Event(name, start, end)).then((event) => {
        this.view.updateEvent(event, e.target);
        this.view.changeView(event.id, false);
        this.futureHandler();
      });
    } else {
      this.model.editEvent(id, new Event(name, start, end)).then((event) => {
        this.view.updateEvent(event);
        this.view.changeView(event.id, false);
        this.futureHandler();
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
    if (id === "new") this.view.removeEvent(id, e.target);
    else this.view.changeView(id, false);
  }
}
