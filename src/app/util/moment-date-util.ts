export class MomentDateUtil {
  public static getStringFrom(potentialMomentObject: unknown): string | undefined {
    if (typeof potentialMomentObject !== 'object') {
      return undefined;
    }

    const value = (potentialMomentObject as any);
    if (value._isAMomentObject && value.format) {
      return value.format('YYYY-MM-DD');
    }
    return undefined;
  }
}
