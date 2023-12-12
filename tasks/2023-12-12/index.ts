export async function conductInterviews(
  subjects: string[],
  interview: (subject: string) => Promise<string>,
  timeConstraint: number
): Promise<string[]> {
  const result = [];
  for (const subject of subjects) {
    try {
      const startTime = performance.now();
      const interviewResult = await interview(subject);
      const endTime = performance.now();
      const interviewTime = endTime - startTime;
      if (interviewTime > timeConstraint) {
        throw new Error('Timeout');
      }
      result.push(interviewResult);
    } catch (e) {
      result.push((e as any).toString());
    }
  }
  return result;
}
