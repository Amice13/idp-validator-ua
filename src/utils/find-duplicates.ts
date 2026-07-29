const getDuplicates = <T>(items: readonly T[]): T[] => {
  const counts = new Map<T, number>()

  for (const item of items) {
    counts.set(item, (counts.get(item) ?? 0) + 1)
  }

  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([value]) => value)
}

export default getDuplicates
