var replace = require('replace-in-file');
var buildAPI = process.argv[2];
const options = {
    files: 'src/environments/environment',
    from: /{API_ENDPOINT}/g,
    to: buildAPI,
    allowEmptyPaths: false,
};
try {
    let changedFiles = replace.sync(options);
    console.log("Build version set:  " + buildAPI);
}
catch (error) {
    console.error("Error occurred:", error);
}