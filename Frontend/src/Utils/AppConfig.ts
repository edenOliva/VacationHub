class AppConfig {

    public registerUrl = "http://localhost:4000/api/register/";
    public loginUrl = "http://localhost:4000/api/login/";

    public vacationsUrl = "http://localhost:4000/api/vacations/";

    public likesUrl = "http://localhost:4000/api/vacations/likes/";
    public likesByUserUrl = "http://localhost:4000/api/vacations/likes-by-user/";
    

}

const appConfig = new AppConfig();

export default appConfig;
