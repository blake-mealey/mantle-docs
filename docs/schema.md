---
title: Configuration
toc_max_heading_level: 6
---

## Config file resolving

All Mantle commands accept a `PROJECT` argument which tells Mantle where to look for your config file.
Mantle uses the following rules to find your config file:

1. If the `PROJECT` argument was _not provided_, use the `mantle.yml` file in the current directory as the
   config file (if it exists).
2. If the `PROJECT` argument was _a directory_, use the `mantle.yml` file in that directory as
   the config file (if it exists).
3. If the `PROJECT` argument was _a file_, use it as the config file (if it exists).

If no config file is found, Mantle will exit with an error code.

## YAML syntax

Mantle config files use YAML syntax, and should have either a `.yml` or `.yaml` file extension. To
quickly get started with the YAML syntax, see "[Learn YAML in Y Minutes](https://learnxinyminutes.com/docs/yaml/)"
or read through the examples in this guide and in the [Examples](https://github.com/blake-mealey/mantle-examples)
repo.

## Schema

### `environments` <span class="badge badge--danger">required</span>

The list of environments which Mantle can deploy to.
#### `environments.*.branches`

An array of file globs to match against Git branches. If the `--environment` flag is not specified, Mantle will pick the first environment which contains a matching file glob for the current Git branch. If no environments match, Mantle will exit with a success code.
#### `environments.*.name` <span class="badge badge--danger">required</span>

The name of the environment that is used to identify the environment via the `--environment` flag. Must be unique across all environments.
#### `environments.*.overrides`

Environment-specific overrides for the target resource definition. This will override all configuration, including changes made by the `targetNamePrefix` and `targetAccess` fields.
#### `environments.*.tagCommit`

Whether or not to tag the commit with place file versions after successful deployments. It is recommended to only enable this on your production environment. Tags will be of the format `<name>-v<version>` where `<name>` is the name of the place and `<version>` is the place's Roblox version.
#### `environments.*.targetAccess`

Overrides the target's access. The implementation is dependent on the target's type. For Experience targets, the `configuration.playability` field will be overridden.
#### `environments.*.targetNamePrefix`

Adds a prefix to the target's name configuration. The implementation is dependent on the target's type. For Experience targets, all place names will be updated with the prefix.
### `owner`

The owner of the resources that will be created. Defaults to `"personal"`.
#### `owner.group` <span class="badge badge--danger">required</span>


### `payments`

Where Robux should come from to purchase resources (if `--allow-purchases` is enabled). Defaults to `"owner"`.
### `state`

Defines how Mantle should manage state files (locally or remotely). Defaults to `"local"`.
#### `state.remote` <span class="badge badge--danger">required</span>


##### `state.remote.bucket` <span class="badge badge--danger">required</span>

The name of your AWS S3 bucket.
##### `state.remote.key` <span class="badge badge--danger">required</span>

The key to use to store your state file. The file will be named with the format `<key>.mantle-state.yml`.
##### `state.remote.region` <span class="badge badge--danger">required</span>

The AWS region your S3 bucket is located in.
###### `state.remote.region.custom` <span class="badge badge--danger">required</span>


###### `state.remote.region.custom.endpoint` <span class="badge badge--danger">required</span>


###### `state.remote.region.custom.name` <span class="badge badge--danger">required</span>


### `target` <span class="badge badge--danger">required</span>

Defines the target resource which Mantle will deploy to. Currently Mantle only supports targeting Experiences, but in the future it will target other types like Plugins and Models.
#### `target.experience` <span class="badge badge--danger">required</span>


##### `target.experience.assets`

A list of assets to include in your experience.
##### `target.experience.badges`

Badges that can be awarded within your experience.
##### `target.experience.configuration`

The Experience's Roblox configuration.
##### `target.experience.passes`

Passes that can be purchased within your experience for Robux.
##### `target.experience.places`

The places to create in the experience. There must be at least one place supplied with the name `"start"`, which will be used as the start place for the experience.
##### `target.experience.products`

Products that can be purchased within your experience for Robux.
##### `target.experience.socialLinks`

A list of social links that will appear on the experience's webpage.
