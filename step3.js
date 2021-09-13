const fsp = require("fs").promises;
const axios = require("axios");

let pathArg, outputArg;

if (String(process.argv[2]) === "--out") {
    pathArg = String(process.argv[4]);
    outputArg = String(process.argv[3]);
} else {
    pathArg = String(process.argv[2]);
}

async function cat(path) {
    let data;
    try {
        data = await fsp.readFile(path, "utf-8");
    } catch (err) {
        console.error(`Error reading ${path}`, err.message);
        process.exit(1);
    }
    outputArg ? catWrite(data): console.log(data);
}

async function webCat(url) {
    let resp;
    try {
        resp = await axios.get(url);
    } catch (err) {
        console.error(`Error fetching ${url}`, err.message);
        process.exit(1);
    }
    outputArg ? catWrite(resp.data): console.log(resp.data);
}

async function catWrite(content) {
    try {
        await fsp.writeFile(outputArg, content, "utf-8");
    } catch (err) {
        console.error(`Couldn't write file ${file}`, err.message);
        process.exit(1);
    }
}

try {
    new URL(pathArg);
    webCat(pathArg);
} catch (_) {
    cat(pathArg);
}
