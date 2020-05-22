const connectToMongoDb =async () => {
    await mongoose.connect(
        'mongodb+srv://webscraping:Qwerty123@clusterscraping-eukyu.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }
        );
    console.log('connected to MongoDb');
};

module.exports = connectToMongoDb;