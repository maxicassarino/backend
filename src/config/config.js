import { config } from 'dotenv';

config();

export default {
    persistence: process.env.PERSISTENCE,
};
