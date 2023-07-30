import { FontIcon, initializeIcons, Stack, Text } from "@fluentui/react";
import { SurveyFreeText } from "./components/surveys/survey-free-text";
import survey_results from "../src/data/survey_results.json";
import { useEffect, useState } from "react";
import { calculateOverallScore, formatDateToDDMMYYYY } from "./utils";
import { Question, Survey } from "./types/data";

initializeIcons();

function App() {
  const happinessScore = 73;

  return (
    <Stack style={{ margin: 20 }}>
      <h1>
        <FontIcon iconName="ClipboardList" style={{ marginRight: "5px" }} />
        Insert survey title here
      </h1>

      <h1 data-testid="happinessScore">
        <FontIcon iconName="ChatBot" style={{ marginRight: "5px" }} />
        {happinessScore} / 100
      </h1>
      <Stack>
        <SurveyFreeText />
      </Stack>
    </Stack>
  );
}

export default App;
