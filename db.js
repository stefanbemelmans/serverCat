const MongoClient = require("mongodb").MongoClient;

const dbConnectionUrl = "mongodb+srv://stongoBongo:12345@cluster0-bdkxb.azure.mongodb.net/test?retryWrites=true&w=majority";
// 66rcD#z.P&jBEFD
// 66rcD%23z%2EP%26jBEFD
function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbCollection);
        }
    });
}




module.exports = {
    initialize
};