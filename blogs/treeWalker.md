## NodeIterator and TreeWalker Web APIs

NodeIterator and TreeWalker are usually more powerful than you need. However, if you have to do something complex with a collection of DOM nodes, you will love what you can do with these [iterator](https://en.wikipedia.org/wiki/Iterator) APIs.

### Parameters

Both NodeIterator and TreeWalker take one required parameter, `root`, and two optional parameters, `whatToShow` and `filter`.

`whatToShow` and `filter` use [NodeFilter](https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html#Traversal-NodeFilter) constants to build DOM node filters. The important thing to remember is that NodeIterator and TreeWalker iteration methods will only work on nodes included in the filtered collection.

#### root

`root` expects a reference to a node. If you only pass `root` to the constructor, your NodeIterator will contain that node and all the nodes in its subtree.

#### whatToShow

The first NodeFilter parameter, `whatToShow`, allows you to limit the DOM nodes in your collection by passing a NodeFilter `SHOW` constant. For example, passing `NodeFilter.SHOW_ALL` will include every DOM node in the collection. `NodeFilter.SHOW_ELEMENT` only includes elements in your collection. `NodeFilter.SHOW_TEXT` would only include text nodes in your collection.

#### filter

The second NodeFilter parameter, `filter`, is a function that is run on every node in the collection created by the first two parameters. It expects either an anonymous callback function or an object with an `acceptNode` method. These functions should return at least one of three `FILTER` constants.

`NodeFilter.FILTER_ACCEPT` includes the current node in the collection. `NodeFilter.FILTER_SKIP` does not include the node. `NodeFilter.FILTER_REJECT` does not include the node or any of the nodes in its subtree.

A valid anonymous function to pass as a filter looks like:

```JavaScript
(node) => {
  if (node.matches("h1")) return NodeFilter.FILTER_REJECT;
  if (node.matches("div")) return NodeFilter.FILTER_ACCEPT;
  if (node.matches("ul")) return NodeFilter.FILTER_SKIP;
}
```

One of the ways to pass it as an object method looks like:

```JavaScript
{
  acceptNode: function (node) {
    if (node.matches("h1")) return NodeFilter.FILTER_REJECT;
    if (node.matches("div")) return NodeFilter.FILTER_ACCEPT;
    if (node.matches("ul")) return NodeFilter.FILTER_SKIP;
  }
}
```

### NodeIterator

The NodeIterator puts your nodes in a list instead of maintaining the tree structure. To make one, you use `document.createNodeIterator(root, whatToShow, filter)`.

NodeIterator has five read-only properties. `root`, `whatToShow`, and `filter` will return objects matching what you passed into the constructor. `referenceNode` will return a reference to the current node. [`pointerBeforeReferenceNode`](https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator) returns a boolean. If true, a pointer is set on the node before the `referenceNode`. This helps the iterator traverse your collection of nodes.

Both the `root` and `referenceNode` properties have a lot of properties with information about the nodes. For example, `NodeIterator.referenceNode` has information about the current node's attributes, parent nodes, sibling nodes, and more.

NodeIterator has two methods - `nextNode()` and `previousNode()`. These methods will traverse the collection of nodes in the iterator. For example, `nextNode()` will look for the next node in the collection. If it exists, it will update `referenceNode` and return a reference to the new `referenceNode` at the same time. If it doesn't exist, it will just return `null`.

The following code would create a NodeIterator with a list of seven `<li>`s.

```HTML
<ul id="root">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>
    5
    <ul id="sub-list">
      <li>6</li>
      <li>7</li>
    </ul>
  </li>
</ul>
```

```JavaScript
const NodeIterator = 
  document.createNodeIterator(document.getElementById("root"), 
    NodeFilter.SHOW_ELEMENT, 
    (node) =>
     if (node.matches("li")) return NodeFilter.FILTER_ACCEPT
    )
```

The `referenceNode` will start as the root, so to get to `<li>` 1, I can use `NodeIterator.nextNode()`. If I call it four more times, I'll be on `<li>` 5.

### TreeWalker

The TreeWalker keeps your nodes in a tree structure. To make one, you use `document.createTreeWalker(root, whatToShow, filter)`.

It has three read-only properties, `root`, `whatToShow`, and `filter`. These properties and the first two methods, `nextNode()` and `previousNode()`, work the same way they do in NodeIterator.

Because TreeWalker maintains the tree structure, we also get methods that use nodes' relationships to one another: `parentNode()`, `firstChild()`, `lastChild()`, `previousSibling()`, and `nextSibling()`. They also iterate to a matching node and return a reference to it or just return `null` if a matching node is not found.

The following code would create a TreeWalker with a tree collection of seven `<li>`s. The `currentNode` will start as the root.

```HTML
<ul id="root">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>
    5
    <ul id="sub-list">
      <li>6</li>
      <li>7</li>
    </ul>
  </li>
</ul>
```

```JavaScript
const NodeIterator = 
  document.createTreeWalker(document.getElementById("root"), 
    NodeFilter.SHOW_ELEMENT, 
    (node) =>
     if (node.matches("li")) return NodeFilter.FILTER_ACCEPT
    )
```

Like NodeIterator, `root` and `currentNode` properties have a lot of properties with information about the nodes. Unlike NodeIterator, the TreeWalker's `currentNode` property can be reassigned, as long as it is given a valid reference to a node. You can even set it to a node that wouldn't match the filter. Then, you can call `nextNode()`, and the TreeWalker will still iterate to the next node in the DOM that matches your filter. Combined with the information TreeWalker stores about the DOM, you can hop all around the tree.

Say my use case for my collection of seven `<li>`s also involves jumping from `<li>` 7 to it's parent, `<li>` 5. Because the sub-list `<ul>` isn't in the collection, I can't use `parentNode()` to get there. `previousNode()` would work for `<li>` 6, but not `<li>` 7. Luckily, I can reassign `currentNode` using `currentNode` properties.

```JavaScript
TreeWalker.currentNode = TreeWalker.currentNode.parentNode.parentNode;
```

### When to Use Them

Instantiation of these iterators is slower than a normal loop. If you're planning on using it once or a few times, `document.querySelectorAll()` with a for loop or [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) methods should suit your needs.

Similarly, the more complex your filter, the slower these iterators will be. If you're looking to find a few nodes based on a complex series of CSS selectors, loops will probably be a lot faster.

Where NodeIterator and TreeWalker really shine is when you have a use case that requires referencing the collection of nodes repeatedly. They both store a lot of information about the DOM, so that's especially true when you need to know the relationships between nodes.

The main thing they offer over other ways to iterate through nodes is a reference to a node. A NodeList may let you access similar information, but you'll still have to find the node you want every time, usually by index.

You can use `NodeIterator.referenceNode` and `TreeWalker.currentNode` like you would `ref.current` in React or `document.getElementById("id")` in vanilla JS. For example, managing a roving tabIndex.

```JavaScript
TreeWalker.currentNode.tabIndex = -1;
```

Because methods like `nextNode()` also return a reference, you can iterate and focus the element all in one line.

```JavaScript
TreeWalker.nextNode().focus()
TreeWalker.currentNode.tabIndex = 0;
```

### Conclusion

Somewhere in all my research, I saw someone say that a web developer may use these iterators a maximum of five times in their entire career. Maybe I'm lucky a use case popped up at work. Either way, I had fun tree walking.
