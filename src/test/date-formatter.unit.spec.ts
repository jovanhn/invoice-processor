import {formatDateTime} from "../util/date-formatter";


describe('DateFormatter', () => {
    it('should format date', () => {
        const input1 = '10.10.2024. 19:15:23';
        const input2 = '4.10.2024. 19:15:23';
        const input3 = '14.9.2024. 19:15:23';
        const input4 = '14.10.2024. 9:15:23';
        const input5 = '14.10.2024. 19:5:23';
        const input6 = '14.10.2024. 19:15:3';
        const input7 = '1.1.2024. 9:5:3';

        const formatted = formatDateTime(input1);
        expect(formatted).toEqual('10.10.2024 19:15:23');

        const formatted2 = formatDateTime(input2);
        expect(formatted2).toEqual('04.10.2024 19:15:23');

        const formatted3 = formatDateTime(input3);
        expect(formatted3).toEqual('14.09.2024 19:15:23');

        const formatted4 = formatDateTime(input4);
        expect(formatted4).toEqual('14.10.2024 09:15:23');

        const formatted5 = formatDateTime(input5);
        expect(formatted5).toEqual('14.10.2024 19:05:23');

        const formatted6 = formatDateTime(input6);
        expect(formatted6).toEqual('14.10.2024 19:15:03');

        const formatted7 = formatDateTime(input7);
        expect(formatted7).toEqual('01.01.2024 09:05:03');
    });
})