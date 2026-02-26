import { Priority } from "@enums/priority";
import { State } from "@enums/state";

export interface Task {
    id: string;
    title: string;
    description: string;
    state: State;
    priority: Priority;
    weight: number,
    tags: string[],
    time: string,
    location: {
      id: string;
      name: string;
      type: string;
    },
    department: {
      id: string;
      name: string;
    },
    creator: {
      id: string;
      fullName: string;
    },
    assignee: {
      id: string;
      fullName: string;
    },
    creationDate: Date
}
