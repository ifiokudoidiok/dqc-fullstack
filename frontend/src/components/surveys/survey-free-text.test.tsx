import { render } from "@testing-library/react";
import { SurveyFreeText } from "./survey-free-text";

test("Correctly group data and show table", () => {
  const { getByTestId } = render(<SurveyFreeText />);
  expect(getByTestId("FreeTextTable").textContent).toMatch(
    /What data is NOT always reliable and correct\?\(6\)/
  );
});
