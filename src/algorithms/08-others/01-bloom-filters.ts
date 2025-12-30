import XXH from 'xxhashjs';
const h1 = (string) =>
  Math.abs(XXH.h32(0xabcd).update(string).digest().toNumber() % 100);
const h2 = (string) =>
  Math.abs(XXH.h32(0x1234).update(string).digest().toNumber() % 100);
const h3 = (string) =>
  Math.abs(XXH.h32(0x6789).update(string).digest().toNumber() % 100);


export class BloomFilter {
  private array: any[];
  constructor() {
    this.array = new Array(100).fill(0);
  }
  add(text: string) {
    this.array[h1(text)] = 1;
    this.array[h2(text)] = 1;
    this.array[h3(text)] = 1;
  }
  contains(text: string) {
    console.log('[paolo-debug] this.array', this.array);

    return !!(
      this.array[h1(text)] &&
      this.array[h2(text)] &&
      this.array[h3(text)]
    );
  }
}

const bf = new BloomFilter;
bf.add("Paolo");
bf.add("Lung");
console.log('[paolo-debug]', bf.contains("Paolo"));
