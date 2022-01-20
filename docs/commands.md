---
sidebar_position: 7
title: Commands
---

This guide offers some basic information for the CLI's commands which are not yet documented
elsewhere. To view the API of each command, run `mantle help [SUBCOMMAND]`.

## Deploy

Deploy a Mantle project. For a detailed walkthrough, see the [Getting
Started](/docs/getting-started#deploy-your-first-project) guide.

## Outputs

If you want to know the ID of a resource which Mantle created so you can reference it in your game,
you can run `mantle outputs` from your project directory.

After deploying the
[getting-started](https://github.com/blake-mealey/mantle-examples/tree/main/examples/getting-started)
example project for the first time, running the outputs command will print something like this:

```txt
Load outputs:
  ╷
  │  Loaded config file .\examples\getting-started\mantle.yml
  │  Selected provided environment configuration dev
  │  Loading previous state from local file .\examples\getting-started\.mantle-state.yml
  │
  ╰─ Succeeded

{
  "experienceActivation_singleton": "experienceActivation",
  "experienceConfiguration_singleton": "experienceConfiguration",
  "experience_singleton": {
    "experience": {
      "assetId": 3272076227,
      "startPlaceId": 8588802093
    }
  },
  "placeConfiguration_start": "placeConfiguration",
  "placeFile_start": {
    "placeFile": {
      "version": 2
    }
  },
  "place_start": {
    "place": {
      "assetId": 8588802093
    }
  }
}
```

## Destroying

If you want to destroy a deployment you can run `mantle destroy` from your project directory.

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

Run `mantle import --environment <your-environment> --target-id <experience-id>`.
