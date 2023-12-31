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
exports.getCreateAccessListParams = exports.isWeb3ContractContext = exports.isContractInitOptions = exports.getEstimateGasParams = exports.getEthTxCallParams = exports.getSendTxParams = void 0;
const web3_errors_1 = require("web3-errors");
const web3_utils_1 = require("web3-utils");
const encoding_js_1 = require("./encoding.js");
const getSendTxParams = ({
    abi,
    params,
    options,
    contractOptions,
}) => {
    var _a, _b;
    const deploymentCall = (_b = (_a = options === null || options === void 0 ? void 0 : options.input) !== null && _a !== void 0 ? _a : options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : contractOptions.input;
    if (!deploymentCall && !(options === null || options === void 0 ? void 0 : options.to) && !contractOptions.address) {
        throw new web3_errors_1.Web3ContractError('Contract address not specified');
    }
    if (!(options === null || options === void 0 ? void 0 : options.from) && !contractOptions.from) {
        throw new web3_errors_1.Web3ContractError('Contract "from" address not specified');
    }
    let txParams = (0, web3_utils_1.mergeDeep)({
        to: contractOptions.address,
        gas: contractOptions.gas,
        gasPrice: contractOptions.gasPrice,
        from: contractOptions.from,
        input: contractOptions.input,
        maxPriorityFeePerGas: contractOptions.maxPriorityFeePerGas,
        maxFeePerGas: contractOptions.maxFeePerGas,
    }, options);
    if (!txParams.input || abi.type === 'constructor') {
        txParams = Object.assign(Object.assign({}, txParams), {
            input: (0, encoding_js_1.encodeMethodABI)(abi, params, txParams.input)
        });
    }
    return txParams;
};
exports.getSendTxParams = getSendTxParams;
const getEthTxCallParams = ({
    abi,
    params,
    options,
    contractOptions,
}) => {
    if (!(options === null || options === void 0 ? void 0 : options.to) && !contractOptions.address) {
        throw new web3_errors_1.Web3ContractError('Contract address not specified');
    }
    let txParams = (0, web3_utils_1.mergeDeep)({
        to: contractOptions.address,
        gas: contractOptions.gas,
        gasPrice: contractOptions.gasPrice,
        from: contractOptions.from,
        input: contractOptions.input,
        maxPriorityFeePerGas: contractOptions.maxPriorityFeePerGas,
        maxFeePerGas: contractOptions.maxFeePerGas,
    }, options);
    txParams = Object.assign(Object.assign({}, txParams), {
        input: (0, encoding_js_1.encodeMethodABI)(abi, params, txParams.input ? (0, web3_utils_1.toHex)(txParams.input) : undefined)
    });
    return txParams;
};
exports.getEthTxCallParams = getEthTxCallParams;
const getEstimateGasParams = ({
    abi,
    params,
    options,
    contractOptions,
}) => {
    let txParams = (0, web3_utils_1.mergeDeep)({
        to: contractOptions.address,
        gas: contractOptions.gas,
        gasPrice: contractOptions.gasPrice,
        from: contractOptions.from,
        input: contractOptions.input,
    }, options);
    txParams = Object.assign(Object.assign({}, txParams), {
        input: (0, encoding_js_1.encodeMethodABI)(abi, params, txParams.input ? (0, web3_utils_1.toHex)(txParams.input) : undefined)
    });
    return txParams;
};
exports.getEstimateGasParams = getEstimateGasParams;
const isContractInitOptions = (options) => typeof options === 'object' &&
    !(0, web3_utils_1.isNullish)(options) && [
        'input',
        'data',
        'from',
        'gas',
        'gasPrice',
        'gasLimit',
        'address',
        'jsonInterface',
        'syncWithContext',
    ].some(key => key in options);
exports.isContractInitOptions = isContractInitOptions;
const isWeb3ContractContext = (options) => typeof options === 'object' && !(0, web3_utils_1.isNullish)(options) && !(0, exports.isContractInitOptions)(options);
exports.isWeb3ContractContext = isWeb3ContractContext;
const getCreateAccessListParams = ({
    abi,
    params,
    options,
    contractOptions,
}) => {
    if (!(options === null || options === void 0 ? void 0 : options.to) && !contractOptions.address) {
        throw new web3_errors_1.Web3ContractError('Contract address not specified');
    }
    if (!(options === null || options === void 0 ? void 0 : options.from) && !contractOptions.from) {
        throw new web3_errors_1.Web3ContractError('Contract "from" address not specified');
    }
    let txParams = (0, web3_utils_1.mergeDeep)({
        to: contractOptions.address,
        gas: contractOptions.gas,
        gasPrice: contractOptions.gasPrice,
        from: contractOptions.from,
        input: contractOptions.input,
        maxPriorityFeePerGas: contractOptions.maxPriorityFeePerGas,
        maxFeePerGas: contractOptions.maxFeePerGas,
    }, options);
    if (!txParams.input || abi.type === 'constructor') {
        txParams = Object.assign(Object.assign({}, txParams), {
            input: (0, encoding_js_1.encodeMethodABI)(abi, params, txParams.input)
        });
    }
    return txParams;
};
exports.getCreateAccessListParams = getCreateAccessListParams;
//# sourceMappingURL=utils.js.map