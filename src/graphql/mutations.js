/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLambda = `mutation CreateLambda(
  $input: CreateLambdaInput!
  $condition: ModelLambdaConditionInput
) {
  createLambda(input: $input, condition: $condition) {
    id
    title
    content
    price
    rating
  }
}
`;
export const updateLambda = `mutation UpdateLambda(
  $input: UpdateLambdaInput!
  $condition: ModelLambdaConditionInput
) {
  updateLambda(input: $input, condition: $condition) {
    id
    title
    content
    price
    rating
  }
}
`;
export const deleteLambda = `mutation DeleteLambda(
  $input: DeleteLambdaInput!
  $condition: ModelLambdaConditionInput
) {
  deleteLambda(input: $input, condition: $condition) {
    id
    title
    content
    price
    rating
  }
}
`;
