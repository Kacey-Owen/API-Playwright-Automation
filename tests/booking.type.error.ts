export interface bookingDates {
    checkin: string,
    checkout: string
}

export interface BookingTypeErrorRequest {
    firstname: string,
    lastname: string,
    totalprice: string,
    depositpaid: boolean,
    bookingdates: bookingDates,
    additionalneeds: string
}

export const myDates: bookingDates = {
    checkin: "2026-10-31",
    checkout: "2026-11-01"
}

export const myBookingTypeError: BookingTypeErrorRequest = {
    firstname: "Jack",
    lastname: "Allen",
    totalprice: "112",
    depositpaid: true,
    bookingdates: myDates,
    additionalneeds: "Breakfast"
}