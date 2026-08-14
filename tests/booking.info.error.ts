export interface bookingDates {
    checkin: string,
    checkout: string
}

export interface BookingErrorRequest {
    firstname: string,
    totalprice: number,
    depositpaid: boolean,
    bookingdates: bookingDates,
    additionalneeds: string
}

export const myDates: bookingDates = {
    checkin: "2026-10-31",
    checkout: "2026-11-01"
}

export const myBookingError: BookingErrorRequest = {
    firstname: "Jack",
    totalprice: 112,
    depositpaid: true,
    bookingdates: myDates,
    additionalneeds: "Breakfast"
}