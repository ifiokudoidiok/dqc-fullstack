import {
  CheckboxVisibility,
  initializeIcons,
  DetailsList,
  IGroup,
  Stack,
} from "@fluentui/react";
import { FunctionComponent, useEffect, useState } from "react";
import survey_results from "../../data/survey_results.json";
import { Survey } from "../../types/data";

initializeIcons();

export const SurveyFreeText: FunctionComponent = () => {
  const [surveyData, setSurveyData] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(false);

  const _onRenderColumn = (item?: string) => {
    return <div data-is-focusable={true}>{item}</div>;
  };

  useEffect(() => {
    setLoading(true);
    // Convert responses to strings in the survey_results data
    const updatedSurveyData: Survey = {
      ...survey_results,
      questions: survey_results.questions.map((question) => ({
        ...question,
        responses: question.responses.map((response) => response.toString()),
      })),
    };
    setSurveyData(updatedSurveyData);
    setLoading(false);
  }, []);

  const freeTextAnswers = surveyData?.questions?.filter(
    (question) => question.type === "text"
  );

  return (
    <Stack data-testid="FreeTextTable">
      {surveyData && (
        <DetailsList
          checkboxVisibility={CheckboxVisibility.hidden}
          items={freeTextAnswers?.map((q) => q.responses).flat() || []}
          groups={
            loading
              ? [{ name: "Loading...", startIndex: 0, count: 0 } as IGroup]
              : (freeTextAnswers?.map((q, i) => ({
                  name: q.question_text,
                  startIndex: i,
                  count: q.responses.length,
                })) as IGroup[])
          }
          columns={[{ key: "Free text", name: "Free text", minWidth: 200 }]}
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          ariaLabelForSelectionColumn="Toggle selection"
          checkButtonAriaLabel="select row"
          checkButtonGroupAriaLabel="select section"
          groupProps={{
            showEmptyGroups: true,
          }}
          onRenderItemColumn={_onRenderColumn}
          compact={true}
        />
      )}
    </Stack>
  );
};
