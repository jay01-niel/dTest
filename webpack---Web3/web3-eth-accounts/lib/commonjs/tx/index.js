"use strict";
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TransactionFactory = exports.Transaction = exports.AccessListEIP2930Transaction = exports.FeeMarketEIP1559Transaction = void 0;
// @ethereumjs/tx version 4.1.1
var eip1559Transaction_js_1 = require("./eip1559Transaction.js");
Object.defineProperty(exports, "FeeMarketEIP1559Transaction", {
    enumerable: true,
    get: function() {
        return eip1559Transaction_js_1.FeeMarketEIP1559Transaction;
    }
});
var eip2930Transaction_js_1 = require("./eip2930Transaction.js");
Object.defineProperty(exports, "AccessListEIP2930Transaction", {
    enumerable: true,
    get: function() {
        return eip2930Transaction_js_1.AccessListEIP2930Transaction;
    }
});
var legacyTransaction_js_1 = require("./legacyTransaction.js");
Object.defineProperty(exports, "Transaction", {
    enumerable: true,
    get: function() {
        return legacyTransaction_js_1.Transaction;
    }
});
var transactionFactory_js_1 = require("./transactionFactory.js");
Object.defineProperty(exports, "TransactionFactory", {
    enumerable: true,
    get: function() {
        return transactionFactory_js_1.TransactionFactory;
    }
});
__exportStar(require("./types.js"), exports);
//# sourceMappingURL=index.js.map