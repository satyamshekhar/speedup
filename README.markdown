### API

#### 1.  Stack/LIFO [Link]
##### Usage
```
  var Stack = require('speedup').Stack;
  var stack = new Stack();
```

##### Methods
*   `stack.push(element) - O(1)`  
    Inserts the given argument |element| at the top of the stack and returns the number of the elements on the stack after inserting |element|.

*  `stack.pop() - O(1)`  
    Removes and returns the element at the top of the stack, or undefined if the stack is empty.

*  `stack.size() - O(1)`  
    Returns the number of elements on the stack..

*  `stack.empty() - O(1)`  
    Returns true if the stack contains no element, false otherwise.

*  `stack.clear() - O(1)`  
    Clears all elements from the stack. Returns void.

*  `stack.peek() - O(1)`  
    Returns the element at the top of the stack if the stack is not empty, undefined otherwise.

*  `foreach(fn) - O(N)`  
    |fn| should be a function that takes one argument. Executes the function |fn| on each element on the stack in the order they will be popped from the stack. Returns void.

*  `map(fn) - O(N)`  
    |fn| should be a function that takes one argument. Maps each element on the stack to the value returned by the function |fn|, when it is executed with that element as its argument. The order of execution is as foreach. Returns void.

*  `toArray() - O(N)`  
    Returns all the elements on the stack in an array. The elements are ordered by the order of their insertion.

#### 2. Queue/FIFO [Link]

##### Usage:
```
  var Queue = require('speedup').Queue;
  var queue = new Queue;
  queue.enqueue(3);
  queue.enqueue(4);
  queue.dequeue();  // Returns 3.
```

##### Methods:

* `queue.enqueue(element) - O(1)`  
  Inserts |element| at the back of the queue. Returns the number of elements in the queue after inserting |element|.
 
* `queue.dequeue() - amortized O(1)`  
  Removes and returns the element at the back of the queue. 

* `queue.size() - O(1)`  
  Returns the number of elements in the queue.

* `queue.empty() - O(1)`  
  Returns true if the queue contains no element, false otherwise.

* `clear() - O(1)`  
  Clears all elements from the queue.

* `peek() - O(1)`  
  Returns the element at the front of the queue if the queue is not empty, undefined otherwise.

* `foreach(fn) - O(N)`  
  |fn| should be a function that takes one argument. Executes the function |fn| on each element in the queue in the order they will be dequeued from the queue. Returns void.

* `map(fn) - O(N)`  
  |fn| should be a function that takes one argument. Maps each element in the queue to the value returned by the function |fn|, when it is executed with that element as its argument. The order of execution is as foreach. Returns void.

* `toArray() - O(N)`  
  Returns all the elements on the stack in an array. The elements are ordered by the order of their insertion.


