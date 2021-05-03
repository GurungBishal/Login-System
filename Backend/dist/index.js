"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var userRouter_1 = __importDefault(require("./routes/userRouter"));
var port = 5000;
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/", userRouter_1.default);
var CONNECTION_URL = "mongodb+srv://bishal:bishal123@cluster0.ykvc3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose_1.default
    .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () {
    return app.listen(port, function () {
        console.log("Database connected successfully and app listening on port " + port);
    });
})
    .catch(function (e) {
    console.log(e.message);
});
