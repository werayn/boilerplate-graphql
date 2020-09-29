import fs from 'fs-sync';
import path from 'path';

const queries = {
    //User
    getUser: fs.read(path.join(__dirname, '/user/get-user.sql')),
    setUserLogStory: fs.read(path.join(__dirname, '/user/set-user-log-story.sql')),
    //Dashboard
    getMetrics: fs.read(path.join(__dirname, '/dashboard/get-metrics.sql')),
};

export default {
    get: (queryName) => {
        return queries[queryName];
    },
};
