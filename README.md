# What is this?

Basically, you can pick a corpus and then type in the text box, and it'll suggest three words that would be likely to come next in the corpus you've picked, after the last two (by default) words you've typed.

## Why not use an LLM? They're great at next-token prediction.

Well, it's partly because I built the original version of this in 2018. That said, this does have a couple of advantages:
- Swapping in a new corpus in this app is nearly trivial if you're running it locally, much easier than fine-tuning an LLM to imitate a particular text it's not already familiar with
- If you have a CS background, it should be pretty easy to fully understand what's going on under the hood here (markov chains, basically), whereas not even the experts *fully* understand what goes on inside a large language model.

## Running the app

1. `yarn run setup`
2. `yarn start` (Runs production build on port 8080)
OR
`yarn start-dev` (Runs development build on port 3000. The production build on port 8080 will still served, but won't rebuilt and may be out of date.)

## Adding a corpus

If you're running your own instance, you can add a new corpus. There are two ways to go about this:

### Adding a corpus from a URL

1. Add the name (title) of the text, the filename you want it saved to, and the URL it can be fetched from to `./server/list.json`
2. Optionally, add `start` and `end` keys to the entry in `list.json` (see below for details on what this means)
3. `yarn run setup`

### Adding a corpus from a file
1. Put a `.txt` file in the directory `./server/corpora/`
2. Add the name (title) of the text and the filename of the file it is in
3. Optionally, add `start` and `end` keys to the entry in `list.json` (see below for details on what this means)

### What do `start` and `end` mean in `list.json`?

These keys are optional, but if present, all text before `start` and after `end` will be ignored. For example, if the `start` of a text is 50 and the `end` is 100, only the 50th through 99th characters of the text will be used.

The reason for this is to allow for the presence of titles, tables of contents, license information and so on in the file of a corpus, while not suggesting next words based on those parts of a file.