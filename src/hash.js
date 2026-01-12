const hashMap = () => {
  let head = null;
  let tail = null;
  const capacity = 16;
  let currentCapacity = capacity;
  const loadFactor = 0.75;
  const bucketArray = Array.from({ length: capacity }).fill(null);

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % currentCapacity;
    }

    return hashCode;
  }
  function expandHashMap() {
    let n = 0;
    let currentLoadFactor = 0;

    bucketArray.forEach((bucket) => {
      if (bucket !== null) {
        n++;
      }
    });

    currentLoadFactor = n / currentCapacity;

    if (currentLoadFactor > currentCapacity) {
      //
    }

    console.log(n);
    console.log(currentLoadFactor);
  }
  return {
    set(key, value) {
      const hashCode = hash(key);
      let head = bucketArray[hashCode];

      if (!head) {
        bucketArray[hashCode] = nodeFactory(key, value, null);
        expandHashMap();
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
    array() {
      expandHashMap();
      // const count = expandHashMap();
      // console.log(count);
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
test.set("breastam", "milfy");

console.log(test.array());
