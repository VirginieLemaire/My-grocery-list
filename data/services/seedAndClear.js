require('dotenv').config();
const { exec } = require('node:child_process');

exports.clearDatas = () => {
    // connect to DB and execute script to clear datas from all tables
    exec(`psql ${process.env.DATABASE_TEST_URL} -f ./data/clear_datas.sql`, (error, output) => {
        if (error) {
            console.error("could not execute command: ", error)
            return
        }
        // console.log("Output: \n", output);
    });
};

exports.seedDatas = () => {
    // connect to DB and and execute script to seed datas
    exec(`psql ${process.env.DATABASE_TEST_URL} -f ./data/seed_dispo.sql`, (error, output) => {
        if (error) {
            console.error("could not execute command: ", error)
            return
        }
        // console.log("Output: \n", output);
    });
    
};
