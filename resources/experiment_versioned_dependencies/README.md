# experiment_versioned_dependencies
An experimental resource enabling the use of semantic versioning for resource dependencies.

## Usage
This experiment uses the manifest entries `experiment_versioned_dependency` and `experiment_versioned_dependencies`, since we can't override the actual `dependency` and `dependencies` manifest entries from resources.

To make use of the experiment, define your dependencies like you normally would, but then in the `experiment_versioned_dependency` and `experiment_versioned_dependencies` manifest entries (basically rename the manifest keys). This should work already without checking for versions, as the default behaviour is to start dependencies like you normally do. To make use of the version checking you can include a colon (`:`) in a dependency followed by a version.

Having an exact match always works regardless of the format used. So if you add `dependency:version 5` and the dependency has the `version` manifest entry set to `version 5`, it will accept the dependency and start it. If the versions are different, semantic versioning will be used to compare the versions. By default this behaviour is enabled, but it can be disabled by setting the `experiment_versioned_dependencies:allow_exact_version` convar to `0`.

To compare the versions using semantic versioning, we make use of the [node-semver](https://github.com/npm/node-semver) package. This is the package used by npm to compare versions as well, and allows us to use the same range options.

So for an exact match you would use `dependency:1.0.0` (which works regardless, since exact matches always work), but now you can also use [ranges](https://github.com/npm/node-semver?tab=readme-ov-file#ranges). For example `dependency:1.x` or `dependency:^1.2.0`.
