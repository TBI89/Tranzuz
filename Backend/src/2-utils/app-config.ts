// Super class - app level configuration:
class AppConfig {
    public readonly port = process.env.PORT;
    public readonly mongodbConnectionString = process.env.MONGODB_CONNECTION_STRING;
}

// Inherited class - apples only on development:
class DevelopmentConfig extends AppConfig {
    public isDevelopment = true;
    public isProduction = false;
}

// Inherited class - apples only on production:
class ProductionConfig extends AppConfig {
    public isDevelopment = false;
    public isProduction = true;
}

const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;
