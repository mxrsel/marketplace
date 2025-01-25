import path from "path";

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    mongoDbPath: 'mongodb://localhost/marketplace'
};

export default config;