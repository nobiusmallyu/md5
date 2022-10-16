# Md5ReverseService

This is a simple node.js based service to look up value for MD5.

### API

```
GET /decrypt?q={query}
```
`query` being the MD5 value.

### Test

To test the service, go to the `bin` directory and run:

```bash
$ node www
```

### Generate Hashes

Go to directory `script` and run `gen.js`.