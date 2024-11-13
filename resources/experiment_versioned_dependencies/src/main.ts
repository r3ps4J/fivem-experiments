import semver from "semver";

function loadVersionedDependencies(resourceName: string, metadataKey: string) {
    for (let i = 0; i < GetNumResourceMetadata(resourceName, metadataKey); i++) {
        /** @type {string} */
        const dependency = GetResourceMetadata(resourceName, metadataKey, i);

        if (dependency.includes(":")) {
            const re = RegExp("(^([A-Za-z/0-9_-]+)(?::(.+))?$)");

            const found = dependency.match(re);

            if (!found) {
                console.log(`Could not parse dependency ${dependency} for resource ${resourceName}`);
                return false;
            }

            const dependencyName = found[2];
            const dependencyState = GetResourceState(dependencyName);

            if (dependencyState === "missing") {
                console.log(`Could not find dependency ${dependency} for resource ${resourceName}`);
                return false;
            }

            const requiredVersion = found[3];
            const actualVersion = GetResourceMetadata(dependencyName, "version", 0);

            if (requiredVersion !== actualVersion) {
                // If they're not exactly equal, try to match using semver
                if (!semver.valid(actualVersion)) {
                    console.log(`Version '${actualVersion}' of dependency '${dependencyName}' is not valid.`);
                    return false;
                }
                if (!semver.validRange(requiredVersion)) {
                    console.log(`Required version range '${requiredVersion}' of dependency '${dependencyName}' in resource '${resourceName}' is not valid.`);
                    return false;
                }

                if (!semver.satisfies(actualVersion, requiredVersion)) {
                    console.log(`Dependency '${dependencyName}' version '${actualVersion}' does not satisfy version '${requiredVersion}' required by resource '${resourceName}'.`);
                    return false;
                }
            }

            if (dependencyState !== "started" && dependencyState !== "starting") {
                const success = StartResource(dependencyName);

                if (!success) {
                    console.log(`Could not start dependency '${dependency}' for resource '${resourceName}'.`);
                    return false;
                }
            }
        }
    }

    return true;
}

on("onResourceStarting", (resourceName: string) => {
    const success = loadVersionedDependencies(resourceName, "experiment_versioned_dependency") &&
        loadVersionedDependencies(resourceName, "experiment_versioned_dependencie"); // experiment_versioned_dependencies without s

    if (!success) {
        CancelEvent();
    }
});
