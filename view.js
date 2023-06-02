export class EventView {
  constructor() {
    this.table = document.querySelector(".events");
    this.addBtn = document.querySelector(".app__add-btn");
    // this.input = document.querySelector("#form__input");
  }

  initEvents(events) {
    this.table.innerHTML = "";
    events.forEach((event) => {
      this.addEvent(event);
    });
  }

  addEvent(event) {
    const eventElem = this.createEventElem(event);
    this.table.append(eventElem);
  }

  removeEvent(id, e = null) {
    let eventElem;
    if (e) eventElem = e.parentElement.parentElement;
    else eventElem = document.getElementById(`event-${id}`);
    eventElem.remove();
  }

  updateEvent(event, e = null) {
    let eventElem;
    if (e) {
      eventElem = e.parentElement.parentElement;
      eventElem.setAttribute("id", `event-${event.id}`);
      eventElem.querySelector(".event__name").setAttribute("data-id", event.id);
      eventElem
        .querySelector(".event__start")
        .setAttribute("data-id", event.id);
      eventElem.querySelector(".event__end").setAttribute("data-id", event.id);
      eventElem
        .querySelector(".app__edit-btn")
        .setAttribute("data-id", event.id);
      eventElem
        .querySelector(".app__delete-btn")
        .setAttribute("data-id", event.id);
      eventElem
        .querySelector(".app__save-btn")
        .setAttribute("data-id", event.id);
      eventElem
        .querySelector(".app__cancel-btn")
        .setAttribute("data-id", event.id);
    } else eventElem = document.getElementById(`event-${event.id}`);

    eventElem.querySelector(".event__name-display").textContent =
      event.eventName;
    eventElem.querySelector(".event__start-display").textContent =
      event.startDate;
    eventElem.querySelector(".event__end-display").textContent = event.endDate;
  }

  changeView(id, isEdit) {
    let eventElem;
    if (id === "undefined") eventElem = this.table.lastChild;
    else eventElem = document.getElementById(`event-${id}`);
    const editBtn = eventElem.querySelector(`.app__edit-btn`);
    const deleteBtn = eventElem.querySelector(`.app__delete-btn`);
    const saveBtn = eventElem.querySelector(`.app__save-btn`);
    const cancelBtn = eventElem.querySelector(`.app__cancel-btn`);
    const inputs = eventElem.querySelectorAll(`input`);
    const displays = eventElem.querySelectorAll(`span`);

    if (isEdit) {
      editBtn.style.display = "none";
      deleteBtn.style.display = "none";
      saveBtn.style.display = "inline-block";
      cancelBtn.style.display = "inline-block";
      displays.forEach((display) => {
        display.style.display = "none";
      });
      inputs.forEach((input) => {
        input.style.display = "inline-block";
      });
    } else {
      editBtn.style.display = "inline-block";
      deleteBtn.style.display = "inline-block";
      saveBtn.style.display = "none";
      cancelBtn.style.display = "none";
      displays.forEach((display) => {
        display.style.display = "inline-block";
      });
      inputs.forEach((input) => {
        input.style.display = "none";
      });
    }
  }

  createEventElem(event) {
    const eventElem = document.createElement("tr");
    eventElem.classList.add("event");
    eventElem.setAttribute("id", `event-${event.id}`);

    const name = document.createElement("input");
    name.classList.add("event__name");
    name.value = event.eventName;
    name.setAttribute("data-id", event.id);
    name.style.display = "none";
    const displayName = document.createElement("span");
    displayName.classList.add("event__name-display");
    displayName.textContent = event.eventName;
    const nameTd = document.createElement("td");
    nameTd.append(name, displayName);

    const start = document.createElement("input");
    start.setAttribute("type", "date");
    start.classList.add("event__start");
    start.value = event.startDate;
    start.setAttribute("data-id", event.id);
    start.style.display = "none";
    const displayStart = document.createElement("span");
    displayStart.classList.add("event__start-display");
    displayStart.textContent = event.startDate;
    const startTd = document.createElement("td");
    startTd.append(start, displayStart);

    const end = document.createElement("input");
    end.setAttribute("type", "date");
    end.classList.add("event__end");
    end.value = event.endDate;
    end.setAttribute("data-id", event.id);
    end.style.display = "none";
    const displayEnd = document.createElement("span");
    displayEnd.classList.add("event__end-display");
    displayEnd.textContent = event.endDate;
    const endTd = document.createElement("td");
    endTd.append(end, displayEnd);

    const editBtn = document.createElement("button");
    editBtn.classList.add("app__edit-btn");
    editBtn.setAttribute("data-id", event.id);
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("app__delete-btn");
    deleteBtn.setAttribute("data-id", event.id);
    deleteBtn.textContent = "Delete";

    const saveBtn = document.createElement("button");
    saveBtn.classList.add("app__save-btn");
    saveBtn.setAttribute("data-id", event.id);
    saveBtn.textContent = "Save";
    saveBtn.style.display = "none";

    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("app__cancel-btn");
    cancelBtn.setAttribute("data-id", event.id);
    cancelBtn.textContent = "Cancel";
    cancelBtn.style.display = "none";

    const actionTd = document.createElement("td");
    actionTd.append(editBtn, deleteBtn, saveBtn, cancelBtn);

    eventElem.append(nameTd, startTd, endTd, actionTd);
    return eventElem;
  }
}
