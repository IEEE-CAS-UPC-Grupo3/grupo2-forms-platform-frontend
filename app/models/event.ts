import dayjs from "dayjs";

export type Event = {
  idEvent: number;
  idAdministrator: number;
  eventTitle: string;
  eventDescription: string;
  imageUrl: string;
  modality: string;
  institutionInCharge: string;
  vacancy: number;
  address: string;
  speaker: string;
  eventDateAndTime: string;
  eventDuration: number;
};

export const formatEventDateTime = (eventDateTime: string): string => {
  const date = dayjs(eventDateTime);
  return date.format("dd/MM/yyyy HH:mm:ss");
};
