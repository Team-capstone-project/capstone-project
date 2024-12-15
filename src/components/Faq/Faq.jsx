import React, { useState } from 'react';
import './Faq.css';
import { faqEdudu } from '../../assets/data/data.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Faq () {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="my-faq">
        {faqEdudu.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <FontAwesomeIcon icon={faChevronRight} className="faq-icon" />
              <span>{item.question}</span>
            </div>
            <div
              className={`faq-answer ${openIndex === index ? 'open' : ''}`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
