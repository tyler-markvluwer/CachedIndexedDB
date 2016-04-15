System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AddUserValidators;
    return {
        setters:[],
        execute: function() {
            AddUserValidators = (function () {
                function AddUserValidators() {
                }
                AddUserValidators.isValidEmail = function (control) {
                    if (AddUserValidators.re.test(control.value)) {
                        return null;
                    }
                    else {
                        return { invalidEmail: true };
                    }
                };
                AddUserValidators.re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return AddUserValidators;
            }());
            exports_1("AddUserValidators", AddUserValidators);
        }
    }
});
//# sourceMappingURL=add-userValidators.js.map