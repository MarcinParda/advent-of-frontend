const uuid = require('uuid');

interface Audit {
  order: number;
  state: string;
}

export class OrderController {
  #machines: Machine[] = [];
  #isStateValid(state: string) {
    return !['unknown'].includes(state);
  }
  registerMachine(machine: Machine) {
    this.#machines = [...this.#machines, machine];
  }
  unregisterMachine(machine: Machine) {
    this.#machines = this.#machines.filter((m) => m.id !== machine.id);
  }
  setState(state: string) {
    if (!this.#isStateValid(state)) {
      throw new Error('Invalid state provided');
    }
    this.#machines.forEach((machine) => {
      machine.state = state;
    });
  }
}

export class Machine {
  #id = uuid.v4();
  #order = 0;
  #state: string | null = null;
  #audit: Audit[] = [];

  get id() {
    return this.#id;
  }
  get state(): string | null {
    return this.#state;
  }
  set state(state: string) {
    this.addAuditEntry(state, ++this.#order);
    this.#state = state;
  }
  addAuditEntry(state: string, order: number) {
    this.#audit = [...this.#audit, { state, order }];
  }
  performAudit() {
    return this.#audit.map((audit) => `Order #${audit.order} - ${audit.state}`);
  }
}
