---
sidebar_position: 3
---

# Getting Started

## Authentication

Before you can get started with Mantle, you need to get the necessary authentication pieces. Please
remember never to store secrets in your version control systems as malicious actors could use them
to harm you if they got access.

Mantle uses different authentication pieces for different functionality:

- Deployment operations: `.ROBLOSECURITY` cookie, which can be copied from the dev tools on
  roblox.com and can be given to Mantle via the `ROBLOSECURITY` environment variable.
- Remote state file management: AWS credentials, which can be given to Mantle via any of the methods
  supported by
  [rusoto](https://github.com/rusoto/rusoto/blob/master/AWS-CREDENTIALS.md#credentials). The
  simplest option is to provide the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment
  variables.

For more information, refer to the [Authentication guide](/docs/authentication).

## Configuration

To get started with Mantle, create a `mantle.yml` file like the following:

```yml
environments:
  - name: staging
    branches: [dev, dev/*]
    overrides:
      places:
        start:
          configuration:
            name: Staging - Pirate Wars!
  - name: production
    branches: [main]
    overrides:
      experience:
        configuration:
          playability: public

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

For the full configuration reference, see the [Configuration guide](/docs/configuration).

## Deploying

To deploy with Mantle, just run `mantle deploy` from your project directory! Run `mantle help deploy`
for more information.

When deploying the above configuration file for the first time, you'll see something like this:

```txt
Loading project:
  ╷
  │  Loaded config file mantle.yml
  │  Selected deployment configuration staging because the current branch dev matched one of [dev, dev/*]
  │  Loading previous state from local file .mantle-state.yml
  │  No previous state for deployment staging
  │
  ╰─ Succeeded

Deploying resources:
  ╷
  │  + Creating: experience singleton
  │    ╷
  │    │  + assetId: ~
  │    │
  │    ╰─ Succeeded with outputs:
  │         assetId: 3078825648
  │         startPlaceId: 7969246232
  │
  │  + Creating: experienceThumbnail marketing/game-thumbnail-fall-update.png
  │    ╷
  │    │  + experienceId: 3078825648
  │    │  + fileHash: c1811300860fcd79a178142a4f4f7aa73198afa3b64a1b3ae19fc50235e7fa75
  │    │  + filePath: marketing/game-thumbnail-fall-update.png
  │    │
  │    ╰─ Succeeded with outputs:
  │         assetId: 50578876
  │
  │  + Creating: experienceIcon marketing/game-icon.png
  │    ╷
  │    │  + experienceId: 3078825648
  │    │  + fileHash: 787f02689d554fd858b6db2e912179524d348a74ba23cffcc9415815e2a27b33
  │    │  + filePath: marketing/game-icon.png
  │    │
  │    ╰─ Succeeded with outputs:
  │         assetId: 34660038
  │
  │  + Creating: experienceThumbnail marketing/game-thumbnail-default.png
  │    ╷
  │    │  + experienceId: 3078825648
  │    │  + fileHash: d36757cf3312ca2683eb597bed3359367861cd3e4f1c71668fef24f86edb3a12
  │    │  + filePath: marketing/game-thumbnail-default.png
  │    │
  │    ╰─ Succeeded with outputs:
  │         assetId: 50578878
  │
  │  + Creating: experienceThumbnailOrder singleton
  │    ╷
  │    │  + assetIds:
  │    │  +   - 50578876
  │    │  +   - 50578878
  │    │  + experienceId: 3078825648
  │    │
  │    ╰─ Succeeded
  │
  │  + Creating: place start
  │    ╷
  │    │  + assetId: ~
  │    │  + experienceId: 3078825648
  │    │  + isStart: true
  │    │  + startPlaceId: 7969246232
  │    │
  │    ╰─ Succeeded with outputs:
  │         assetId: 7969246232
  │
  │  + Creating: placeConfiguration start
  │    ╷
  │    │  + assetId: 7969246232
  │    │  + configuration:
  │    │  +   name: Staging - Pirate Wars!
  │    │  +   description: "Duke it out on the high seas in your pirate ship!\n\n🍂 Fall update: new cannons, new ship types!"
  │    │  +   maxPlayerCount: 10
  │    │  +   allowCopying: ~
  │    │  +   socialSlotType: Automatic
  │    │  +   customSocialSlotCount: ~
  │    │
  │    ╰─ Succeeded
  │
  │  + Creating: placeFile start
  │    ╷
  │    │  + assetId: 7969246232
  │    │  + fileHash: 991d8b1cadc89be408a9f3cf9c47c4f844f52f439b8e5b20c61c77f194a81c7c
  │    │  + filePath: game.rbxlx
  │    │
  │    ╰─ Succeeded with outputs:
  │         version: 2
  │
  │  + Creating: experienceActivation singleton
  │    ╷
  │    │  + experienceId: 3078825648
  │    │  + isActive: false
  │    │
  │    ╰─ Succeeded
  │
  │  + Creating: experienceConfiguration singleton
  │    ╷
  │    │  + configuration:
  │    │  +   genre: Pirate
  │    │  +   playableDevices:
  │    │  +     - computer
  │    │  +   isFriendsOnly: ~
  │    │  +   allowPrivateServers: true
  │    │  +   privateServerPrice: 0
  │    │  +   isForSale: ~
  │    │  +   price: ~
  │    │  +   studioAccessToApisAllowed: true
  │    │  +   permissions: ~
  │    │  +   universeAvatarType: ~
  │    │  +   universeAnimationType: ~
  │    │  +   universeCollisionType: ~
  │    │  +   isArchived: ~
  │    │  + experienceId: 3078825648
  │    │
  │    ╰─ Succeeded
  │
  │
  ╰─ Succeeded with 10 create(s), 0 update(s), 0 delete(s), 0 noop(s)

Saving state:
  ╷
  │  Saving to local file .mantle-state.yml. It is recommended you commit this file to your source control
  │
  ╰─ Succeeded
```

## Outputs

If you want to know the ID of a resource which Mantle created so you can reference it in your game,
you can run `mantle outputs` from your project directory. Run `mantle help outputs` for more
information.

After deploying the above configuration file for the first time, running the outputs command will
print something like this:

```txt
Load outputs:
╷
│ Loaded config file mantle.yml
│ Selected provided deployment configuration staging
│ Loading previous state from local file .mantle-state.yml
│
╰─ Succeeded

{
  "experience": {
    "singleton": {
      "assetId": 3078825648,
      "startPlaceId": 7969246232
    }
  },
  "experienceIcon": {
    "marketing/game-icon.png": {
      "assetId": 34660038
    }
  },
  "experienceThumbnail": {
    "marketing/game-thumbnail-default.png": {
      "assetId": 50578878
    },
    "marketing/game-thumbnail-fall-update.png": {
      "assetId": 50578876
    }
  },
  "place": {
    "start": {
      "assetId": 7969246232
    }
  },
  "placeFile": {
    "start": {
      "version": 2
    }
  }
}
```

## Destroying

If you want to destroy a deployment you can run `mantle destroy` from your project directory. Run
`mantle help destroy` for more information.

## Importing

Mantle provides an import feature so that you can deploy to an existing experience with Mantle.

:::caution
The import feature _**DOES NOT**_ convert your existing Roblox project into a Mantle project. Do not
import, then deploy a place with Mantle without first testing on a staging environment as you may
destroy your assets.
:::

After creating a staging environment with Mantle that is on-par with your production environment,
you can import your production environment into Mantle so that you can deploy to it. This feature is
still experimental and does not do a good job of matching existing resources to configured ones so
most resources will be recreated.

Run `mantle import --environment <your-environment>`. Run `mantle help import` for more information.
