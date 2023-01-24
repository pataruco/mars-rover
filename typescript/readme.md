# Red Badger Mars Rover Challenge

## What it is?

It is code challenge built on TypeScript

## Problem description

You can found it [here](../docs/the-problem.md)

## Requirements

- Node >= v19.4.0
- [pNpm](v19.4.0)

## Installation

**On your terminal console**

- Clone this repo

  ```sh
  git@github.com:pataruco/mars-rover.git
  ```

- Go to to folder

  ```sh
  cd typescript
  ```

- Install dependencies

  ```sh
  pnpm install
  ```

## How to run it

- Inside `typescript` folder run

  ```sh
  pnpm start
  ```

- If you want to change instructions input you can run it like this

  ```sh
  pnpm ts-node ./ --instructions <FILEPATH TO TXT FILE WITH INSTRUCTIONS>
  ```

## Testing

- Inside `typescript` folder run

  ```sh
  pnpm test
  ```

## How to run it with Docker

- Inside `typescript` folder build image

  ```sh
  docker build -t mars-rover-ts .
  ```

- Then run the image

  ```sh
  docker run -t mars-rover-ts
  ```
