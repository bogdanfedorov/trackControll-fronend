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


export interface Transport extends ITransportBase {
    id: number;
}


