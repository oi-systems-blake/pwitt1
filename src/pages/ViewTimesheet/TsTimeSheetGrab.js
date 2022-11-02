import React from 'react'
import { API, graphqlOperation } from "aws-amplify";
import { listTimeSheets } from "../../graphql/queries";


export function TsTimeSheetGrab(props) {
    
    
    
    let tsGrabber = API.graphql(
        graphqlOperation(listTimeSheets, {
          filter: {
            dateNumber: {
              between: [props.actualStartOfWeek, props.actualDateNumber],
            },
            employeeID: {
              contains: props.pin,
            },
          },
        })
      )
  
  
  
  
  
  
  
  
  
    return (
    <div>TsTimeSheetGrab</div>
  )
}
