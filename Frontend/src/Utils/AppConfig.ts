abstract class AppConfig {
    public readonly registerUrl = this.baseUrl + "/api/register/";
    public readonly loginUrl = this.baseUrl + "/api/login/";
    public readonly missionsUrl = this.baseUrl + "/api/missions/";
    public constructor(private baseUrl: string) { }
}

class DevelopmentConfig extends AppConfig {
    public constructor() {
        super("http://localhost:4000");
    }
}

class ProductionConfig extends AppConfig {
    public constructor() {
        super("");
    }
}

const appConfig = new DevelopmentConfig();
// const appConfig = new ProductionConfig();

export default appConfig;
