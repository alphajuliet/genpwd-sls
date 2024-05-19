# genpwd-sls

This is an alternate implementation of the back-end GenPwd function-as-a-service using [Serverless](https://serverless.com). The previous version on Autocode/StdLib is unavailable.

It is exposed as an HTTP URI and deployed on AWS.

There are two functions:
- `{uri}/generators` - this returns a list of the available generators, including the default
- `{uri}/generate` - this returns a list of words, subject to optional parameters provided in the URI query string

The parameters are:
- genId: the generator ID, as selected from the list of available generators
- nwords: how many words to return (default = 10)
- punctuation: flag to include punctuation in the words (default = false)
- numbers: ditto for numbers (default = false)
- capitals: ditto for capital letters (default = false)
- strength: 0: simple, 1: medium, or 2: complex (default = 0)

There is a front-end available at `genpwd-ui`, and I've written a version in iOS Shortcuts.

There is no licence or warranty. Use it however you want.