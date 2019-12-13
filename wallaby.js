module.exports = function (wallaby) {
    return {
        files: [
            "*.ts",
            "!*.test.ts",
        ],
        tests: [
            "*.test.ts"
        ],
        env: { type: "node", runner: "node" },
        testFramework: "ava",
        compilers: {
            "./src/**/*.ts": wallaby.compilers.typeScript({ module: "commonjs" }),
        },
        preprocessors: {
            "./src/**/*.ts": file => require("@babel/core").transform(
                file.content,
                { sourceMaps: true, compact: false, filename: file.path, presets: ["@babel/preset-env"] },
            )
        },
    };
};
