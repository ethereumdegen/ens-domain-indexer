import { AssertionResult, AssertionSuccess } from "../interfaces/types";

 
export const isAssertionSuccess = <T>(
    result: AssertionResult<T>
  ): result is AssertionSuccess<T> => {
    return result.success
  }
  
  export const isAssertionError = <T>(
    result: AssertionResult<T>
  ): result is AssertionResult<T> => {
    return !result.success
  }
  