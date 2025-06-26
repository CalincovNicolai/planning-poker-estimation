export function generateRoomLabel(roomId: string): string {
  const words = [
    'Sprint',
    'Planning',
    'Retrospective',
    'Daily',
    'Standup',
    'Review',
    'Estimation',
    'Backlog',
    'Refinement',
    'Grooming',
    'Demo',
    'Session',
  ];
  const sum = [...roomId].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const randomWord = words[sum % words.length];
  const randomNumber = (sum % 900) + 100;

  return `${randomWord} #${randomNumber}`;
}
