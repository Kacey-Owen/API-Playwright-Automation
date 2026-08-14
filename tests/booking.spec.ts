import { test, expect } from '@playwright/test';
import { myBooking } from './booking.info';
import { myBookingError } from './booking.info.error';

test.describe('Happy Path', () => {

    test('Check if api is up and running', async ({ request }) => {
        //ping api
        const response = await request.get('/ping');

        expect(response.status()).toBe(201);
    });

    test('get booking list and test specific id', async ({ request }) => {
        //get list 
        const list = await (await request.get('/booking')).json();

        //get specific id
        const response = await request.get(`/booking/${list[0].bookingid}`);

        expect(response.ok()).toBeTruthy();

        //get json
        const responseJson = await response.json();

        expect(responseJson).toHaveProperty('firstname');
        expect(responseJson).toHaveProperty('totalprice');
        expect(responseJson).toHaveProperty('depositpaid');
        expect(responseJson).toHaveProperty('bookingdates');
    });
    
    test('Create a booking, then update it, then delete it ', async ({ request }) => {
        //create booking
        const createBooking = await request.post('/booking', {
            data: myBooking,
        });
        //check for successful post
        expect(createBooking.status()).toBe(200);
        //find booking with booking id
        const response = await createBooking.json();

        expect(response.booking.firstname).toBe(myBooking.firstname);
        expect(response.booking.lastname).toBe(myBooking.lastname);

        const booking = await (await request.get(`/booking/${response.bookingid}`)).json();
        //check for the correct booking details
        expect(booking.firstname).toBe(myBooking.firstname);
        expect(booking.totalprice).toBe(myBooking.totalprice);
        //create auth token and update booking
        const authResponse = await request.post('/auth', {
            data: {
                username: "admin",
                password: "password123" 
            }
        });

        const myToken = await authResponse.json();

        const updatedBooking = await request.patch(`/booking/${response.bookingid}`, {
            data: { depositpaid: false},
            headers: {
                'Cookie': `token=${myToken.token}`,
                'Accept': 'application/json'
            }
        });
        //test the partial booking update
        expect(updatedBooking.ok()).toBeTruthy();
        const updatedResponse = await updatedBooking.json();
        expect(updatedResponse.depositpaid).toBe(false);
        //delete booking
        const deleteResponse = await request.delete(`/booking/${response.bookingid}`, {
            headers: {
                'Cookie': `token=${myToken.token}`,
                'Content-Type': 'application/json'
            }
        });
        //test if deletion worked as expected
        expect(deleteResponse.status()).toBe(201);
        const confirmDeleted = await request.get(`/booking/${response.bookingid}`);
        expect(confirmDeleted.status()).toBe(404);
    });

    test.describe('Negative Paths', () => {
        test('404 response for nonexistant booking id', async ({ request }) => {
        //test nonexistant booking id
        const response = await request.get('/booking/0');

        expect(response.status()).toBe(404);
        });

        test('try to create booking missing a required field', async ({ request }) => {
            //create booking with missing last name field
            const createBooking = await request.post('/booking', {
                data: myBookingError,
            });
            //expect error code 500
            expect(createBooking.status()).toBe(500);
        });
    });
});