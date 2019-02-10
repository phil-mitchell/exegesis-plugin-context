# exegesis-plugin-context

[![Run Status](https://api.shippable.com/projects/5c60aaf93adda8070010b003/badge?branch=master)]()
[![Coverage Badge](https://api.shippable.com/projects/5c60aaf93adda8070010b003/coverageBadge?branch=master)]()
![](https://img.shields.io/github/issues/phil-mitchell/exegesis-plugin-context.svg)
![](https://img.shields.io/github/license/phil-mitchell/exegesis-plugin-context.svg)
![](https://img.shields.io/node/v/exegesis-plugin-context.svg)

## Description

An exegesis plugin to add a extra values to the request context

## Installation

```sh
npm install exegesis-plugin-context
```

## Example

Add this to your Exegesis options:

```js
const exegesisContext = require( 'exegesis-plugin-context' );
const MyDataStore = require( './MyDataStore' );

var dataStore = new MyDataStore();

options = {
    plugins: [
        exegesisContext({
            dataStore: dataStore
        })
    ]
};
```

Within the handler for each operation you can access the provided values via the extraContext property:

```js
async function myOperationHandler( context ) {
    return context.extraContext.dataStore.findItemsForRequest( context );
}
```

This is added during the postRouting phase so it is also available within authenticators.
