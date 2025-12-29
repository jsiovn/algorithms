# Trie and Complete Function Explanation

## 1️⃣ Review: DFS on Binary Tree

```typescript
// Simple DFS on binary tree
class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function DFS(node: TreeNode) {
  if (!node) return;

  console.log(node.value);  // Process current node
  DFS(node.left);           // Go deep into left
  DFS(node.right);          // Go deep into right
}
```

**DFS Pattern:** Process node → Traverse children

---

## 2️⃣ What is Trie? (Compared to Binary Tree)

### Binary Tree:
```
      5
     / \
    3   8
   / \
  1   4
```
- Each node has **AT MOST 2 children** (left, right)
- Stores **numbers**

### Trie:
```
      root
       |
       c
      / \
     a   o
    /     \
   t       w
```
- Each node has **MULTIPLE children** (array of childNodes)
- Stores **characters**
- Used to store **words/strings**

---

## 3️⃣ Building Trie from ["cat", "cow"]

### Step by step:

```
Step 1: Add "cat"
root
 └─ c
     └─ a
         └─ t [terminus=true] ← Mark end of word "cat"

Step 2: Add "cow"
root
 └─ c
     ├─ a
     │   └─ t [terminus=true]
     └─ o
         └─ w [terminus=true] ← Mark end of word "cow"
```

**Note:** Node `c` has 2 childNodes: `a` and `o`

---

## 4️⃣ DFS on Trie - Complete function

Find words starting with **"c"** → Result: `["cat", "cow"]`

### Code with detailed annotations:

```typescript
private _complete(
  search: string,      // Remaining chars to match: "c" → "" → ""
  built: string,       // Word being built: "" → "c" → "ca" → "cat"
  suggestions: string[] // Results: [] → ["cat"] → ["cat", "cow"]
) {
  // === STOP CONDITIONS ===
  if (suggestions.length >= 3) return suggestions;  // Have 3 suggestions

  if (search && search[0] !== this.char) {
    return suggestions;  // Char doesn't match → skip this branch
  }

  // === PROCESS CURRENT NODE ===
  if (this.terminus) {
    suggestions.push(built + this.char);  // Collect complete word
  }

  // === TRAVERSE CHILDREN (LIKE DFS) ===
  for (let i = 0; i < this.childNodes.length; i++) {
    const childNode = this.childNodes[i];
    suggestions = childNode._complete(
      search.substring(1),   // Remove first char
      built + this.char,     // Add current char to word
      suggestions
    );
  }

  return suggestions;
}
```

---

## 5️⃣ Step by Step Execution: Find "c" in ["cat", "cow"]

```
🎯 Call: root.complete("c")

┌─────────────────────────────────────────────┐
│ Step 1: Start from root                     │
└─────────────────────────────────────────────┘
root
 └─ Traverse childNode 'c'

    📞 Call: _complete("c", "", [])

    ✓ Match: 'c'[0] === this.char ('c')
    ✗ terminus = false (no word ends at 'c')

    ➡️ Traverse childNodes of 'c' (has 2 children: 'a' and 'o')

┌─────────────────────────────────────────────┐
│ Step 2: Enter branch 'a' FIRST (DFS!)      │
└─────────────────────────────────────────────┘
    └─ Traverse childNode 'a'

       📞 Call: _complete("", "c", [])

       ✓ search = "" → no more matching needed
       ✗ terminus = false

       ➡️ Traverse childNodes of 'a'

       └─ Traverse childNode 't'

          📞 Call: _complete("", "ca", [])

          ✓ search = ""
          ✅ terminus = TRUE! → Push "cat"

          suggestions = ["cat"]

          ✓ No more childNodes
          ⬅️ Return ["cat"]

┌─────────────────────────────────────────────┐
│ Step 3: Back to 'c', go to branch 'o'      │
└─────────────────────────────────────────────┘
    └─ Traverse childNode 'o'

       📞 Call: _complete("", "c", ["cat"])

       ✓ search = ""
       ✗ terminus = false

       ➡️ Traverse childNodes of 'o'

       └─ Traverse childNode 'w'

          📞 Call: _complete("", "co", ["cat"])

          ✅ terminus = TRUE! → Push "cow"

          suggestions = ["cat", "cow"]

          ⬅️ Return ["cat", "cow"]

🎉 RESULT: ["cat", "cow"]
```

---

## 6️⃣ Explaining the 3 Parameters

| Parameter | Meaning | Changes |
|---------|---------|----------|
| `search` | **Remaining** chars to match | `"cat"` → `"at"` → `"t"` → `""` |
| `built` | Word **being built** | `""` → `"c"` → `"ca"` → `"cat"` |
| `suggestions` | **Results** array | `[]` → `["cat"]` → `["cat", "cow"]` |

**Rules:**
- When `search` **HAS chars** → Only match, don't collect
- When `search = ""` → Collect all complete words

---

## 7️⃣ Why NOT return after pushing to suggestions?

### Because one word can be a PREFIX of another!

```
Tree contains: ["sea", "seat", "seattle"]

Structure:
root
 └─ s
     └─ e
         └─ a
             ├─ [terminus] ← "sea" ends HERE
             └─ t
                 ├─ [terminus] ← "seat" ends here
                 └─ t → l → e → [terminus] ← "seattle"
```

When searching "se":
1. Meet node `a` → `terminus = true` → Push "sea"
2. **Don't return** → Continue traversing childNodes
3. Find "seat" and "seattle"

**Result:** `["sea", "seat", "seattle"]` ✅

If return immediately: Only `["sea"]` ❌

---

## 8️⃣ IMPORTANT: `this` Changes in Recursion

### Example: Find "ca" in ["cat"]

```
root (this = root)
 └─ c (this = node 'c')
     └─ a (this = node 'a')
         └─ t (this = node 't', terminus=true)
```

### Step by Step Trace:

```typescript
┌──────────────────────────────────────────────────────────────┐
│ STEP 1: Called from complete() - at ROOT                    │
└──────────────────────────────────────────────────────────────┘

complete(search: "ca") {
  // this = root
  // this.childNodes = [node 'c']

  for (let i = 0; i < this.childNodes.length; i++) {
    const childNode = this.childNodes[i];  // childNode = node 'c'

    // 🔥 Jump into _complete OF NODE 'c'
    childNode._complete("ca", "", [])
    //    ↑
    //    Now `this` is NO LONGER root!
  }
}

┌──────────────────────────────────────────────────────────────┐
│ STEP 2: Inside _complete - this = NODE 'c'                  │
└──────────────────────────────────────────────────────────────┘

_complete(search: "ca", built: "", suggestions: []) {
  // 🎯 this = node 'c'  <-- CHANGED!
  // 🎯 this.char = 'c'
  // 🎯 this.childNodes = [node 'a']  <-- childNodes OF 'c'

  // Check
  if (search[0] !== this.char) // "ca"[0] === 'c' ✓

  if (this.terminus) // false (no word ends at 'c')

  // Traverse childNodes OF NODE 'c'
  for (let i = 0; i < this.childNodes.length; i++) {
    const childNode = this.childNodes[i];  // childNode = node 'a'

    // 🔥 Jump into _complete OF NODE 'a'
    childNode._complete("a", "c", [])
    //    ↑
    //    Now `this` changes to node 'a'!
  }
}

┌──────────────────────────────────────────────────────────────┐
│ STEP 3: Inside _complete - this = NODE 'a'                  │
└──────────────────────────────────────────────────────────────┘

_complete(search: "a", built: "c", suggestions: []) {
  // 🎯 this = node 'a'  <-- CHANGED 2nd TIME!
  // 🎯 this.char = 'a'
  // 🎯 this.childNodes = [node 't']  <-- childNodes OF 'a'

  // Check
  if (search[0] !== this.char) // "a"[0] === 'a' ✓

  if (this.terminus) // false

  // Traverse childNodes OF NODE 'a'
  for (let i = 0; i < this.childNodes.length; i++) {
    const childNode = this.childNodes[i];  // childNode = node 't'

    // 🔥 Jump into _complete OF NODE 't'
    childNode._complete("", "ca", [])
    //    ↑
    //    Now `this` = node 't'
  }
}

┌──────────────────────────────────────────────────────────────┐
│ STEP 4: Inside _complete - this = NODE 't'                  │
└──────────────────────────────────────────────────────────────┘

_complete(search: "", built: "ca", suggestions: []) {
  // 🎯 this = node 't'  <-- CHANGED 3rd TIME!
  // 🎯 this.char = 't'
  // 🎯 this.childNodes = []  <-- No children

  // Check
  if (search && search[0] !== this.char) // search = "" so skip

  if (this.terminus) // TRUE! ✅
    suggestions.push("ca" + "t")  // = "cat"
    // suggestions = ["cat"]

  // Traverse childNodes
  for (let i = 0; i < this.childNodes.length; i++) {
    // No childNodes → skip loop
  }

  return ["cat"]  // ⬅️ Return to STEP 3
}

┌──────────────────────────────────────────────────────────────┐
│ UNWIND - Unwinding recursion                                │
└──────────────────────────────────────────────────────────────┘

STEP 3 (this = node 'a'): receives ["cat"] ⬅️ return to STEP 2
STEP 2 (this = node 'c'): receives ["cat"] ⬅️ return to STEP 1
STEP 1 (this = root):     receives ["cat"] ⬅️ return to user
```

### Table of `this` Changes:

| Location | `this` | `this.char` | `this.childNodes` |
|--------|--------|--------------|-----------------|
| Step 1 (root) | root | "" | [node 'c'] |
| Step 2 | node 'c' | 'c' | [node 'a'] |
| Step 3 | node 'a' | 'a' | [node 't'] |
| Step 4 | node 't' | 't' | [] |

### Diagram with colors:

```
🟦 complete() at ROOT
│  this = root
│  this.childNodes = [c]
│
└──> childNode._complete()  ← Jump into 'c'
     │
     🟩 _complete() at NODE 'c'
     │  this = node 'c'  ← CHANGED!
     │  this.char = 'c'
     │  this.childNodes = [a]  ← childNodes OF 'c'
     │
     └──> childNode._complete()  ← Jump into 'a'
          │
          🟨 _complete() at NODE 'a'
          │  this = node 'a'  ← CHANGED!
          │  this.char = 'a'
          │  this.childNodes = [t]  ← childNodes OF 'a'
          │
          └──> childNode._complete()  ← Jump into 't'
               │
               🟥 _complete() at NODE 't'
               │  this = node 't'  ← CHANGED!
               │  this.char = 't'
               │  this.childNodes = []  ← No children
               │  this.terminus = true ✅
               │
               return ["cat"]  ⬅️
               │
          return ["cat"]  ⬅️
          │
     return ["cat"]  ⬅️
     │
return ["cat"]  ⬅️
```

### 💡 Simple way to remember:

```typescript
// When you write:
childNode._complete(...)

// Inside _complete function:
this = childNode  // <-- `this` IS NOW childNode!
```

**Similar to:**
```typescript
const person1 = { name: "A" };
const person2 = { name: "B" };

person1.sayName();  // this = person1
person2.sayName();  // this = person2  <-- Different!
```

---

## 🎯 Summary

1. **Trie** = Tree storing words, each node stores 1 character
2. **DFS on Trie** = Traverse deep into childNodes (like DFS on binary tree)
3. **Complete** = Find prefix → Collect all words with that prefix
4. **Don't return after terminus** because there may be longer words below
5. **3 parameters** track: search (remaining), built (constructed), suggestions (results)
6. **`this` changes** each time calling `childNode._complete()` → `this` = childNode

---

## 📝 Variable Naming Convention Used

| Old Name | New Name | Meaning |
|----------|----------|---------|
| `value` | `char` | Character that this node represents |
| `query` | `word` | Word to process |
| `children` | `childNodes` | Array of child nodes |
| `child` | `childNode` | A single child node |

These naming conventions make the code more readable and easier to understand!
