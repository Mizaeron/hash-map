
const nodeFactory = (value, nextNode = null) => {
  return { value, nextNode };
};

const linkedListsFactory = () => {
  let head = null;
  let tail = null;
  let length = 0;

  return {
    append(value) {
      const newNode = nodeFactory(value);
      if (!head) {
        head = tail = newNode;
      } else {
        tail.nextNode = newNode;
        tail = newNode;
      }
      console.log(head);
      length++;
      return newNode;
    },
    prepend(value) {
      const newNode = nodeFactory(value, head);
      head = newNode;
      if (!tail) tail = newNode;
      length++;
      return this;
    },
    size() {
      return length;
    },
    firstValue() {
      return tail ? tail.value : undefined;
    },
    tailValue() {
      if (!head) return undefined;
      let cur = head;
      while (cur.next) cur = cur.next;
      return cur.value;
    },
    at(index) {
      if (index < 0) return undefined;
      let cur = head;
      let i = 0;
      while (cur && i < index) {
        cur = cur.nextNode;
        i++;
      }
      return cur ? cur.value : undefined;
    },
    pop() {
      if (!head) return undefined.
      // remove head and return its value
      const removed = head;
      head = head.nextNode;
      if (!head) tail = null;
      length = Math.max(0, length - 1);
      return removed.value;
    },
    contains(value) {
      let cur = head;
      while (cur) {
        if (cur.value === value) return true;
        cur = cur.nextNode;
      }
      return false;
    },
    findIndex(value) {
      let index = 0;
      let cur = head;
      while (cur) {
        if (cur.value === value) return index;
        cur = cur.nextNode;
        index++;
      }
      return -1;
    },
    toString() {
      if (!head) return "";
      const parts = [];
      let cur = head;
      while (cur) {
        parts.push(`( ${cur.value} )`);
        cur = cur.nextNode;
      }
      return parts.join(" -> ") + " -> null";
    },
  };
};

const list = linkedListsFactory();
// list.append("dog");
// list.append("cat");
// list.append("parrot");
// console.log(list.append("hamster"));
// console.log(list.append("snake"));
// console.log(list.append("turtle"));

// console.log(list.toString());
// console.log(list.size());

// const arr = [];
// arr[0] = linkedListsFactory();

// console.log(arr[0].append("hamster"));
// console.log(arr[0].append("snake"));
// console.log(arr[0].toString()); // ( hamster ) -> ( snake ) -> null
// console.log(arr[0].size()); // 2
