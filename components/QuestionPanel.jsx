import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Toggle from "./Toggle";

const data = [
  {
    isActive: false,
    value: "Hello",
  },
  {
    isActive: true,
    value: "Hello",
  },
  {
    isActive: false,
    value: "Hello",
  },
];

const OptionField = ({ option, onToggleClick, onContentBlur }) => {
  return (
    <fieldset className="option-fieldset">
      <Toggle isActive={option.isActive} onClick={onToggleClick} />
      <TextareaAutosize
        onBlur={onContentBlur}
        placeholder="Type your option"
        value={option.content}
      ></TextareaAutosize>
    </fieldset>
  );
};

const QuestionPanel = () => {
  const [options, setOptions] = useState(data);

  function toggleOption(setOptions, option) {
    setOptions((previousOptions) => {
      return previousOptions.map((previousOption) => {
        if (previousOption !== option) return previousOption;
        return { ...option, isActive: !option.isActive };
      });
    });
  }

  function changeValue(setOptions, option, event) {
    setOptions((previousOptions) => {
      return previousOptions.map((previousOption) => {
        if (previousOption !== option) return previousOption;
        return { ...option, value: event.target.value };
      });
    });
  }

  function addOptions() {
    setOptions(() => [...options, { isActive: false, value: "" }]);
  }

  return (
    <>
      <form className="question-panel">
        <TextareaAutosize placeholder="Type your question" />
        {options.map((option, index) => (
          <OptionField
            key={index}
            option={option}
            onToggleClick={() => toggleOption(setOptions, option)}
            onContentBlur={() => changeValue(setOptions, option, event)}
          />
        ))}
        <button
          className="option_button--add"
          type="button"
          onClick={addOptions}
          name="Add Option"
        >
          Add Option
        </button>
      </form>
      <pre className="json-preview">{JSON.stringify(options, null, 2)}</pre>
    </>
  );
};

export default QuestionPanel;
