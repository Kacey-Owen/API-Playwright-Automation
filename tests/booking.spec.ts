import { test, expect } from '@playwright/test';
import { myBooking } from './booking.info';

test.describe('Happy Path', () => {
    test('get booking id list and output one booking', async ({ request }) => {
        //get list 
        const list = await (await request.get('/booking')).json();
        //get specific id
        const response = await request.get(`/booking/${list[0].bookingid}`);
        //output booking
        console.log(await response.json());
    });
    
    test('Create a booking, then update it, then delete it ', async ({ request }) => {
        //create booking
        const createBooking = await request.post('/booking', {
            data: myBooking,
        });
        //check for successful post
        expect(createBooking.status()).toBe(200);
        //find booking with booking id and output json
        const response = await createBooking.json();

        console.log(response.bookingid);

        const booking = await request.get(`/booking/${response.bookingid}`);

        console.log(await booking.json());
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

        expect(updatedBooking.ok()).toBeTruthy();
        //show the update 
        console.log(await updatedBooking.json());
        //delete booking
        const deleteResponse = await request.delete(`/booking/${response.bookingid}`, {
            headers: {
                'Cookie': `token=${myToken.token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(deleteResponse.status());
        expect(deleteResponse.status()).toBe(201);
    });
});