import validate from "./submitTable";

describe("validateSubmitTableInput", () => {
  xit("should validate data with all expected fields", () => {
    const input = {
      location: "test",
      name: "test",
      tableType: "test",
      description: "test",
      restroomType: "test",
      publiclyAccessible: "test"
    };

    const result = validate(input);
    expect(Object.keys(result.errors)).toHaveLength(0);
    expect(result.isValid).toBeTruthy();
  });

  xit.each([
    ["location", "Location field is required"], 
    ["name", "Name field is required"],
    ["tableType", "Table Type field is required"],
    ["description", "Description field is required"],
    ["restroomType", "Restroom Type field is required"],
    ["publiclyAccessible", "Public Accessibility field is required"]
  ])("should require the %s field to be non-empty", (fieldName, expectedError) => {
    const input = {
      location: "test",
      name: "test",
      tableType: "test",
      description: "test",
      restroomType: "test",
      publiclyAccessible: "test"
    };

    input[fieldName] = "";
    const result = validate(input);
    expect(result.errors[fieldName]).toBe(expectedError);
  });
});
