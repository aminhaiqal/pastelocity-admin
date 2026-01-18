export enum CuttingType {
  LONG_SLEEVE = "Long Sleeve",
  CUTTING_SLIM = "Cutting Slim",
  KAFTAN = "Kaftan",
  BLOUSE = "Blouse",
}

export enum Status {
  EDITOR = "WAITING FOR PAYMENT",
  PREPARING = "PREPARING",
  SHIPPING = "SHIPING",
  DONE = "DONE",

  CANCEL = "CANCEL",
  RETURN = "RETURN",
}

export enum State {
  JOHOR = "Johor",
  KEDAH = "Kedah",
  KELANTAN = "Kelantan",
  MELAKA = "Melaka",
  NEGERI_SEMBILAN = "Negeri Sembilan",
  PAHANG = "Pahang",
  PERAK = "Perak",
  PERLIS = "Perlis",
  PENANG = "Penang",
  SELANGOR = "Selangor",
  TERENGGANU = "Terengganu",
  SABAH = "Sabah",
  SARAWAK = "Sarawak",
  WILAYAH_PERSEKUTUAN_KUALA_LUMPUR = "Kuala Lumpur",
  WILAYAH_PERSEKUTUAN_LABUAN = "Labuan",
  WILAYAH_PERSEKUTUAN_PUTRAJAYA = "Putrajaya",
}

export function isWestMalaysia(state: State): boolean {
  switch (state) {
    case State.JOHOR:
    case State.KEDAH:
    case State.KELANTAN:
    case State.MELAKA:
    case State.NEGERI_SEMBILAN:
    case State.PAHANG:
    case State.PERAK:
    case State.PERLIS:
    case State.PENANG:
    case State.SELANGOR:
    case State.TERENGGANU:
    case State.WILAYAH_PERSEKUTUAN_KUALA_LUMPUR:
    case State.WILAYAH_PERSEKUTUAN_LABUAN:
    case State.WILAYAH_PERSEKUTUAN_PUTRAJAYA:
      return true

    case State.SABAH:
    case State.SARAWAK:
      return false
  }
}
