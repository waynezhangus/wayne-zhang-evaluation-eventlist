import { Event, EventModel } from "./model.js";
import { EventView } from "./view.js";
import { EventController } from "./controller.js";

const model = new EventModel();
const view = new EventView();
const controller = new EventController(model, view);
