'use strict';

class ContextPlugin {
    constructor( options ) {
        this.options = options;
    }

    postRouting( pluginContext ) {
        pluginContext.extraContext = this.options && Object.assign({}, this.options );
    }
}

module.exports = function plugin( options ) {
    return{
        info: {
            name: 'exegesis-plugin-context'
        },
        options: options,
        makeExegesisPlugin: function makeExegesisPlugin() {
            return new ContextPlugin( options );
        }
    };
};
