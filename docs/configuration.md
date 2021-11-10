---
sidebar_position: 5
---

# Configuration

By default, Rocat looks for a project's configuration in a `rocat.yml` file but you can optionally
point Rocat to any YAML file.

## Reference

The configuration file contains the fields:

- `deployments`: An array of [`Deployment`](#deployment) objects.
  - **Required**
- `templates`: A [`Templates`](#templates) object.
  - **Required**
- `state`: A [`State`](#state) object or `"local"`. Defaults to `"local"`.

#### Deployment

A deployment contains the fields:

- `name`: The name of the deployment. Must be unique across all deployments.
  - **Required**
- `branches`: An array of file globs to match against Git branches. This is how Rocat determines
  which deployment to use.
  - **Required**
- `experienceId`: The ID of a Roblox experience to deploy to.
  - **Required**
- `placeIds`: A dictionary of place names to IDs of Roblox places to deploy to. Note that the name
  should match an entry in the `places` field of the [`Templates`](#templates) object.
  - **Required**
- `deployMode`: The deploy mode to use when deploying place files. Valid options: `publish`, `save`.
  Defaults to `publish`.
- `tagCommit`: A boolean indicating whether or not to tag the commit with place file versions after
  successful deployments. It is recommended to only enable this on production deployment
  configurations.

### Templates

A templates contains the fields:

- `experience`: An [`ExperienceTemplate`](#experiencetemplate) object.
- `places`: A dictionary of place names to [`PlaceTemplate`](#placetemplate) object.
  - **Required**

### ExperienceTemplate

An experience template contains the fields:

- `genre`: The experience's genre. Valid options: `all`, `adventure`, `building`, `comedy`,
  `fighting`, `fps`, `horror`, `medieval`, `military`, `naval`, `rpg`, `sciFi`, `sports`,
  `townAndCity`, `western`.
- `playableDevices`: An array of playable devices. Valid options: `computer`, `phone`, `tablet`,
  `console`.
- `icon`: A file path to a game icon.
- `thumbnails`: An array of file paths to game thumbnails.
- `playability`: The experience's playability. Valid options: `private`, `friends`, `public`.
  `private` will set the experience to inactive, while the others will set it to active and
  additionally configure whether only friends can play it or not.
- `paidAccessPrice`: A price for paid access in Robux. If specified, paid access will be enabled and
  configured to the specified price.
- `privateServerPrice`: A price for private servers in Robux. If specified, private servers will be
  enabled and configured to the specified price. To enable private servers for free, pass `0`.
- `enableStudioAccessToApis`: A boolean indicating whether or not studio should be able to use APIs
  like data stores.
- `allowThirdPartySales`: A boolean indicating whether or not third party sales are allowed in-game.
- `allowThirdPartyTeleports`: A boolean indicating whether or not third party teleports are allowed
  in-game.
- `avatarType`: The experience's avatar type. Valid options: `r6`, `r15`, `playerChoice`.
- `avatarAnimationType`: The experience's avatar animation type. Valid options: `standard`,
  `playerChoice`.
- `avatarCollisionType`: The experience's avatar collision type. Valid options: `outerBox`,
  `innerBox`.

In order to configure the name and description of an experience, use the `name` and `description`
fields of the [`PlaceTemplate`](#placetemplate) for the experience's start place.

### PlaceTemplate

A place template contains the fields:

- `file`: A file path to a Roblox place (either a `.rbxl` or `.rbxlx`).
  - **Required**
- `name`: The display name of the place on the Roblox website and in-game.
- `description`: The description of the place on the Roblox website.
- `maxPlayerCount`: The maximum number of players that can be in a server for the place.
- `allowCopying`: A boolean indicating whether or not other Roblox users can clone your place.
- `serverFill`: How Roblox will fill your servers. Valid options: `robloxOptimized`, `maximum`, or
  an object with the field `reservedSlots` set to a number indicating the number of reserved slots.

### State

A state is either `"local"` or an object with the fields:

- `remote`: A [`RemoteState`](#remotestate) object.
  - **Required**

### RemoteState

A remote state contains the fields:

- `region`: A tuple of `[<name>, <endpoint>]` defining an AWS region. Note that `<endpoint>` is
  optional and only required if the region you wish to use is not a supported option. For valid
  `<name>` options, see [this
  list](https://rusoto.github.io/rusoto/rusoto_core/region/enum.Region.html#variants) converted to
  `kebab-case` (for example `us-west-2`).
  - **Required**
- `bucket`: The name of an AWS S3 bucket.
  - **Required**
- `key`: The key to use to store your state file. Note that it will be automatically postfixed with `".rocat-state.yml"`.
  - **Required**
