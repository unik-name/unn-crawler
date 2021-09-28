# Crawler

Crawler scans the [Unikname.network](https://unikname.network) to get information about the peers in the network.

#### ❤️ Support maintenance and development of plugins

This project is fork of [crawler](https://github.com/deadlock-delegate/crawler) from `deadlock` delegate.
If you find this useful, please consider:

- voting for `deadlock` delegate
- donating to `AWtgFYbvtLDYccJvC5MChk4dpiUy2Krt2U`

to support development new plugins and tools for Ark's Ecosystem and maintenance of existing ones. Full list of contributions can be found on [https://arkdelegatesio/delegate/deadlock/](https://arkdelegates.io/delegate/deadlock/contributions/). 🖖

## Prerequisites

- `NodeJS` 12 or 14

## Installation

`yarn`

## Usage

    $ yarn livenet
    $ yarn sandbox
    $ yarn livenet:relay01
    $ yarn sandbox:relay1

or, with a custom node:
`yarn start http://<ip>:<port>`

For port use the p2p port, which is 4001 for UNS's livenet or 4002 for Unikname.network testing sandbox.

## Configuration

You can add a configuration file `config.json`, with the following structure:
- `aliases`: `Object` containing ip addresses as keys and aliases as values

Example:
```
{
  "aliases": {
    "212.47.247.38": "Relay01"
  }
}

```
## Credits

- [Unikname project](https://unikname.com)
- [Unikname.network](https://unikname.network)
- [deadlock](https://github.com/deadlock-delegate)
- [roks0n](https://github.com/roks0n)
- [dmvt](https://github.com/dmvt)

## License

[MIT](LICENSE) © roks0n, Unikname
