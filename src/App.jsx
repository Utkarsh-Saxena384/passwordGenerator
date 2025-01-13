import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasChar, setHasChar] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (hasNumber) str += "1234567890";
    if (hasChar) str += "!@#$%^&*()_+-=[]{}|;:,.<>?/`~";

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, hasChar, hasNumber, setPassword]);

  const copyToClipboard = useCallback(() => {
    passRef.current?.select();
    // passRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, hasChar, hasNumber, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passRef}
          />
          <button
            onClick={copyToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            ></input>
            <label>Length: {length}</label>
            <input
              type="checkbox"
              defaultChecked={hasNumber}
              onChange={() => setHasNumber((prev) => !prev)}
            ></input>
            <label>Numbers</label>
            <input
              type="checkbox"
              defaultChecked={hasChar}
              onChange={() => setHasChar((prev) => !prev)}
            ></input>
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
