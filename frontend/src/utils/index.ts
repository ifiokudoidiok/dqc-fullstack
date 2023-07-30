export function calculateOverallScore(scores: number[]) {
    if (!Array.isArray(scores) || scores.length === 0) {
      throw new Error("Invalid input: scores must be a non-empty array.");
    }

    // Calculate the sum of all scores
    const sum = scores.reduce((acc, score) => acc + score, 0);

    // Calculate the average score
    const averageScore = sum / scores.length;

    // Round the average score to two decimal places
    const overallScore = Math.round(averageScore * 100) / 100;

    return (overallScore / 5) * 100;
  }

  export function formatDateToDDMMYYYY(inputDate: string | undefined) {
    if (!inputDate) {
      return "N/A";
    }

    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }