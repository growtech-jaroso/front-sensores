export enum IndicatorStatus {
  TOTAL = "Total",
  ONLINE = "Activa",
  OFFLINE = "Inactiva",
}

export type IndicatorStatusType = keyof typeof IndicatorStatus;
