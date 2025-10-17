/* eslint-disable no-undef */

const devCerts = require("office-addin-dev-certs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const urlDev = "https://localhost:3000/";
const urlProd = "https://sirkolombus.github.io/Nexia_Nastrojovich/"; // Production URL

async function getHttpsOptions() {
  const httpsOptions = await devCerts.getHttpsServerOptions();
  return { ca: httpsOptions.ca, key: httpsOptions.key, cert: httpsOptions.cert };
}

module.exports = async (env, options) => {
  const dev = options.mode === "development";
  const config = {
    devtool: "source-map",
    entry: {
      polyfill: ["core-js/stable", "regenerator-runtime/runtime"],
      launcher: ["./src/launcher/launcher.js", "./src/launcher/launcher.html"],
      sampler: ["./src/sampler/sampler.js", "./src/sampler/sampler.html"],
      terminologie: ["./src/terminologie/terminologie.ts", "./src/terminologie/terminologie.html"],
      klient: ["./src/klient/klient.js", "./src/klient/klient.html"],
      commands: "./src/commands/commands.js",
    },
    output: {
      clean: true,
    },
    resolve: {
      extensions: [".html", ".js", ".ts"],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-typescript"],
            },
          },
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: "html-loader",
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          type: "asset/resource",
          generator: {
            filename: "assets/[name][ext][query]",
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      // Launcher
      new HtmlWebpackPlugin({
        filename: "launcher.html",
        template: "./src/launcher/launcher.html",
        chunks: ["polyfill", "launcher"],
      }),
      
      // Sampler
      new HtmlWebpackPlugin({
        filename: "sampler.html",
        template: "./src/sampler/sampler.html",
        chunks: ["polyfill", "sampler"],
      }),
      
      // Terminologie
      new HtmlWebpackPlugin({
        filename: "terminologie.html",
        template: "./src/terminologie/terminologie.html",
        chunks: ["polyfill", "terminologie"],
      }),
      
      // Klient
      new HtmlWebpackPlugin({
        filename: "klient.html",
        template: "./src/klient/klient.html",
        chunks: ["polyfill", "klient"],
      }),
      
      // Commands
      new HtmlWebpackPlugin({
        filename: "commands.html",
        template: "./src/commands/commands.html",
        chunks: ["polyfill", "commands"],
      }),
      
      // Copy assets and manifest
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "assets/*",
            to: "assets/[name][ext][query]",
          },
          {
            from: "manifest*.xml",
            to: "[name]" + "[ext]",
            transform(content) {
              if (dev) {
                return content;
              } else {
                return content.toString().replace(new RegExp(urlDev, "g"), urlProd);
              }
            },
          },
        ],
      }),
    ],
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      server: {
        type: "https",
        options: env.WEBPACK_BUILD || options.https !== undefined ? options.https : await getHttpsOptions(),
      },
      port: process.env.npm_package_config_dev_server_port || 3000,
    },
  };

  return config;
};
