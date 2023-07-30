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

  const _onRenderColumn = (item?: any) => {
    return <div data-is-focusable={true}>{item}</div>;
  };
  return (
    <Stack data-testid="FreeTextTable">
      <DetailsList
        checkboxVisibility={CheckboxVisibility.hidden}
        items={items}
        columns={[{ key: "Free text", name: "Free text", minWidth: 200 }]}
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        ariaLabelForSelectionColumn="Toggle selection"
        checkButtonAriaLabel="select row"
        checkButtonGroupAriaLabel="select section"
        groupProps={{
          isAllGroupsCollapsed: true,
          showEmptyGroups: true,
        }}
        onRenderItemColumn={_onRenderColumn}
        compact={true}
      />
    </Stack>
  );
};
