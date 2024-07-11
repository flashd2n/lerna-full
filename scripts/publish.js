const { join } = require('path');

const publishNpm = async () => {

    const packagesArg = process.argv.find(arg => arg.includes("packages"));

    if (!packagesArg) {
        console.log("No packages to publish");
        return;
    }

    const packagesNames = packagesArg.split("=")[1].split(",");

    console.log("Will publish:");
    console.log(packagesNames.join(" "));

    const { execSync } = require('child_process');

    packagesNames.forEach(packageName => {
        const packageDir = join(__dirname, `../packages/${packageName}`);
        console.log(`Publishing ${packageDir}`);

        execSync('npm publish', { stdio: 'inherit', cwd: packageDir });
    })

    console.log("All packages published");
};

publishNpm();