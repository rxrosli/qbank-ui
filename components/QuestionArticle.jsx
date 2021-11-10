import React from "react";

const QuestionArticle = ({ uuid, type, optionCount, content, tags }) => {
  return (
    <article className="question-article">
      <div className="container">
        <section className="header-section">
          <div className="id">{uuid}</div>
          <div className="type">{type}</div>
          <div className="option-count true">{optionCount.trueOptions}</div>
          <div className="option-count false">{optionCount.falseOptions}</div>
        </section>
        <section className="content-section">{content}</section>
        <section className="tag-section">
          {tags.map((tag, index) => {
            return (
              <span key={index} className="tag">
                {tag}
              </span>
            );
          })}
        </section>
      </div>
      <div className="tab" />
    </article>
  );
};

export default QuestionArticle;
