import { Radio, Spinner } from '@material-tailwind/react';
import { useState } from 'react';

function MCQComponent({ obj, selectedMark, onChange }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {
        obj === undefined || obj === null
          ? <div className="flex justify-center items-center"><Spinner /></div>
          :
          <div>
            {
              obj.map((item) => (
                <Radio
                  key={item.id}
                  id={item.id}
                  value={item.marks}
                  label={item.title}
                  className="flex items-center"
                  checked={selectedMark === item.marks}
                  onChange={() => onChange(item.marks)}
                />
              ))
            }
          </div>
      }
    </div>
  );
}

export default MCQComponent;
