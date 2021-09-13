const fsp = require("fs").promises;

(async function cat(path) {
    let data;
    try {
        data = await fsp.readFile(path, "utf-8");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(data);
})(String(process.argv[2]));
