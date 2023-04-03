import React, { useState, useEffect } from 'react'
import { useStatuses } from '../datamodel/subscriptions'
import {
  // randomStatus,
  statusPrefix
} from '../datamodel/status'

export default function Status({reflect}:any) {
  const statuses : any= useStatuses(reflect)

  // function sendStatus(){
  //   const status : any = randomStatus()
  //   reflect.mutate.createStatus(status)
  // }

  return (
    <>
    <div>status</div>
    {statuses && statuses[0] && statuses[0][1] &&
      <>
      <div>
        {statuses[0][1].content}
      </div>
      <ChangeStatusInput
        statusID={statuses[0][0]}
        content={statuses[0][1].content}
        reflect={reflect}
      />
      </>
    }
    </>
  )
}

function ChangeStatusInput({statusID, content, reflect} : {statusID: any, content: any, reflect: any}){
  const [value, setValue] = useState<string>(content)

  useEffect(() => {
    reflect.mutate.updateStatusContent({id: statusID.substring(statusPrefix.length), content: value, date: new Date().toISOString()})
  }, [value])

  return(
  <div>
    <input value={value} onChange={(event) => setValue(event.target.value)}>
    </input>
  </div>
  )
}
