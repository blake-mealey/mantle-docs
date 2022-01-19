---
sidebar_position: 3
title: Getting Started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The quickest way to get started is with the
[Examples](https://github.com/blake-mealey/mantle-examples) repo. This guide will walk you through
deploying your first project with Mantle using the [Getting
Started](https://github.com/blake-mealey/mantle-examples/tree/main/examples/getting-started)
example.

## Get the tools

Before we get started, you'll need to install a couple of tools. First of all, make sure you have
Git installed. If not, you can install it from its official
[downloads](https://git-scm.com/downloads) page.

Next, you'll need to install Foreman which is a Roblox toolchain manager (in other
words, it's what you will use to install Mantle). You can find more information on this in the
[Installation](/docs/installation) guide, but we'll go through it step-by-step here.

<Tabs>
<TabItem value="windows" label="Windows" default>

1. Head over to the Foreman [Releases](https://github.com/roblox/foreman/releases) page, and download
   the latest Windows version (look for the `foreman-x.x.x-win64.zip` link).
2. Once downloaded, unzip the folder
3. Copy the `foreman.exe` file to a reusable location. I like to put mine in `C:\Programs` (you'll
   have to create this folder as it's not a default one)
4. Add `foreman` to your path so that you can execute it from anywhere on your system. Open the
   start menu and search "Edit the system environment variables." In the dialog that opens, click
   "Environment Variables..." Look for the "Path" variable under "System variables" and edit it.
   Click "New" to add an entry and enter the path of the _folder_ you put your `foreman.exe` file
   into (for me it's `C:\Programs`).
5. Open a terminal and run `foreman --version` to verify it's working

</TabItem>
<TabItem value="macos" label="MacOS">

1. Head over to the Foreman [Releases](https://github.com/roblox/foreman/releases) page, and download
   the latest MacOS version (look for the `foreman-x.x.x-macos.zip` link).

> TODO: finish writing these docs for MacOS

</TabItem>
</Tabs>

## Clone the examples repo

Now it's time to clone the [Examples](https://github.com/blake-mealey/mantle-examples) repo. In a
terminal, run `git clone https://github.com/blake-mealey/mantle-examples` to clone the repo to your
computer. Now run `cd mantle-examples` to enter the project.

## Install Mantle

Now you can install Mantle using Foreman for the Examples project. Note that this will only be
installing Mantle for this project based on it's `foreman.toml` file. Run `foreman install` to
install Mantle. To verify it was installed correctly, run `mantle --version`.

## Deploy your first project

Now it's time to deploy your first project! Run `mantle deploy examples/getting-started --environment dev` to deploy the getting started project.

:::caution
If you are a MacOS user, or you are a Windows user but you are not currently logged in to Roblox
Studio, you will need to provide a `ROBLOSECURITY` environment variable. You can read more about
this in the [Authentication](/docs/authentication) guide.
:::

## Destroy the project when you are finished

If you are done with the example project and you would like to get rid of the places it created in
your Roblox account, you can run `mantle destroy examples/getting-started --environment dev` to
destroy the project. Note that the resources will still be in Roblox but they will be archived and
hidden wherever possible.
