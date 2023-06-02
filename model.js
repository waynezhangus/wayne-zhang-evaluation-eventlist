// Granular data type
export class Event {
  constructor(eventName = "", startDate = new Date(), endDate = new Date()) {
    this.eventName = eventName;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

// API interface
const API = (function () {
  const API_URL = "http://localhost:3000/events";

  const getEvents = async () => {
    const res = await fetch(`${API_URL}`);
    return await res.json();
  };

  const postEvent = async (newEvent) => {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newEvent),
    });
    return await res.json();
  };

  const putEvent = async (id, newEvent) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newEvent),
    });
    return await res.json();
  };

  const deleteEvent = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  };

  return {
    getEvents,
    postEvent,
    putEvent,
    deleteEvent,
  };
})();

// Model
export class EventModel {
  events = [];

  getEvents() {
    return this.events;
  }
  async fetchEvents() {
    this.events = await API.getEvents();
  }
  async addEvent(newEvent) {
    const event = await API.postEvent(newEvent);
    this.events.push(event);
    return event;
  }
  async editEvent(id, newEvent) {
    const event = await API.putEvent(id, newEvent);
    this.events = this.events.map((oldEvent) =>
      oldEvent.id === id ? { ...oldEvent, ...event } : oldEvent
    );
    return event;
  }
  async removeEvent(id) {
    const event = await API.deleteEvent(id);
    this.events = this.events.filter((event) => event.id !== id);
    return event;
  }
}
