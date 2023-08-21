export interface Id {
    id: number
}

export enum ETransportTypes {
    CARGO = 'CARGO',
    PASSENGER = 'PASSENGER'
}

export enum ETransportStatus {
    FREE = "FREE",
    OCCUPIED = "OCCUPIED"
}

export interface ITransportBase {
    licensePlate: string;
    model: string;
    purchaseDate: string;
    mileage: number;
    type: ETransportTypes;
    status: ETransportStatus;
}


export interface ITransport extends ITransportBase {
    id: number;
}


export enum TrackStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}

export interface ITrackBase {
    startCity: string;
    endCity: string;
    distance: number;
    departureDate?: string;
    completionDate?: string;
    requiredTransportType: ETransportTypes;
    expectedRevenue: number;
    cargoTransport: ITransport;
    cargoTransportId: number | null;
    status: TrackStatus;
}

export interface ITrack extends ITrackBase {
    id: number;
}

