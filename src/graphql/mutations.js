/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTimeSheet = /* GraphQL */ `
  mutation CreateTimeSheet(
    $input: CreateTimeSheetInput!
    $condition: ModelTimeSheetConditionInput
  ) {
    createTimeSheet(input: $input, condition: $condition) {
      id
      clock_status
      dayName
      dayNumber
      monthName
      monthNumber
      year
      punches
      dateNumber
      dateName
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
export const updateTimeSheet = /* GraphQL */ `
  mutation UpdateTimeSheet(
    $input: UpdateTimeSheetInput!
    $condition: ModelTimeSheetConditionInput
  ) {
    updateTimeSheet(input: $input, condition: $condition) {
      id
      clock_status
      dayName
      dayNumber
      monthName
      monthNumber
      year
      punches
      dateNumber
      dateName
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
export const deleteTimeSheet = /* GraphQL */ `
  mutation DeleteTimeSheet(
    $input: DeleteTimeSheetInput!
    $condition: ModelTimeSheetConditionInput
  ) {
    deleteTimeSheet(input: $input, condition: $condition) {
      id
      clock_status
      dayName
      dayNumber
      monthName
      monthNumber
      year
      punches
      dateNumber
      dateName
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
export const createTimeSheetEntrys = /* GraphQL */ `
  mutation CreateTimeSheetEntrys(
    $input: CreateTimeSheetEntrysInput!
    $condition: ModelTimeSheetEntrysConditionInput
  ) {
    createTimeSheetEntrys(input: $input, condition: $condition) {
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
export const updateTimeSheetEntrys = /* GraphQL */ `
  mutation UpdateTimeSheetEntrys(
    $input: UpdateTimeSheetEntrysInput!
    $condition: ModelTimeSheetEntrysConditionInput
  ) {
    updateTimeSheetEntrys(input: $input, condition: $condition) {
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
export const deleteTimeSheetEntrys = /* GraphQL */ `
  mutation DeleteTimeSheetEntrys(
    $input: DeleteTimeSheetEntrysInput!
    $condition: ModelTimeSheetEntrysConditionInput
  ) {
    deleteTimeSheetEntrys(input: $input, condition: $condition) {
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
