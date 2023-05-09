type Nullable<T> = T | null

export class Post {
  name: string
  post_id?: string | number
  car_id: Nullable<string>
  dealerID: Nullable<string>
  imgs: string[]
  mileage: Nullable<number>
  'Exterior Colour': Nullable<string>
  'Interior Colour': Nullable<string>
  built_year: Nullable<string>
  'Expired Date': Nullable<string> //License Fee Until
  Comments: Nullable<string>

  front_rim: Nullable<string>
  rear_rim: Nullable<string>
  front_tyre: Nullable<string>
  rear_tyre: Nullable<string>
  tyre_model: Nullable<string>
  transmission: Nullable<string>

  'Listing Price': Nullable<number>
  'Factory options': Nullable<string>
  'Aftermarket options': Nullable<string>
  Location: Nullable<string>
  isRegister: Nullable<boolean>
  'VIN number': Nullable<string>
  'Manufactor Listed Colour': Nullable<string>
  'Seller type': Nullable<string>
  services: Nullable<string[]>
  datetimeCreate?: string
}
