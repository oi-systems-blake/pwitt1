/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTimeSheet = /* GraphQL */ `
  subscription OnCreateTimeSheet {
    onCreateTimeSheet {
      id
      clock_status
      dayName
      dayNumber
      monthName
      monthNumber
      year
      punches
      punch
      dateNumber
      dateName
      AWSDate
      TestDateStamp
      AWSStamp
      total_hours
      employeeID
      TimeSheetEntrys {
        items {
          id
          start_time
          stop_time
          allocated_hours
          untitledfield
          timesheetID
          travelersID
          EmployeeID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTimeSheet = /* GraphQL */ `
  subscription OnUpdateTimeSheet {
    onUpdateTimeSheet {
      id
      clock_status
      dayName
      dayNumber
      monthName
      monthNumber
      year
      punches
      punch
      dateNumber
      dateName
      AWSDate
      TestDateStamp
      AWSStamp
      total_hours
      employeeID
      TimeSheetEntrys {
        items {
          id
          start_time
          stop_time
          allocated_hours
          untitledfield
          timesheetID
          travelersID
          EmployeeID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTimeSheet = /* GraphQL */ `
  subscription OnDeleteTimeSheet {
    onDeleteTimeSheet {
      id
      clock_status
      dayName
      dayNumber
      monthName
      monthNumber
      year
      punches
      punch
      dateNumber
      dateName
      AWSDate
      TestDateStamp
      AWSStamp
      total_hours
      employeeID
      TimeSheetEntrys {
        items {
          id
          start_time
          stop_time
          allocated_hours
          untitledfield
          timesheetID
          travelersID
          EmployeeID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTimeSheetEntrys = /* GraphQL */ `
  subscription OnCreateTimeSheetEntrys {
    onCreateTimeSheetEntrys {
      id
      start_time
      stop_time
      allocated_hours
      untitledfield
      timesheetID
      travelersID
      EmployeeID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTimeSheetEntrys = /* GraphQL */ `
  subscription OnUpdateTimeSheetEntrys {
    onUpdateTimeSheetEntrys {
      id
      start_time
      stop_time
      allocated_hours
      untitledfield
      timesheetID
      travelersID
      EmployeeID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTimeSheetEntrys = /* GraphQL */ `
  subscription OnDeleteTimeSheetEntrys {
    onDeleteTimeSheetEntrys {
      id
      start_time
      stop_time
      allocated_hours
      untitledfield
      timesheetID
      travelersID
      EmployeeID
      createdAt
      updatedAt
    }
  }
`;
