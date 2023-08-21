import {ETransportStatus, ETransportTypes, ITransportBase} from './index'

export class TransportBase implements ITransportBase {
    licensePlate: string
    mileage: number
    purchaseDate: string
    type: ETransportTypes
    model: string
    status: ETransportStatus

    constructor() {
        this.licensePlate = 'AA1234'
        this.mileage= 0
        this.purchaseDate = '2021-11-11'
        this.type = ETransportTypes.CARGO
        this.model = 'my best model'
        this.status = ETransportStatus.FREE
    }
}
