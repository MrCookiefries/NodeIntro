const fsp = require("fs").promises;
const axios = require("axios");

const pathArg = String(process.argv[2]);

async function cat(path) {
    let data;
    try {
        data = await fsp.readFile(path, "utf-8");
    } catch (err) {
        console.error(`Error reading ${path}`, err.message);
        process.exit(1);
    }
    console.log(data);
}

async function webCat(url) {
    let resp;
    try {
        resp = await axios.get(url);
    } catch (err) {
        console.error(`Error fetching ${url}`, err.message);
        process.exit(1);
    }
    console.log(resp.data);
}

try {
    new URL(pathArg);
    webCat(pathArg);
} catch (_) {
    cat(pathArg);
}
