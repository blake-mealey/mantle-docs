---
sidebar_position: 5
title: Configuration
---

By default, Mantle looks for a project's configuration in a `mantle.yml` file but you can optionally
point Mantle to any YAML file.

## Reference

The configuration file contains the fields:

- `owner`: The owner of the resources that will be created. An [`Owner`](#owner). Defaults to
  `"personal"`.
- `payments`: Where Robux should come from to purchase resources (if `--allow-purchases` is
  enabled). A [`Payments`](#payments). Defaults to `"owner"`.
- `environments`: An array of [`Environment`](#environment) objects.
  - **Required**
- `target`: A [`Target`](#target) object.
  - **Required**
- `state`: A [`State`](#state). Defaults to `"local"`.

### Owner

An owner is either `"personal"` or an object with the fields:

- `group`: A group ID.
  - **Required**

```yml title="Group Example"
owner:
  group: 5723117
```

```yml title="Personal Example (Default)"
owner: personal
```

When set to `"personal"`, all resources will be created under the authenticated user. When set to a
group, all resources will be created under that group.

### Payments

A payments is either `"owner"`, `"personal"`, or `"group"`.

```yml title="Personal Example"
payments: personal
```

```yml title="Group Example"
payments: group
```

```yml title="Owner Example (Default)"
payments: owner
```

When set to `"owner"`, payments will come from the balance of the owner specified by the
[top-level](#reference) `owner` field. When set to `"personal"`, all purchases will be made from the
authenticated user's balance. When set to `"group"`, all purchases will be made from group funds.
Payments can only be set to `"group"` when `"owner"` is also set to a group, since Roblox does not
allow groups to pay for purchases of resources outside of themselves.

### Environment

A environment contains the fields:

- `name`: The name of the environment. Must be unique across all environments.
  - **Required**
- `branches`: An array of file globs to match against Git branches. If the `--environment` option is
  not specified, this is how Mantle determines which environment to use.
- `tagCommit`: A boolean indicating whether or not to tag the commit with place file versions after
  successful deployments. It is recommended to only enable this on production environment
  configurations.
- `overrides`: An object containing overrides to the [top-level](#reference) `target` configuration.
  The type of this object depends on the type of target. For experience targets, this is an
  [`Experience`](#experience) object.

```yml title="Example"
environments:
  - name: staging
    branches: [dev, dev/*]
    overrides:
      places:
        start:
          configuration:
            name: Staging
  - name: production
    branches: [main]
    overrides:
      configuration:
        playability: public
```

### Target

A target contains _one_ of the fields:

- `experience`: An [`Experience`](#experience) object

```yml title="Example"
target:
  experience: {}
```

In the future, Mantle will support other target types like Plugins and Models.

### Experience

An experience contains the fields:

- `configuration`: An [`ExperienceConfiguration`](#experienceconfiguration) object.
- `places`: A dictionary of place names to [`Place`](#place) objects. There must be
  at least one place supplied with the name `"start"`, which will be used as the start place for the
  experience.
  - **Required**
- `socialLinks`: An array of [`SocialLink`](#sociallink) objects.
- `products`: A dictionary of product names to [`Product`](#product) objects.
- `passes`: A dictionary of pass names to [`Pass`](#pass) objects.
- `badges`: A dictionary of badge names to [`Badge`](#badge) objects.
- `assets`: An array of [`Asset`](#asset).

### ExperienceConfiguration

An experience contains the fields:

- `genre`: The experience's genre. Valid options: `all`, `adventure`, `building`, `comedy`,
  `fighting`, `fps`, `horror`, `medieval`, `military`, `naval`, `rpg`, `sciFi`, `sports`,
  `townAndCity`, `western`. Defaults to `all`.
- `playableDevices`: An array of playable devices. Valid options: `computer`, `phone`, `tablet`,
  `console`. Defaults to `[computer, phone, tablet]`.
- `icon`: A file path to a game icon.
- `thumbnails`: An array of file paths to game thumbnails.
- `playability`: The experience's playability. Valid options: `private`, `friends`, `public`.
  `private` will set the experience to inactive, while the others will set it to active and
  additionally configure whether only friends can play it or not. Defaults to `private`.
- `paidAccessPrice`: A price for paid access in Robux. If specified, paid access will be enabled and
  configured to the specified price. Defaults to paid access disabled with no price.
- `privateServerPrice`: A price for private servers in Robux. If specified, private servers will be
  enabled and configured to the specified price. To enable private servers for free, pass `0`.
  Defaults to private servers disabled with no price.
- `enableStudioAccessToApis`: A boolean indicating whether or not studio should be able to use APIs
  like data stores. Defaults to `false`.
- `allowThirdPartySales`: A boolean indicating whether or not third party sales are allowed in-game.
  Defaults to `false`.
- `allowThirdPartyTeleports`: A boolean indicating whether or not third party teleports are allowed
  in-game. Defaults to `false`.
- `avatarType`: The experience's avatar type. Valid options: `r6`, `r15`, `playerChoice`. Defaults
  to `r15`.
- `avatarAnimationType`: The experience's avatar animation type. Valid options: `standard`,
  `playerChoice`. Defaults to `playerChoice`.
- `avatarCollisionType`: The experience's avatar collision type. Valid options: `outerBox`,
  `innerBox`. Defaults to `outerBox`.
- `avatarScaleConstraints`: The experience's avatar scale constraints. An
  [`AvatarScaleConstraints`](#avatarscaleconstraints) object. Defaults to Roblox's defaults.
- `avatarAssetOverrides`: The experience's avatar asset overrides. An
  [`AvatarAssetOverrides`](#avatarassetoverrides) object. Defaults to no overrides (player's
  choice).

```yml title="Example"
target:
  experience:
    configuration:
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
fields of the [`PlaceConfiguration`](#placeconfiguration) for the experience's start place.

### AvatarScaleConstraints

An avatar scale constraints contains the fields:

- `height`: The height constraints. A [`Constraint`](#constraint) object.
- `width`: The width constraints. A [`Constraint`](#constraint) object.
- `head`: The head constraints. A [`Constraint`](#constraint) object.
- `bodyType`: The body type constraints. A [`Constraint`](#constraint) object.
- `proportions`: The proportions constraints. A [`Constraint`](#constraint) object.

```yml title="Example"
target:
  experience:
    configuration:
      avatarScaleConstraints:
        height:
          min: 0.95
        width:
          max: 0.9
        proportions:
          min: 30
          max: 50
```

### Constraint

A constraint contains the fields:

- `min`: The minimum value (float).
- `max`: The maximum value (float).

### AvatarAssetOverrides

An avatar asset overrides contains the fields:

- `face`: The face override. An asset ID.
- `head`: The head override. An asset ID.
- `torso`: The torso override. An asset ID.
- `leftArm`: The left arm override. An asset ID.
- `rightArm`: The right arm override. An asset ID.
- `leftLeg`: The left leg override. An asset ID.
- `rightLeg`: The right leg override. An asset ID.
- `tshirt`: The t-shirt override. An asset ID.
- `shirt`: The shirt override. An asset ID.
- `pants`: The pants override. An asset ID.

```yml title="Example"
target:
  experience:
    configuration:
      avatarAssetOverrides:
        face: 7699174
        shirt: 5382048848
        pants: 5611120855
```

### Place

A place contains the fields:

- `file`: A file path to a Roblox place. Only `.rbxlx` is supported at this time (see
  [#47](https://github.com/blake-mealey/mantle/issues/47) for more information).
- `configuration`: A [`PlaceConfiguration`](#placeconfiguration) object.

```yml title="Example"
target:
  experience:
    places:
      start:
        file: game.rbxlx
        configuration:
          name: Pirate Wars!
          description: |-
            Duke it out on the high seas in your pirate ship!

            🍂 Fall update: new cannons, new ship types!
          maxPlayerCount: 10
          serverFill: robloxOptimized
```

```yml title="Reserved Slots Example"
target:
  experience:
    places:
      start:
        file: game.rbxlx
        configuration:
          serverFill:
            reservedSlots: 10
```

### PlaceConfiguration

A place configuration contains the fields:

- `name`: The display name of the place on the Roblox website and in-game. Defaults to `"Untitled Game"`.
- `description`: The description of the place on the Roblox website. Defaults to `"Created with Mantle"`.
- `maxPlayerCount`: The maximum number of players that can be in a server for the place. Defaults to
  `50`.
- `allowCopying`: A boolean indicating whether or not other Roblox users can clone your place.
  Defaults to `false`.
- `serverFill`: How Roblox will fill your servers. Valid options: `robloxOptimized`, `maximum`, or
  an object with the field `reservedSlots` set to a number indicating the number of reserved slots.
  Defaults to `robloxOptimized`.

### SocialLink

A social link contains the fields:

- `title`: The display name of the social link on the Roblox website.
  - **Required**
- `url`: The URL of the social link. Must be one of the Roblox supported social link types.
  - **Required**

```yml title="Example"
target:
  experience:
    socialLinks:
      - title: Follow on Twitter
        url: https://twitter.com/blakemdev
```

### Product

A product contains the fields:

- `name`: The display name of the developer product on the Roblox website and in-game.
  - **Required**
- `description`: The description of the developer product on the Roblox website and in-game.
  Defaults to `""`.
- `icon`: A file path to a product icon. Defaults to no icon.
- `price`: The price of the developer product in Robux.
  - **Required**

```yml title="Example"
target:
  experience:
    products:
      fiftyGold:
        name: 50 Gold
        description: Add 50 gold to your wallet!
        icon: products/50-gold.png
        price: 25
      hundredGold:
        name: 100 Gold
        description: Add 100 gold to your wallet!
        icon: products/100-gold.png
        price: 45
```

Because Roblox does not offer any way to delete developer products, when a product is "deleted" by
Mantle, it is updated in the following ways:

1. Its description is updated to: `Name: <name>\nDescription:\n<description>`
2. Its name is updated to `zzz_Deprecated(<date-time>)` where `<date-time>` is the current date-time
   in `YYYY-MM-DD hh::mm::ss.ns` format.

### Pass

A pass contains the fields:

- `name`: The display name of the game pass on the Roblox website and in-game.
  - **Required**
- `description`: The description of the game pass on the Roblox website and in-game. Defaults to
  `""`.
- `icon`: A file path to a pass icon.
  - **Required**
- `price`: The price of the game pass in Robux. If not specified, the game pass will be off-sale.

```yml title="Example"
target:
  experience:
    passes:
      shipOfTheLine:
        name: Ship of the Line
        description: Get the best ship in the game!
        icon: passes/ship-of-the-line.png
        price: 499
```

Because Roblox does not offer any way to delete game passes, when a pass is "deleted" by
Mantle, it is updated in the following ways:

1. Its description is updated to: `Name: <name>\nPrice: <price>\nDescription:\n<description>`
2. Its name is updated to `zzz_Deprecated(<date-time>)` where `<date-time>` is the current date-time
   in `YYYY-MM-DD hh::mm::ss.ns` format.

### Badge

A badge contains the fields:

- `name`: The display name of the badge on the Roblox website and in-game.
  - **Required**
- `description`: The description of the badge on the Roblox website and in-game. Defaults to `""`.
- `icon`: A file path to a badge icon.
  - **Required**
- `enabled`: A boolean indicating whether or not the badge is enabled. Defaults to `true`.

```yml title="Example"
target:
  experience:
    badges:
      captureFirstShip:
        name: Capture First Ship!
        description: You captured your first enemy ship!
        icon: badges/capture-first-ship.png
```

:::caution
By default, Mantle does not have permission to make purchases with Robux. Since creating badges
costs Robux, you will need to use the `--allow-purchases` flag when you want to create them.
:::

Because Roblox does not offer any way to delete badges, when a badge is "deleted" by
Mantle, it is updated in the following ways:

1. It is disabled
2. Its description is updated to: `Name: <name>\nEnabled: <enabled>\nDescription:\n<description>`
3. Its name is updated to `zzz_Deprecated(<date-time>)` where `<date-time>` is the current date-time
   in `YYYY-MM-DD hh::mm::ss.ns` format.

### Asset

An asset is either a string or an object containing the fields:

- `file`: The file path of the asset (no glob support).
  - **Required**
- `name`: The name of the
  [`rbxgameasset`](https://developer.roblox.com/en-us/articles/Content#rbxgameasset).
  - **Required**

```yml title="Example"
target:
  experience:
    assets:
      - assets/*
      - file: marketing/icon.png
        name: game-icon
```

:::caution
By default, Mantle does not have permission to make purchases with Robux. Since creating and
updating audio assets costs Robux, you will need to use the `--allow-purchases` flag when you want
to create or update them.
:::

If the asset is a string, it will be interpreted as a glob (e.g. `assets/*`) and the `rbxgameasset`
name of each matched file will be its file name without the extension. For example,
`assets/pirate-flag.png` will be given the `rbxgameasset` name `pirate-flag`.

Each file will be uploaded as the asset type matching its file extension. Supported asset types and
their file extensions:

| Asset type | File extensions                                 |
| :--------- | :---------------------------------------------- |
| Image      | `.bmp`, `.gif`, `.jpeg`, `.jpg`, `.png`, `.tga` |
| Audio      | `.ogg`, `.mp3`                                  |

### State

A state is either `"local"` or an object with the fields:

- `remote`: A [`RemoteState`](#remotestate) object.
  - **Required**

```yml title="Remote State Example"
state:
  remote:
    region: [us-west-2]
    bucket: mantle-states
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
  `".mantle-state.yml"`.
  - **Required**
