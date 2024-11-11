# experiment_soft_dependencies
An experimental resource allowing you to define soft dependencies.

## Usage
This experiment uses the manifest entries `soft_dependency` and `soft_dependencies`. These should also match the manifest entries used by the actual implementation as is currently proposed. When this implementation gets merged, the actual dependency loading should take place before this script executes. This makes it so that this script effectively does nothing, as all soft dependencies would already have the state of `started` or `starting`.

To make use of the experiment, define your dependencies like you normally would, but then in the `soft_dependency` and `soft_dependencies` manifest entries. Now any dependency defined in these manifest entries will start, but only if it is present. Your resource will continue to start as normal if one is missing or fails to start.
