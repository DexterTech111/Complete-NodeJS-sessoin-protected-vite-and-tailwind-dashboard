import React, { useState } from 'react';

export function KeyInput1() {
  const [input1Type, setInput1Type] = useState("password");
  const [input2Type, setInput2Type] = useState("password");

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value).then(() => {
      alert("Copied!");
    });
  };

  const toggleInputType = (inputNumber) => {
    if (inputNumber === 1) {
      setInput1Type(input1Type === "text" ? "password" : "text");
    } else if (inputNumber === 2) {
      setInput2Type(input2Type === "text" ? "password" : "text");
    }
  };

  const value1 = "https://vladeeno.atlassian.net";
  const value2 = "ATATT3xFfGF0H04y3k3lLfq5ruP_jWTHocBqYbvCN2nPYJwVqNEU0eKPmDOB1Sfl_X7KvdtObNLzEAEvRjbWvvHMvCXstydwAJYSLQkKbTTTnVejIRY5B4NLDduCehiFK0LUfrOvf-w8JlajlEiKrohNDG9U48OGWOsySxUzgiD2oyWtk3ZIgUE=8340F818";

  return (
    <div className="space-y-6 py-6  max-w-lg ">
      {/* First Input */}
      <label className="font-semibold">Atlassian Link</label>
      <div className="flex items-center space-x-4  pb-6">
        
        <input
          type={input1Type}
          value={value1}
          readOnly
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => handleCopy(value1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Copy
        </button>
        <button
          onClick={() => toggleInputType(1)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {input1Type === "text" ? "Hide" : "Show"}
        </button>
      </div>

      {/* Second Input */}
      <label className="font-semibold pt-6">API Token</label>
      <div className="flex items-center space-x-4">
        
        <input
          type={input2Type}
          value={value2}
          readOnly
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => handleCopy(value2)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Copy
        </button>
        <button
          onClick={() => toggleInputType(2)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {input2Type === "text" ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

KeyInput1.displayName = "/src/widgets/form/keyInput1.jsx";

export default KeyInput1;
