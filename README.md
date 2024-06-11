## Running the app

`yarn install`
`yarn run setup`
`yarn start`

## Adding a corpus

If you're running your own instance, you can add a new corpus. There are two ways to go about this:

### Adding a corpus from a URL

1. Add the name (title) of the text, the filename you want it saved to, and the URL it can be fetched from to `./src/server/corpora/list.json`
2. Optionally, add `start` and `end` keys to the entry in `list.json` (see below for details on what this means)
3. `yarn run setup`

### Adding a corpus from a file
1. Put a `.txt` file in the directory `./src/server/corpora/`
2. Add the name (title) of the text and the filename of the file it is in
3. Optionally, add `start` and `end` keys to the entry in `list.json` (see below for details on what this means)

### What do `start` and `end` mean in `list.json`?

These keys are optional, but if present, all text before `start` and after `end` will be ignored. For example, if the `start` of a text is 50 and the `end` is 100, only the 50th through 99th characters of the text will be used.

The reason for this is to allow for the presence of titles, tables of contents, license information and so on in the file of a corpus, while not suggesting next words based on those parts of a file.