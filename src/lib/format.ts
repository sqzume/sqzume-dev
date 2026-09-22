const formatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

/** 2026年9月22日 の形式に整える */
export function formatDate(date: Date): string {
  return formatter.format(date);
}

/** <time datetime> 属性用の 2026-09-22 形式 */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
