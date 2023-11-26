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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseTransaction = void 0;
const web3_utils_1 = require("web3-utils");
const constants_js_1 = require("./constants.js");
const index_js_1 = require("../common/index.js");
const types_js_1 = require("./types.js");
const address_js_1 = require("./address.js");
const utils_js_1 = require("./utils.js");
/**
 * This base class will likely be subject to further
 * refactoring along the introduction of additional tx types
 * on the Ethereum network.
 *
 * It is therefore not recommended to use directly.
 */
class BaseTransaction {
    constructor(txData, opts) {
        var _a, _b;
        this.cache = {
            hash: undefined,
            dataFee: undefined,
        };
        /**
         * List of tx type defining EIPs,
         * e.g. 1559 (fee market) and 2930 (access lists)
         * for FeeMarketEIP1559Transaction objects
         */
        this.activeCapabilities = [];
        /**
         * The default chain the tx falls back to if no Common
         * is provided and if the chain can't be derived from
         * a passed in chainId (only EIP-2718 typed txs) or
         * EIP-155 signature (legacy txs).
         *
         * @hidden
         */
        this.DEFAULT_CHAIN = index_js_1.Chain.Mainnet;
        /**
         * The default HF if the tx type is active on that HF
         * or the first greater HF where the tx is active.
         *
         * @hidden
         */
        this.DEFAULT_HARDFORK = index_js_1.Hardfork.Merge;
        const {
            nonce,
            gasLimit,
            to,
            value,
            data,
            v,
            r,
            s,
            type
        } = txData;
        this._type = Number((0, index_js_1.uint8ArrayToBigInt)((0, index_js_1.toUint8Array)(type)));
        this.txOptions = opts;
        const toB = (0, index_js_1.toUint8Array)(to === '' ? '0x' : to);
        const vB = (0, index_js_1.toUint8Array)(v === '' ? '0x' : v);
        const rB = (0, index_js_1.toUint8Array)(r === '' ? '0x' : r);
        const sB = (0, index_js_1.toUint8Array)(s === '' ? '0x' : s);
        this.nonce = (0, index_js_1.uint8ArrayToBigInt)((0, index_js_1.toUint8Array)(nonce === '' ? '0x' : nonce));
        this.gasLimit = (0, index_js_1.uint8ArrayToBigInt)((0, index_js_1.toUint8Array)(gasLimit === '' ? '0x' : gasLimit));
        this.to = toB.length > 0 ? new address_js_1.Address(toB) : undefined;
        this.value = (0, index_js_1.uint8ArrayToBigInt)((0, index_js_1.toUint8Array)(value === '' ? '0x' : value));
        this.data = (0, index_js_1.toUint8Array)(data === '' ? '0x' : data);
        this.v = vB.length > 0 ? (0, index_js_1.uint8ArrayToBigInt)(vB) : undefined;
        this.r = rB.length > 0 ? (0, index_js_1.uint8ArrayToBigInt)(rB) : undefined;
        this.s = sB.length > 0 ? (0, index_js_1.uint8ArrayToBigInt)(sB) : undefined;
        this._validateCannotExceedMaxInteger({
            value: this.value,
            r: this.r,
            s: this.s
        });
        // geth limits gasLimit to 2^64-1
        this._validateCannotExceedMaxInteger({
            gasLimit: this.gasLimit
        }, 64);
        // EIP-2681 limits nonce to 2^64-1 (cannot equal 2^64-1)
        this._validateCannotExceedMaxInteger({
            nonce: this.nonce
        }, 64, true);
        // eslint-disable-next-line no-null/no-null
        const createContract = this.to === undefined || this.to === null;
        const allowUnlimitedInitCodeSize = (_a = opts.allowUnlimitedInitCodeSize) !== null && _a !== void 0 ? _a : false;
        const common = (_b = opts.common) !== null && _b !== void 0 ? _b : this._getCommon();
        if (createContract && common.isActivatedEIP(3860) && !allowUnlimitedInitCodeSize) {
            (0, utils_js_1.checkMaxInitCodeSize)(common, this.data.length);
        }
    }
    /**
     * Returns the transaction type.
     *
     * Note: legacy txs will return tx type `0`.
     */
    get type() {
        return this._type;
    }
    /**
     * Checks if a tx type defining capability is active
     * on a tx, for example the EIP-1559 fee market mechanism
     * or the EIP-2930 access list feature.
     *
     * Note that this is different from the tx type itself,
     * so EIP-2930 access lists can very well be active
     * on an EIP-1559 tx for example.
     *
     * This method can be useful for feature checks if the
     * tx type is unknown (e.g. when instantiated with
     * the tx factory).
     *
     * See `Capabilites` in the `types` module for a reference
     * on all supported capabilities.
     */
    supports(capability) {
        return this.activeCapabilities.includes(capability);
    }
    validate(stringError = false) {
        const errors = [];
        if (this.getBaseFee() > this.gasLimit) {
            errors.push(`gasLimit is too low. given ${this.gasLimit}, need at least ${this.getBaseFee()}`);
        }
        if (this.isSigned() && !this.verifySignature()) {
            errors.push('Invalid Signature');
        }
        return stringError ? errors : errors.length === 0;
    }
    _validateYParity() {
        const {
            v
        } = this;
        if (v !== undefined && v !== BigInt(0) && v !== BigInt(1)) {
            const msg = this._errorMsg('The y-parity of the transaction should either be 0 or 1');
            throw new Error(msg);
        }
    }
    /**
     * EIP-2: All transaction signatures whose s-value is greater than secp256k1n/2are considered invalid.
     * Reasoning: https://ethereum.stackexchange.com/a/55728
     */
    _validateHighS() {
        const {
            s
        } = this;
        if (this.common.gteHardfork('homestead') && s !== undefined && s > constants_js_1.SECP256K1_ORDER_DIV_2) {
            const msg = this._errorMsg('Invalid Signature: s-values greater than secp256k1n/2 are considered invalid');
            throw new Error(msg);
        }
    }
    /**
     * The minimum amount of gas the tx must have (DataFee + TxFee + Creation Fee)
     */
    getBaseFee() {
        const txFee = this.common.param('gasPrices', 'tx');
        let fee = this.getDataFee();
        if (txFee)
            fee += txFee;
        if (this.common.gteHardfork('homestead') && this.toCreationAddress()) {
            const txCreationFee = this.common.param('gasPrices', 'txCreation');
            if (txCreationFee)
                fee += txCreationFee;
        }
        return fee;
    }
    /**
     * The amount of gas paid for the data in this tx
     */
    getDataFee() {
        const txDataZero = this.common.param('gasPrices', 'txDataZero');
        const txDataNonZero = this.common.param('gasPrices', 'txDataNonZero');
        let cost = BigInt(0);
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < this.data.length; i += 1) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-unused-expressions
            this.data[i] === 0 ? (cost += txDataZero) : (cost += txDataNonZero);
        }
        // eslint-disable-next-line no-null/no-null
        if ((this.to === undefined || this.to === null) && this.common.isActivatedEIP(3860)) {
            const dataLength = BigInt(Math.ceil(this.data.length / 32));
            const initCodeCost = this.common.param('gasPrices', 'initCodeWordCost') * dataLength;
            cost += initCodeCost;
        }
        return cost;
    }
    /**
     * If the tx's `to` is to the creation address
     */
    toCreationAddress() {
        return this.to === undefined || this.to.buf.length === 0;
    }
    isSigned() {
        const {
            v,
            r,
            s
        } = this;
        if (v === undefined || r === undefined || s === undefined) {
            return false;
        }
        return true;
    }
    /**
     * Determines if the signature is valid
     */
    verifySignature() {
        try {
            // Main signature verification is done in `getSenderPublicKey()`
            const publicKey = this.getSenderPublicKey();
            return (0, index_js_1.unpadUint8Array)(publicKey).length !== 0;
        } catch (e) {
            return false;
        }
    }
    /**
     * Returns the sender's address
     */
    getSenderAddress() {
        return new address_js_1.Address(address_js_1.Address.publicToAddress(this.getSenderPublicKey()));
    }
    /**
     * Signs a transaction.
     *
     * Note that the signed tx is returned as a new object,
     * use as follows:
     * ```javascript
     * const signedTx = tx.sign(privateKey)
     * ```
     */
    sign(privateKey) {
        if (privateKey.length !== 32) {
            const msg = this._errorMsg('Private key must be 32 bytes in length.');
            throw new Error(msg);
        }
        // Hack for the constellation that we have got a legacy tx after spuriousDragon with a non-EIP155 conforming signature
        // and want to recreate a signature (where EIP155 should be applied)
        // Leaving this hack lets the legacy.spec.ts -> sign(), verifySignature() test fail
        // 2021-06-23
        let hackApplied = false;
        if (this.type === 0 &&
            this.common.gteHardfork('spuriousDragon') &&
            !this.supports(types_js_1.Capability.EIP155ReplayProtection)) {
            this.activeCapabilities.push(types_js_1.Capability.EIP155ReplayProtection);
            hackApplied = true;
        }
        const msgHash = this.getMessageToSign(true);
        const {
            v,
            r,
            s
        } = this._ecsign(msgHash, privateKey);
        const tx = this._processSignature(v, r, s);
        // Hack part 2
        if (hackApplied) {
            const index = this.activeCapabilities.indexOf(types_js_1.Capability.EIP155ReplayProtection);
            if (index > -1) {
                this.activeCapabilities.splice(index, 1);
            }
        }
        return tx;
    }
    /**
     * Does chain ID checks on common and returns a common
     * to be used on instantiation
     * @hidden
     *
     * @param common - {@link Common} instance from tx options
     * @param chainId - Chain ID from tx options (typed txs) or signature (legacy tx)
     */
    _getCommon(common, chainId) {
        var _a;
        // Chain ID provided
        if (chainId !== undefined) {
            const chainIdBigInt = (0, index_js_1.uint8ArrayToBigInt)((0, index_js_1.toUint8Array)(chainId));
            if (common) {
                if (common.chainId() !== chainIdBigInt) {
                    const msg = this._errorMsg('The chain ID does not match the chain ID of Common');
                    throw new Error(msg);
                }
                // Common provided, chain ID does match
                // -> Return provided Common
                return common.copy();
            }
            if (index_js_1.Common.isSupportedChainId(chainIdBigInt)) {
                // No Common, chain ID supported by Common
                // -> Instantiate Common with chain ID
                return new index_js_1.Common({
                    chain: chainIdBigInt,
                    hardfork: this.DEFAULT_HARDFORK
                });
            }
            // No Common, chain ID not supported by Common
            // -> Instantiate custom Common derived from DEFAULT_CHAIN
            return index_js_1.Common.custom({
                name: 'custom-chain',
                networkId: chainIdBigInt,
                chainId: chainIdBigInt,
            }, {
                baseChain: this.DEFAULT_CHAIN,
                hardfork: this.DEFAULT_HARDFORK
            });
        }
        // No chain ID provided
        // -> return Common provided or create new default Common
        return ((_a = common === null || common === void 0 ? void 0 : common.copy()) !== null && _a !== void 0 ? _a : new index_js_1.Common({
            chain: this.DEFAULT_CHAIN,
            hardfork: this.DEFAULT_HARDFORK
        }));
    }
    /**
     * Validates that an object with BigInt values cannot exceed the specified bit limit.
     * @param values Object containing string keys and BigInt values
     * @param bits Number of bits to check (64 or 256)
     * @param cannotEqual Pass true if the number also cannot equal one less the maximum value
     */
    _validateCannotExceedMaxInteger(values, bits = 256, cannotEqual = false) {
        for (const [key, value] of Object.entries(values)) {
            switch (bits) {
                case 64:
                    if (cannotEqual) {
                        if (value !== undefined && value >= constants_js_1.MAX_UINT64) {
                            const msg = this._errorMsg(`${key} cannot equal or exceed MAX_UINT64 (2^64-1), given ${value}`);
                            throw new Error(msg);
                        }
                    } else if (value !== undefined && value > constants_js_1.MAX_UINT64) {
                        const msg = this._errorMsg(`${key} cannot exceed MAX_UINT64 (2^64-1), given ${value}`);
                        throw new Error(msg);
                    }
                    break;
                case 256:
                    if (cannotEqual) {
                        if (value !== undefined && value >= constants_js_1.MAX_INTEGER) {
                            const msg = this._errorMsg(`${key} cannot equal or exceed MAX_INTEGER (2^256-1), given ${value}`);
                            throw new Error(msg);
                        }
                    } else if (value !== undefined && value > constants_js_1.MAX_INTEGER) {
                        const msg = this._errorMsg(`${key} cannot exceed MAX_INTEGER (2^256-1), given ${value}`);
                        throw new Error(msg);
                    }
                    break;
                default:
                    {
                        const msg = this._errorMsg('unimplemented bits value');
                        throw new Error(msg);
                    }
            }
        }
    }
    static _validateNotArray(values) {
        const txDataKeys = [
            'nonce',
            'gasPrice',
            'gasLimit',
            'to',
            'value',
            'data',
            'v',
            'r',
            's',
            'type',
            'baseFee',
            'maxFeePerGas',
            'chainId',
        ];
        for (const [key, value] of Object.entries(values)) {
            if (txDataKeys.includes(key)) {
                if (Array.isArray(value)) {
                    throw new Error(`${key} cannot be an array`);
                }
            }
        }
    }
    /**
     * Returns the shared error postfix part for _error() method
     * tx type implementations.
     */
    _getSharedErrorPostfix() {
        let hash = '';
        try {
            hash = this.isSigned() ? (0, web3_utils_1.bytesToHex)(this.hash()) : 'not available (unsigned)';
        } catch (e) {
            hash = 'error';
        }
        let isSigned = '';
        try {
            isSigned = this.isSigned().toString();
        } catch (e) {
            hash = 'error';
        }
        let hf = '';
        try {
            hf = this.common.hardfork();
        } catch (e) {
            hf = 'error';
        }
        let postfix = `tx type=${this.type} hash=${hash} nonce=${this.nonce} value=${this.value} `;
        postfix += `signed=${isSigned} hf=${hf}`;
        return postfix;
    }
    // eslint-disable-next-line class-methods-use-this
    _ecsign(msgHash, privateKey, chainId) {
        const signature = constants_js_1.secp256k1.sign(msgHash, privateKey);
        const signatureBytes = signature.toCompactRawBytes();
        const r = signatureBytes.subarray(0, 32);
        const s = signatureBytes.subarray(32, 64);
        const v = chainId === undefined ?
            BigInt(signature.recovery + 27) :
            BigInt(signature.recovery + 35) + BigInt(chainId) * BigInt(2);
        return {
            r,
            s,
            v
        };
    }
}
exports.BaseTransaction = BaseTransaction;
//# sourceMappingURL=baseTransaction.js.map