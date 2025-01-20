export interface AddressType {
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface EventParticipant {
  username: string;
  email: string;
  profilePicture: string;
}

export interface Event {
  id: number;
  name: string;
  scheduledStart: string;
  status: "SCHEDULED" | "CANCELLED" | "STARTED" | "FINISHED";
  address: AddressType;
  participants: EventParticipant[];
}

export interface EventCreate {
  name: string;
  scheduledStart: string;
  address: AddressType;
}
