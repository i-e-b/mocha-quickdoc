# mocha-quickdoc
A simple HTML reporter for Mocha that doesn't include code and helps with folding


# Settings in grunt mocha:
```js
mochaTest: {
    test: {
        options: {
            reporter: 'mocha-quickdoc',
            captureFile: 'results.html',
            quiet: true,
            
            clearRequireCache: true
        },
        src: ['test/**/*.js']
    }
}
```

