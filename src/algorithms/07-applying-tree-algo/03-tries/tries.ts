// in order to pass the unit tests, you will need to create a function called createTrie that accepts a list of strings
// as a parameter and returns an object with a method on it called "`complete`. complete is a method that when called
// with a string will return an array of up to length three that are autocompleted suggestions of how to finish that string.
// for the sake of this exercise, it does not matter which order these strings are returned in or if there are more than three
// possible suggestions, which three you choose

import { CITY_NAMES } from "./cities";

export const createTrie = (words: string[]) => {
  const root = new TrieNode("");

  for (let word of words) {
    root.add(word.toLowerCase());
  }

  return root;
};

class TrieNode {
  value: string;
  children: TrieNode[];
  terminus: boolean;

  constructor(query: string) {
    this.children = [];
    this.terminus = false;
    this.value = query[0];

    if (query.length > 1) {
      this.children.push(new TrieNode(query.substring(1)));
    } else {
      this.terminus = true;
    }
  }

  add(word: string) {
    const value = word[0];
    const next = word.substring(1);

    for (let i = 0; i < this.children.length; i++) {
      const child: TrieNode = this.children[i];

      // same letter will be ignored to add its children
      if (child.value === value) {
        if (next) {
          child.add(next);
        }
        else {
          child.terminus = true;
        }
        return;
      }
    }


    // ignore same prefix letters, add remaining letters
    this.children.push(new TrieNode(word));
  }

  complete(search: string) {
    let completions = [];

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      completions = completions.concat(child._complete(search, "", []));
    }

    return completions;
  }

  private _complete(search: string, built: string, suggestions: string[]): any {
    if (suggestions.length >= 3 || (search && search[0] !== this.value)) {
      return suggestions;
    }

    if (this.terminus) {
      suggestions.push(built + this.value);
    }

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      suggestions = child._complete(search.substring(1), built + this.value, suggestions);
    }

    return suggestions;
  }
}

const root = createTrie(["Sax Antonio", "San Antonio", "San Diego"]);
const completions = root.complete("san");
console.log('[paolo-debug] completions', completions);
