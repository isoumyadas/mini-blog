1. useState
  - A state variable to retain the data between renders.
  - A state setter function to update the variable and trigger React to render the component again.

2. Component Composition
   - Composition means building complex UI by combining small, focused components — instead of writing one giant component that does everything.

```ts

// 1. Small focused components
function Header() {
  return (
    <div>
      <img src="logo.png" />
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
    </div>
  );
}

function UserCard({ name, email, avatar }) {
  return (
    <div>
      <img src={avatar} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

function Stats({ posts, followers }) {
  return (
    <div>
      <p>Posts: {posts}</p>
      <p>Followers: {followers}</p>
    </div>
  );
}

// 2. Compose them in Dashboard
function Dashboard() {
  return (
    <div>
      <Header />
      <UserCard name="John Doe" email="john@example.com" avatar="avatar.png" />
      <Stats posts={120} followers={300} />
    </div>
  );
}

// You can do same using children pattern

function Card({ children }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
      {children}  {/* Render whatever is passed inside */}
    </div>
  );
}
```

3. useEffect
  - It is a synchronization tool.
  - React's job is to render UI. sometimes, your component need to talk to the outside world - an API, a timer, an event listener, the DOM direcctly

```ts

useEffect(() => {
  // 1. EFFECT — the code you want to run

  return () => {
    // 2. CLEANUP — undo what you did (optional)
  };
}, [/* 3. DEPENDENCY ARRAY — when to re-run */]);

useEffect(() => { ... });              // No array  → runs after EVERY render
useEffect(() => { ... }, []);          // Empty array → runs ONCE (on mount)
useEffect(() => { ... }, [userId]);    // With value → runs when userId changes

```

4. Event Handling
```ts

// ❌ Wrong — calls immediately on render
<button onClick={handleClick()}>Click</button>

// ✅ Correct — passes reference, calls on click
<button onClick={handleClick}>Click</button>

// ✅ Also correct — when you need to pass arguments
<button onClick={() => handleClick(userId)}>Click</button>

```
- Event Types
```ts

// 1. onClick (buttons,div)
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("clicked");
};

<button onClick={handleClick}>Click</button>



// 2. onChange (inputs, selects - most common)
const [value, setValue] = useState("");

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value); // 👈 always e.target.value for inputs
};

<input type="text" value={value} onChange={handleChange} />

// for select dropdown:
const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  console.log(e.target.value);
};

<select onChange={handleSelect}>
  <option value="react">React</option>
  <option value="vue">Vue</option>
</select>


// 3. onSubmit (forms)

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // 👈 always do this, stops page reload

  console.log("form submitted");
};

<form onSubmit={handleSubmit}>
  <input type="text" />
  <button type="submit">Submit</button>
</form>


// 4. onKeyDown (keyboard events)
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    console.log("Enter pressed");
  }
};

<input onKeyDown={handleKeyDown} />


// 4. A simple form example :

import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // stop page reload
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

// 5. 
| Event       | Type                                | Element     |
|-------------|-------------------------------------|-------------|
| `onClick` | `React.MouseEvent<HTMLButtonElement>` | button, div |
| `onChange` | `React.ChangeEvent<HTMLInputElement>` | input      |
| `onChange` | `React.ChangeEvent<HTMLSelectElement>` | select    |
| `onSubmit` | `React.FormEvent<HTMLFormElement>` | form          |
| `onKeyDown` | `React.KeyboardEvent<HTMLInputElement>` | input   |
| `onFocus` | `React.FocusEvent<HTMLInputElement>` | input        |
| `onBlur` | `React.FocusEvent<HTMLInputElement>` | input         |

// Why onChange?
- In react, you write value={name} on an input - you take control away from the browser. Now react is responsible for what shows in that input.

- Every time the user types a character, onChange fires, you update the state, React re-renders with the new value.

- Browser was in charge → You put value → React takes over → Input freezes → onChange unfreezes it by keeping state in sync.

```

5. useRef, useContext, useCallback, useMemo

  1. useRef
  - Does NOT cause re-render when .current changes.
  - Value persists across renders (unlike normal variables).
  - Used for : DOM access, storing timers, storing previous values.
  - ref.current is just a plain JavaScript object. React doesn't watch it. You can mutate it freely.
```ts

// 1. Accessing DOM elements directly

import {useRef} from "react";

function SearchBar() {
const inputRef = useRef<HTMLInputElement>(null);
const handleFocus = () => {
  inputRef.current?.focus(); // Directly access the DOM node
}

  return (
    <>
      <input ref={inputRef} type="text" placeholder="Search...." />
      <button onClick={handleFocus}> Focus Input </button>
    </>
  )
}
// useRef<HTMLInputElement>(null)
// ref={inputRef} -> React fills inputRef.current with the actual DOM node after render.

// 2. Storing value that shouldn't trigger re-render

function Stopwatch() {
  const [time, setTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // 👆 store interval ID — changing this should NOT re-render

  const start = () => {
    timerRef.current = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // 👈 use the stored ID to clear
      timerRef.current = null;
    }
  };

  useEffect(() => {
    // Clean up when component unmounts
    return () => {
        if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [])

  return (
    <>
      <p>Time: {time}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}

```


  2. useMemo
  - useMemo caches the result of a calculation — and only recalculates when dependencies change.
  - Only redo this calculation when these values change. Otherwise give me the cached result.
  - ✅ Expensive calculations (filtering, sorting large arrays, complex math)
  - ✅ When the same calculation is running too often unnecessarily
  - ❌ Don't use it for everything — useMemo itself has a cost
  - ❌ Don't use it for simple operations like adding two numbers
```ts

import { useMemo } from "react";

type Product = {
  id: number;
  name: string;
};

function ProductList({ products, filterText }: { 
  products: Product[], 
  filterText: string 
}) {
  // ✅ Only recalculates when products or filterText changes
  const filteredProducts = useMemo(() => {
    console.log("filtering..."); // you'll see this less often
    return products.filter(p =>
      p.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [products, filterText]);

  return (
    <ul>
      {filteredProducts.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
```


  3. useCallback
  - useCallback caches a function itself — so it's not recreated on every render.
  - Every time a component renders, every function inside it is recreated as a brand new function.
  - ✅ Passing functions as props to memoized child components (memo)
  - ✅ Functions in useEffect dependency arrays
  - ❌ Don't wrap every single function — unnecessary overhead
  - ❌ Useless without memo on the child component

```ts

import React, { useState, useCallback } from 'react';

// Child component wrapped in React.memo
const Button = React.memo(function Button({ onClick, children }) {
  console.log(`${children} button rendered`);
  return <button onClick={onClick}>{children}</button>;
});

function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  
  // Memoized callback for first button
  const incrementCount1 = useCallback(() => {
    setCount1(count1 + 1);
  }, [count1]);
  
  // Memoized callback for second button
  const incrementCount2 = useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]);
  
  return (
    <div>
      <p>Count 1: {count1}</p>
      <p>Count 2: {count2}</p>
      <Button onClick={incrementCount1}>Increment Count 1</Button>
      <Button onClick={incrementCount2}>Increment Count 2</Button>
    </div>
  );
}

// - When `count1` changes, only the first button re-renders
// - When `count2` changes, only the second button re-renders

// with dependency

function Parent({ userId }: { userId: number }) {
  const [data, setData] = useState(null);

  // ✅ Recreate function only when userId changes
  const fetchUser = useCallback(async () => {
    const res = await fetch(`/api/users/${userId}`);
    const json = await res.json();
    setData(json);
  }, [userId]); // 👈 depends on userId

  return <Child onFetch={fetchUser} />;
}

```

- useMemo caches the result of an expensive calculation and only recomputes it when its dependencies change — used for performance optimization on heavy computations.


- useCallback caches a function reference so it's not recreated on every render — useful when passing callbacks to memoized child components to prevent unnecessary re-renders.

6. Controlled vs Uncontrolled

- Controlled components store the input value in React state. Every keystroke updates state and React re-renders. You always have the current value available, making real-time validation and conditional UI easy.
  
- Uncontrolled components let the DOM manage the value. You use a ref to read it only when needed, like on form submit. No re-renders on every keystroke, simpler code for basic forms.

- In practice, controlled is the default choice when you need live feedback or validation. Uncontrolled is fine for simple forms. Most real projects use React Hook Form which is uncontrolled under the hood for better performance.

```ts

// Controlled components

import { useState } from "react";

function ControlledForm() {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name); // ✅ always available in state
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}                              // React drives the value
        onChange={(e) => setName(e.target.value)} // state updates on every keystroke
        placeholder="Enter name"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

**What happens on every keystroke:**

User types "J"
    ↓
onChange fires → setName("J")
    ↓
React re-renders
    ↓
Input shows "J"

// controlled with live validation

function ControlledWithValidation() {
  const [email, setEmail] = useState("");

  // ✅ you know the value on every keystroke
  // so you can react to it instantly
  const isValid = email.includes("@");

  return (
    <form>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      {/* Real time error — only possible because we always have the value */}
      {!isValid && email.length > 0 && (
        <p style={{ color: "red" }}>Invalid email</p>
      )}
      {/* Disable button until valid — only possible with controlled */}
      <button disabled={!isValid} type="submit">
        Submit
      </button>
    </form>
  );
}


// Uncontrolled

function SimpleForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    };

    console.log(formData); // grab everything on submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} placeholder="Name" />
      <input ref={emailRef} placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}

```

