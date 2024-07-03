import { Radio, Spinner } from '@material-tailwind/react';
import React from 'react'


function MCQComponent({ obj }) {
  return (
    <>
      {
        obj === undefined
          ? <Spinner />
          :
          <>
            {obj.score.map(
              (item) => (
                <Radio id={item.id} value={item.marks}> {item.title} </Radio>
              )
            )}
          </>
      }
    </>
  )
}

export default MCQComponent;