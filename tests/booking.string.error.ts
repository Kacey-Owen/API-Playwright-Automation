export interface bookingDates {
    checkin: string,
    checkout: string
}

export interface BookingStringErrorRequest {
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

export const myBookingStringError: BookingStringErrorRequest = {
    firstname: "Jack",
    lastname: "Allen",
    totalprice: "abc",
    depositpaid: true,
    bookingdates: myDates,
    additionalneeds: "Breakfast"
}