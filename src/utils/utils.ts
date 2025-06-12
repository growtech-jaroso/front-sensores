import {TimeFrame} from "../interfaces/time-frames.ts";

export const defaultTimeFrames: TimeFrame[] = [
  { value: "1", label: "Ultimo día", selected: true },
  { value: "2", label: "Últimas 12 horas", selected: false },
  { value: "3", label: "Última hora", selected: false },
];

/**
 * Get the date after which the data should be fetched based on the selected time frame.
 * @param timeFrame - The selected time frame.
 * @return The date after which the data should be fetched in ISO format.
 */
export const getBeforeDate = (timeFrame: TimeFrame): string => {
  const value = timeFrame.value
  const actualTime = new Date().getTime()

  switch (value) {
    case "1":
      return new Date(actualTime - 24 * 60 * 60 * 1000).toISOString()
    case "2":
      return new Date(actualTime - 12 * 60 * 60 * 1000).toISOString()
    case "3":
      return new Date(actualTime - 60 * 60 * 1000).toISOString()
    default:
      return new Date(actualTime - 24 * 60 * 60 * 1000).toISOString();
  }
}