import { registerAs } from '@nestjs/config';

// all your application settings go here.
export default registerAs('settings', () => ({
    status: {
        pending: 1,
        inProgress: 2,
        inReview: 3,
        complete: 4
    },
    editType: {
        status: 1,
        date: 2
    }
}));
