const hashMap = () => {
  let head = null;

  const capacity = 16;
  let currentCapacity = capacity;
  let capacityCounter = 0;
  const loadFactor = 0.75;

  let bucketArray = Array.from({ length: capacity }).fill(null);

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % currentCapacity;
    }

    return hashCode;
  }

  return {
    set(key, value) {
      const hashCode = hash(key);
      head = bucketArray[hashCode];
      let currentLoadFactor = 0;

      if (!head) {
        bucketArray[hashCode] = nodeFactory(key, value, null);
        capacityCounter++;
        currentLoadFactor = capacityCounter / currentCapacity;
        if (currentLoadFactor >= loadFactor) {
          currentCapacity = currentCapacity * 2;
          let newBucketArray = new Array(currentCapacity).fill(null);

          bucketArray.forEach((bucket) => {
            if (bucket === null) {
              return;
            } else {
              let newHashCode = hash(bucket.key);
              newBucketArray[newHashCode] = nodeFactory(
                bucket.key,
                value,
                null,
              );
              bucketArray = newBucketArray;
            }
          });
        }
        return;
      }

      let cur = head;
      while (cur) {
        if (cur.key === key) {
          cur.value = value;
          return;
        }
        if (!cur.nextNode) break;
        cur = cur.nextNode;
      }

      cur.nextNode = nodeFactory(key, value, null);
    },
    get(key) {
      if (key == null) return undefined;

      for (let i = 0; i < bucketArray.length; i++) {
        let node = bucketArray[i];
        while (node) {
          if (node.key === key) return node.value;
          node = node.nextNode;
        }
      }

      return undefined;
    },
    has(key) {
      for (const k in bucketArray) {
        let node = bucketArray[k];

        while (node) {
          if (node.key === key) return true;
          node = node.nextNode;
        }
      }
      return false;
    },
    remove(key) {
      for (let i = 0; i < bucketArray.length; i++) {
        let node = bucketArray[i];
        let prev = null;

        while (node) {
          if (node.key === key) {
            if (prev) {
              // bypass node
              prev.nextNode = node.nextNode;
            } else {
              // removing head of bucket
              bucketArray[i] = node.nextNode;
            }
            // optional: clear removed node
            node.nextNode = null;
            return true;
          }
          prev = node;
          node = node.nextNode;
        }
      }
      return false;
    },
    length() {
      let length = 0;

      for (const k in bucketArray) {
        let node = bucketArray[k];
        while (node) {
          node = node.nextNode;
          length++;
        }
      }
      return length;
    },
    clear() {
      for (let i in bucketArray) bucketArray[i] = null;
    },
    keys() {
      let arrayWithKeys = [];
      for (let i in bucketArray) {
        let node = bucketArray[i];

        while (node) {
          arrayWithKeys.push(node.key);
          node = node.nextNode;
        }
      }
      return arrayWithKeys;
    },
    values() {
      const values = [];
      for (let i in bucketArray) {
        let node = bucketArray[i];
        while (node) {
          values.push(node.value);
          node = node.nextNode;
        }
      }
      return values;
    },
    array() {
      // expandHashMap();
      // console.log(capacityCounter);
      return bucketArray;
    },
  };
};

const nodeFactory = (key, value, nextNode = null) => {
  return { key, value, nextNode };
};

const test = hashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("barbies", "milky");

// console.log(test.length());
console.log(test.values());
console.log(test.array());
// console.log(test.remove("hats"));
