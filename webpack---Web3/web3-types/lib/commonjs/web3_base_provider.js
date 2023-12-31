"use strict";
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Web3BaseProvider = void 0;
const symbol = Symbol.for('web3/base-provider');
// Provider interface compatible with EIP-1193
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md
class Web3BaseProvider {
    static isWeb3Provider(provider) {
        return (provider instanceof Web3BaseProvider ||
            Boolean(provider && provider[symbol]));
    }
    // To match an object "instanceof" does not work if
    // matcher class and object is using different package versions
    // to overcome this bottleneck used this approach.
    // The symbol value for one string will always remain same regardless of package versions
    // eslint-disable-next-line class-methods-use-this
    get[symbol]() {
        return true;
    }
    /**
     * @deprecated Please use `.request` instead.
     * @param payload - Request Payload
     * @param callback - Callback
     */
    send(payload,
        // eslint-disable-next-line @typescript-eslint/ban-types
        callback) {
        this.request(payload)
            .then(response => {
                // eslint-disable-next-line no-null/no-null
                callback(null, response);
            })
            .catch((err) => {
                callback(err);
            });
    }
    /**
     * @deprecated Please use `.request` instead.
     * @param payload - Request Payload
     */
    sendAsync(payload) {
        return __awaiter(this, void 0, void 0, function*() {
            return this.request(payload);
        });
    }
}
exports.Web3BaseProvider = Web3BaseProvider;
//# sourceMappingURL=web3_base_provider.js.map