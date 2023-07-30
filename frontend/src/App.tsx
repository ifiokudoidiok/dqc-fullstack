import { FontIcon, initializeIcons, Stack, Text } from "@fluentui/react";
import { SurveyFreeText } from "./components/surveys/survey-free-text";
import survey_results from "../src/data/survey_results.json";
import { useEffect, useState } from "react";
import { calculateOverallScore, formatDateToDDMMYYYY } from "./utils";
import { Question, Survey } from "./types/data";

initializeIcons();

function App() {
  // Default values for happiness score and participants
  let happinessScore = 73;
  let participants = 0;
  const [surveyData, setSurveyData] = useState<Survey | null>(null);

  useEffect(() => {
    async function fetchSurveyData() {
      try {
        
        const data: Survey = await survey_results;
        setSurveyData(data);
      } catch (error) {
        console.error("Error fetching survey data:", error);
      }
    }

    fetchSurveyData();
  }, []);

  // Filter survey questions of type "number" to get questions with scores
  const opinionWithScores = surveyData?.questions?.filter(
    (question) => question.type === "number"
  ) as Question[];


  // Calculate overall scores per question and the aggregated happiness score
  const scoresPerQuestion = opinionWithScores?.map((question) => {
    participants = question.responses.length;

    // Ensure all responses are converted to numbers
    const scores = question.responses.map((response) =>
      typeof response === "string" ? parseInt(response, 10) : response
    );
    return calculateOverallScore(scores);
  });

  const aggrHappinessScore =
    (scoresPerQuestion?.reduce((acc, score) => acc + score, 0) || 0) /
    (scoresPerQuestion?.length || 1);

  happinessScore = Math.floor(aggrHappinessScore);

  return (
    <Stack style={{ margin: 20 }}>
    {/* Survey Title */}
    <h1>
      <FontIcon iconName="ClipboardList" style={{ marginRight: "5px" }} />
      {surveyData?.survey_title}
    </h1>

    {/* Survey Metadata */}
    <Text>
      This survey was started on{" "}
      {formatDateToDDMMYYYY(surveyData?.created_at)}. Overall, {participants}{" "}
      people participated in the survey.
    </Text>

    {/* Happiness Score */}
    <h1 data-testid="happinessScore">
      <FontIcon iconName="ChatBot" style={{ marginRight: "5px" }} />
      {happinessScore} / 100
    </h1>

    {/* Render the SurveyFreeText component */}
    <Stack>
      <SurveyFreeText />
    </Stack>
  </Stack>
  );
}

export default App;
