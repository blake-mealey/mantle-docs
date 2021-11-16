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
- `state`: A [`State`](#state). Defaults to `"local"`.

### Deployment

A deployment contains the fields:

- `name`: The name of the deployment. Must be unique across all deployments.
  - **Required**
- `branches`: An array of file globs to match against Git branches. If the `--deployment` option is
  not specified, this is how Rocat determines which deployment to use.
- `experienceId`: The ID of a Roblox experience to deploy to. If not provided, Rocat will create a
  new experience.
- `placeIds`: A dictionary of place names to IDs of Roblox places to deploy to. Note that the name
  should match an entry in the `places` field of the [`Templates`](#templates) object. If an ID is
  not provided, Rocat will create a new place.
- `tagCommit`: A boolean indicating whether or not to tag the commit with place file versions after
  successful deployments. It is recommended to only enable this on production deployment
  configurations.
- `overrides`: A [`Templates`](#templates) object. Any supplied fields will override the value
  specified in the [top-level](#reference) `templates` field.

```yml title="Example"
deployments:
  - name: staging
    branches: [dev, dev/*]
    overrides:
      places:
        start:
          name: Staging
  - name: production
    branches: [main]
    overrides:
      experience:
        playability: public
```

### Templates

A templates contains the fields:

- `experience`: An [`Experience`](#experience) object.
- `places`: A dictionary of place names to [`Place`](#place) objects. There must be
  at least one place supplied with the name `"start"`, which will be used as the start place for the
  experience.
  - **Required**
- `products`: A dictionary of product names to [`Product`](#product) objects.
- `passes`: A dictionary of pass names to [`Pass`](#pass) objects.
- `badges`: A dictionary of badge names to [`Badge`](#badge) objects.
- `assets`: An array of [`Asset`](#asset).

### Experience

An experience contains the fields:

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

```yml title="Example"
templates:
  experience:
    genre: naval
    playableDevices: [computer]
    playability: private
    privateServerPrice: 0
    enableStudioAccessToApis: true
    icon: marketing/game-icon.png
    thumbnails:
      - marketing/game-thumbnail-fall-update.png
      - marketing/game-thumbnail-default.png
```

In order to configure the name and description of an experience, use the `name` and `description`
fields of the [`PlaceTemplate`](#placetemplate) for the experience's start place.

### Product

A product contains the fields:

- `name`: The display name of the developer product on the Roblox website and in-game.
  - **Required**
- `price`: The price of the developer product in Robux.
  - **Required**
- `description`: The description of the developer product on the Roblox website and in-game.
- `icon`: A file path to a product icon.

```yml title="Example"
templates:
  products:
    fiftyGold:
      name: 50 Gold
      desription: Add 50 gold to your wallet!
      icon: products/50-gold.png
    hundredGold:
      name: 100 Gold
      desription: Add 100 gold to your wallet!
      icon: products/100-gold.png
```

Because Roblox does not offer any way to delete developer products, when a product is "deleted" by
Rocat, it is updated in the following ways:

1. Its description is updated to: `Name: <name>\nDescription:\n<description>`
2. Its name is updated to `zzz_Deprecated(<date-time>)` where `<date-time>` is the current date-time
   in `YYYY-MM-DD hh::mm::ss.ns` format.

### Pass

A pass contains the fields:

- `name`: The display name of the game pass on the Roblox website and in-game.
  - **Required**
- `icon`: A file path to a pass icon.
  - **Required**
- `price`: The price of the game pass in Robux. If not specified, the game pass will be off-sale.
- `description`: The description of the game pass on the Roblox website and in-game.

```yml title="Example"
templates:
  passes:
    tipJar:
      name: Tip Jar
      desription: Drop some change to support the developers!
      icon: passes/tip-jar.png
```

Because Roblox does not offer any way to delete game passes, when a pass is "deleted" by
Rocat, it is updated in the following ways:

1. Its description is updated to: `Name: <name>\nPrice: <price>\nDescription:\n<description>`
2. Its name is updated to `zzz_Deprecated(<date-time>)` where `<date-time>` is the current date-time
   in `YYYY-MM-DD hh::mm::ss.ns` format.

### Badge

A badge contains the fields:

- `name`: The display name of the badge on the Roblox website and in-game.
  - **Required**
- `icon`: A file path to a badge icon.
  - **Required**
- `description`: The description of the badge on the Roblox website and in-game.
- `enabled`: A boolean indicating whether or not the badge is enabled. Defaults to true.

```yml title="Example"
templates:
  badges:
    captureFirstShip:
      name: Capture First Ship!
      desription: You captured your first enemy ship!
      icon: badges/capture-first-ship.png
```

Because Roblox does not offer any way to delete badges, when a badge is "deleted" by
Rocat, it is updated in the following ways:

1. It is disabled
2. Its description is updated to: `Name: <name>\nEnabled: <enabled>\nDescription:\n<description>`
3. Its name is updated to `zzz_Deprecated(<date-time>)` where `<date-time>` is the current date-time
   in `YYYY-MM-DD hh::mm::ss.ns` format.

:::caution
By default, Rocat does not have permission to make purchases with Robux. Since creating badges costs
Robux, you will need to pass `--allow-purchases` flag when you want to create them.
:::

### Asset

An asset is either a string or an object containing the fields:

- `file`: The file path of the asset (no glob support).
  - **Required**
- `name`: The name of the
  [`rbxgameasset`](https://developer.roblox.com/en-us/articles/Content#rbxgameasset).
  - **Required**

```yml title="Example"
templates:
  assets:
    - assets/*
    - file: marketing/icon.png
      name: game-thumbnail
```

If the asset is a string, it will be interpreted as a glob (e.g. `assets/*`) and the `rbxgameasset`
name of each matched file will be its file name without the extension. For example,
`assets/pirate-flag.png` will be given the `rbxgameasset` name `pirate-flag`.

Each file will be uploaded as the asset type matching its file extension. Supported file extensions
and their asset types:

| Asset type | File extensions                                 |
| :--------- | :---------------------------------------------- |
| Image      | `.bmp`, `.gif`, `.jpeg`, `.jpg`, `.png`, `.tga` |
| Audio      | `.ogg`, `.mp3`                                  |

:::caution
By default, Rocat does not have permission to make purchases with Robux. Since creating and updating
audio assets costs Robux, you will need to pass `--allow-purchases` flag when you want to create or
update them.
:::

### Place

A place contains the fields:

- `file`: A file path to a Roblox place (either a `.rbxl` or `.rbxlx`).
  - **Required**
- `name`: The display name of the place on the Roblox website and in-game.
- `description`: The description of the place on the Roblox website.
- `maxPlayerCount`: The maximum number of players that can be in a server for the place.
- `allowCopying`: A boolean indicating whether or not other Roblox users can clone your place.
- `serverFill`: How Roblox will fill your servers. Valid options: `robloxOptimized`, `maximum`, or
  an object with the field `reservedSlots` set to a number indicating the number of reserved slots.

```yml title="Example"
templates:
  places:
    start:
      file: game.rbxlx
      name: Pirate Wars!
      description: |-
        Duke it out on the high seas in your pirate ship!

        🍂 Fall update: new cannons, new ship types!
      maxPlayerCount: 10
      serverFill: robloxOptimized
```

```yml title="Reserved Slots Example"
templates:
  places:
    start:
      file: game.rbxlx
      serverFill:
        reservedSlots: 10
```

### State

A state is either `"local"` or an object with the fields:

- `remote`: A [`RemoteState`](#remotestate) object.
  - **Required**

```yml title="Remote State Example"
state:
  remote:
    region: [us-west-2]
    bucket: rocat-states
    key: pirate-wars
```

```yml title="Local State Example (Default)"
state: local
```

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
- `key`: The key to use to store your state file. Note that it will be automatically postfixed with
  `".rocat-state.yml"`.
  - **Required**
