import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Toggle from "./Toggle";

// const option = {
//   isActive: false,
//   content: "Hello",
// };

const OptionField = ({ option, setOptions }) => {
  return (
    <fieldset className="option-fieldset">
      <Toggle isActive={option.isActive} />
      <TextareaAutosize placeholder="Type your option"></TextareaAutosize>
    </fieldset>
  );
};

const QuestionPanel = () => {
  const [options, setOptions] = useState([]);

  return (
    <>
      <form className="question-panel">
        <TextareaAutosize placeholder="Type your question" />
        {options.map((option, index) => (
          <OptionField key={index} option={option} setOption={setOptions} />
        ))}

        <button
          type="button"
          onClick={() => setOptions([...options, { isActive: true }])}
        >
          add true option
        </button>

        <button
          type="button"
          onClick={() => setOptions([...options, { isActive: false }])}
        >
          add false option
        </button>
      </form>
    </>
  );
};

export default QuestionPanel;
