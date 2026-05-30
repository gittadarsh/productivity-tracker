export function getProductivityStatus(
  score
) {

  if (score >= 80) {

    return {
      label: "Elite",

      color:
        "text-green-400",
    };
  }

  if (score >= 60) {

    return {
      label: "Strong",

      color:
        "text-cyan-400",
    };
  }

  if (score >= 40) {

    return {
      label: "Average",

      color:
        "text-yellow-400",
    };
  }

  return {

    label:
      "Needs Improvement",

    color:
      "text-red-400",
  };
}