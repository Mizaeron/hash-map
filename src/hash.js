const hashMap = () => {
  let head = null;

  const capacity = 16;
  let mama;
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
      let head = bucketArray[hashCode];
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

console.log(test.array());
