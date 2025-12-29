// in order to pass the unit tests, you will need to create a function called createTrie that accepts a list of strings
// as a parameter and returns an object with a method on it called "`complete`. complete is a method that when called
// with a string will return an array of up to length three that are autocompleted suggestions of how to finish that string.
// for the sake of this exercise, it does not matter which order these strings are returned in or if there are more than three
// possible suggestions, which three you choose

export const createTrie = (words: string[]) => {
  const root = new TrieNode("");

  for (let word of words) {
    root.add(word.toLowerCase());
  }

  return root;
};

class TrieNode {
  char: string;
  childNodes: TrieNode[];
  terminus: boolean;

  constructor(word: string) {
    this.childNodes = [];
    this.terminus = false;
    this.char = word[0];

    if (word.length > 1) {
      this.childNodes.push(new TrieNode(word.substring(1)));
    } else {
      this.terminus = true;
    }
  }

  add(word: string) {
    const char = word[0];
    const next = word.substring(1);

    for (let i = 0; i < this.childNodes.length; i++) {
      const childNode: TrieNode = this.childNodes[i];

      // same letter will be ignored to add its childNodes
      if (childNode.char === char) {
        if (next) {
          childNode.add(next);
        }
        else {
          childNode.terminus = true;
        }
        return;
      }
    }


    // ignore same prefix letters, add remaining letters
    this.childNodes.push(new TrieNode(word));
  }

  complete(search: string) {
    let completions = [];

    for (let i = 0; i < this.childNodes.length; i++) {
      const childNode: TrieNode = this.childNodes[i];
      completions = completions.concat(childNode._complete(search, "", []));
    }

    return completions;
  }

  private _complete(search: string, built: string, suggestions: string[]): any {
    if (suggestions.length >= 3 || (search && search[0] !== this.char)) {
      return suggestions;
    }

    if (this.terminus) {
      suggestions.push(built + this.char);
    }

    for (let i = 0; i < this.childNodes.length; i++) {
      const childNode: TrieNode = this.childNodes[i];
      suggestions = childNode._complete(search.substring(1), built + this.char, suggestions);
    }

    return suggestions;
  }
}

// const root = createTrie(["cat", "cow"]);
// const completions = root.complete("c");
// console.log('completions', completions);
