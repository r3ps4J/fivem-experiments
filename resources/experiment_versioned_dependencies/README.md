# experiment_versioned_dependencies
An experimental resource enabling the use of semantic versioning for resource dependencies.

## Usage
This experiment uses the manifest entries `experiment_versioned_dependency` and `experiment_versioned_dependencies`, since we can't override the actual `dependency` and `dependencies` manifest entries from resources.

To make use of the experiment, define your dependencies like you normally would, but then in the `experiment_versioned_dependency` and `experiment_versioned_dependencies` manifest entries (basically rename the manifest keys). This should work already without checking for versions, as the default behaviour is to start dependencies like you normally do. To make use of the version checking you can include a colon (`:`) in a dependency followed by a version.

Semantic versioning will be used to compare the versions. To do this we make use of the [node-semver](https://github.com/npm/node-semver) package. This is the package used by npm to compare versions as well, and allows us to use the same range options.

So for an exact match you would use `dependency:1.0.0`, but you can also use [ranges](https://github.com/npm/node-semver?tab=readme-ov-file#ranges). For example `dependency:1.x` or `dependency:^1.2.0`.
