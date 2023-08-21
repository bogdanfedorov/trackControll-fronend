import {ETransportStatus, ETransportTypes, ITrackBase, ITransport, ITransportBase, TrackStatus} from './index'

export class TransportBase implements ITransportBase {
  licensePlate: string
  mileage: number
  purchaseDate: string
  type: ETransportTypes
  model: string
  status: ETransportStatus

  constructor() {
    this.licensePlate = 'AA1234'
    this.mileage = 0
    this.purchaseDate = '2021-11-11'
    this.type = ETransportTypes.CARGO
    this.model = 'my best model'
    this.status = ETransportStatus.FREE
  }
}

export class Transport extends TransportBase implements ITransport {
  id: number

  constructor() {
    super()
    this.id = 1
  }
}


export class TrackBase implements ITrackBase {
  startCity: string
  endCity: string
  distance: number
  departureDate?: string
  completionDate?: string
  requiredTransportType: ETransportTypes
  expectedRevenue: number
  cargoTransport: ITransport
  cargoTransportId: number | null
  status: TrackStatus

  constructor() {
    this.startCity = 'start city'
    this.endCity = 'end city'
    this.distance = 100
    this.departureDate = '2021-11-11'
    this.completionDate = '2021-11-11'
    this.requiredTransportType = ETransportTypes.CARGO
    this.expectedRevenue = 100
    this.cargoTransport = new Transport()
    this.cargoTransportId = null
    this.status = TrackStatus.PENDING
  }
}

export class Track extends TrackBase {
  id: number

  constructor() {
    super()
    this.id = 1
  }
}
