---
sidebar_position: 3
---

# Getting Started

## Authentication

Before you can get started with Rocat, you need to get the necessary authentication pieces. Please
remember never to store secrets in your version control systems as malicious actors could use them
to harm you if they got access.

Rocat uses different authentication pieces for different functionality:

- Place file deployment: Roblox API keys, which can be created in the [Roblox Creator
  portal](https://create.roblox.com/credentials) and can be given to Rocat via the `ROBLOX_API_KEY`
  environment variable.
- All other deployment operations: `.ROBLOSECURITY` cookie, which can be copied from the dev tools on
  roblox.com and can be given to Rocat via the `ROBLOSECURITY` environment variable.
- Remote state file management: AWS credentials, which can be given to Rocat via any of the methods
  supported by
  [rusoto](https://github.com/rusoto/rusoto/blob/master/AWS-CREDENTIALS.md#credentials). The
  simplest option is to provide the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables.

For more information, refer to the [Authentication guide](/docs/authentication).

## Configuration

To get started with Rocat, create a `rocat.yml` file like the following:

```yml
deployments:
  - name: staging
    branches: [dev, dev/*]
    experienceId: 7067418676
    placeIds:
      start: 8468630367
  - name: production:
    branches: [main]
    experienceId: 6428418832
    placeIds:
      start: 4927604916
      world: 7618543001

templates:
  experience:
    genre: naval
    playableDevices: [computer]
    playability: public
    privateServerPrice: 0
    enableStudioAccessToApis: true
    icon: marketing/game-icon.png
    thumbnails:
      - marketing/game-thumbnail-fall-update.png
      - marketing/game-thumbnail-default.png
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

For the full configuration reference, see the [Configuration guide](/docs/configuration).

## Deploying

To deploy with Rocat, just run `rocat deploy` from your project directory! Run `rocat help deploy`
for more information.

## Outputs

If you want to know the ID of a resource which Rocat created so you can reference it in your game,
you can run `rocat outputs` from your project directory. Run `rocat help outputs` for more
information.
