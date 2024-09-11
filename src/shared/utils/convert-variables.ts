export const replaceVariablesWithPlaceholders = (jsonString: string) => {
  return jsonString.replace(/{{(.*?)}}/g, (match, p1) => `__VAR_${p1}__`);
};

export const restoreVariablesFromPlaceholders = (jsonString: string) => {
  return jsonString.replace(/__VAR_(.*?)__/g, (match, p1) => `{{${p1}}}`);
};
