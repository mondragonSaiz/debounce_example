//importing necessary modules, including
//useState and useCallback from the React library.
import React, { useState, useCallback } from 'react';

export default function MainPage() {
  //State Initialization

  const [normalValue, setNormal] = useState('');
  const [debounceValue, setDebounce] = useState('');

  //Debounce Function:

  // debounceFunc function that takes two arguments: fn (a function) and t (a time delay, defaulted to 1000 milliseconds or 1 second).
  // Inside debounceFunc, a delay variable is declared to keep track of the setTimeout timer.
  // It returns an inner function that takes any number of arguments using the ...args syntax.
  // In this inner function:
  // It clears any existing delay using clearTimeout.
  // It sets a new delay using setTimeout. This timer will execute the provided function (fn) after the specified delay (t) if no new function calls are made within that time.
  const debounceFunc = function (fn, t = 1000) {
    let delay;
    return function (...args) {
      clearTimeout(delay);
      delay = setTimeout(() => fn(...args), t);
    };
  };

  //Debounce Request:

  // debounceRequest function using the useCallback hook.
  //This function takes a single argument, value, and it calls handleChangeDebounce with this value.
  const debounceRequest = useCallback(
    (value) => handleChangeDebounce(value),
    []
  );

  //Handle Change Function:

  // The handleChange function is called whenever there is a change event in the input field.
  // It sets the normal state variable with the current input value.
  // It also calls debounceRequest with the input value, triggering the debouncing mechanism.
  const handleChange = (e) => {
    setNormal(e.target.value);
    debounceRequest(e.target.value);
  };

  // Handle Change Debounce Function:

  // The handleChangeDebounce function is a debounced version of setting the debounce state variable.
  // It uses the debounceFunc to ensure that the value is updated only after a 1-second delay of no keystrokes.
  const handleChangeDebounce = debounceFunc((val) => {
    setDebounce(val);
  }, 1000);
  return (
    <div
      style={{
        height: '100vh',
        padding: '10px',
      }}
    >
      <header className="App-header" style={{ textAlign: 'center' }}>
        <h1>Debounce Example</h1>
      </header>
      <main style={{ textAlign: 'center' }}>
        <p>
          Try the input to see the difference with and without the debounce
          implementation
        </p>
        <input
          onChange={handleChange}
          placeholder="type something..."
          style={{ padding: '0.3rem', borderRadius: '10px', outline: 'none' }}
        />
        <section
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <div>
            <h2>Debounced</h2>
            <p>{debounceValue}</p>
          </div>
          <div>
            <h2>Normal</h2>
            <p>{normalValue}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
