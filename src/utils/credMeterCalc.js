export const calculateCredScore = ({ timelyPacts = 0, latePacts = 0, droppedPacts = 0 }) => {
  const totalPacts = timelyPacts + latePacts + droppedPacts
  if (totalPacts === 0) return 100

  const score = (timelyPacts * 1 + latePacts * 0.5 + droppedPacts * 0) / totalPacts

  return Math.round(score * 100)
}