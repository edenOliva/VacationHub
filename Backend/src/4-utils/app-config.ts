class AppConfig {

}

class DevelopmentConfig extends AppConfig {

    public isDevelopment: true;

    public isProduction: false;

    // server port:
    public port = 4000;

    // server url:
    public serverUrl = "http://localhost:" + this.port;

    // images url:
    public imagesUrl = this.serverUrl + "/api/vacations/images/";

    // database host:
    public mySqlHost = "localhost";

    // database user:
    public mySqlUser = "root";

    // database password:
    public mySqlPassword = "";

    // database name: 
    public mySqlDatabase = "vacations";

}

class ProductionConfig extends AppConfig {

    public isDevelopment: true;

    public isProduction: false;

    // server port:
    public port = 4000;

    // server url:
    public serverUrl = "" + this.port;

    // images url:
    public imagesUrl = this.serverUrl + "";

    // database host:
    public mySqlHost = "";

    // database user:
    public mySqlUser = "";

    // database password:
    public mySqlPassword = "";

    // database name: 
    public mySqlDatabase = "";

}

const appConfig = (process.env.NODE_EW === "production") ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;
