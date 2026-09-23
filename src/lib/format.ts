/** 画面に出す日付。2026-09-22 の形式に整える */
export function formatDate(date: Date): string {
  return isoDate(date);
}

/** <time datetime> 属性用の 2026-09-22 形式 */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
