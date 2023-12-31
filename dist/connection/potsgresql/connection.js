"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const sequelize_1 = require("sequelize");
class Connection {
    constructor() {
        this.host = "ep-crimson-band-53171710.us-east-2.aws.neon.fl0.io";
        this.port = 5432;
        this.database = "almacen";
        this.username = "fl0user";
        this.password = "cTZwGzD65bia";
        this.testConnection = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.authenticate();
                console.log("Connection has been established successfully.");
            }
            catch (error) {
                console.error("Unable to connect to the database:", error);
            }
        });
        this.sequelize = new sequelize_1.Sequelize(this.database, this.username, this.password, {
            host: this.host,
            port: this.port,
            dialect: "postgres",
            dialectOptions: {
                ssl: {
                    require: false,
                },
            },
        });
        this.exportSequelize();
    }
    exportSequelize() {
        return this.sequelize;
    }
}
exports.Connection = Connection;
