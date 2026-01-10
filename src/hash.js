export const hashMap = () => {
  const capacity = 16;
  const loadFactor = 0.75;
  const buckets = Array.from({ length: capacity }, () => []);

  return {
    set(key, value) {
      const hashKey = hash(key);
      const bucket = (buckets[hashKey - 1] = { [hashKey]: value });
      for (const k of Object.keys(bucket)) {
        console.log(k);
      }
      return bucket;
    },
    array() {
      return buckets;
    },
  };
};

export function hash(key) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
  }

  return hashCode;
}

const test = hashMap();

console.log(test.set("apple", "red"));
console.log(test.set("banana", "yellow"));

// test.set("banana", "yellow");
// test.set("banana", "blue");
// test.set("apple", "red");
console.log(test.array());
