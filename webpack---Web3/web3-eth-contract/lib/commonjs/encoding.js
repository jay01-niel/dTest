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
exports.decodeMethodReturn = exports.encodeMethodABI = exports.decodeEventABI = exports.encodeEventABI = void 0;
const web3_utils_1 = require("web3-utils");
const web3_types_1 = require("web3-types");
const web3_eth_abi_1 = require("web3-eth-abi");
const web3_eth_1 = require("web3-eth");
const web3_errors_1 = require("web3-errors");
const encodeEventABI = ({
    address
}, event, options) => {
    var _a, _b;
    const topics = options === null || options === void 0 ? void 0 : options.topics;
    const filter = (_a = options === null || options === void 0 ? void 0 : options.filter) !== null && _a !== void 0 ? _a : {};
    const opts = {};
    if (!(0, web3_utils_1.isNullish)(options === null || options === void 0 ? void 0 : options.fromBlock)) {
        opts.fromBlock = (0, web3_utils_1.format)(web3_eth_1.blockSchema.properties.number, options === null || options === void 0 ? void 0 : options.fromBlock, {
            number: web3_types_1.FMT_NUMBER.HEX,
            bytes: web3_types_1.FMT_BYTES.HEX,
        });
    }
    if (!(0, web3_utils_1.isNullish)(options === null || options === void 0 ? void 0 : options.toBlock)) {
        opts.toBlock = (0, web3_utils_1.format)(web3_eth_1.blockSchema.properties.number, options === null || options === void 0 ? void 0 : options.toBlock, {
            number: web3_types_1.FMT_NUMBER.HEX,
            bytes: web3_types_1.FMT_BYTES.HEX,
        });
    }
    if (topics && Array.isArray(topics)) {
        opts.topics = [...topics];
    } else {
        opts.topics = [];
        // add event signature
        if (event && !event.anonymous && event.name !== 'ALLEVENTS') {
            opts.topics.push((_b = event.signature) !== null && _b !== void 0 ? _b : (0, web3_eth_abi_1.encodeEventSignature)((0, web3_eth_abi_1.jsonInterfaceMethodToString)(event)));
        }
        // add event topics (indexed arguments)
        if (event.name !== 'ALLEVENTS' && event.inputs) {
            for (const input of event.inputs) {
                if (!input.indexed) {
                    continue;
                }
                const value = filter[input.name];
                if (!value) {
                    // eslint-disable-next-line no-null/no-null
                    opts.topics.push(null);
                    continue;
                }
                // TODO: https://github.com/ethereum/web3.js/issues/344
                // TODO: deal properly with components
                if (Array.isArray(value)) {
                    opts.topics.push(value.map(v => (0, web3_eth_abi_1.encodeParameter)(input.type, v)));
                } else if (input.type === 'string') {
                    opts.topics.push((0, web3_utils_1.keccak256)(value));
                } else {
                    opts.topics.push((0, web3_eth_abi_1.encodeParameter)(input.type, value));
                }
            }
        }
    }
    if (!opts.topics.length)
        delete opts.topics;
    if (address) {
        opts.address = address.toLowerCase();
    }
    return opts;
};
exports.encodeEventABI = encodeEventABI;
const decodeEventABI = (event, data, jsonInterface, returnFormat = web3_types_1.DEFAULT_RETURN_FORMAT) => {
    var _a, _b, _c, _d, _e;
    let modifiedEvent = Object.assign({}, event);
    const result = (0, web3_utils_1.format)(web3_eth_1.logSchema, data, returnFormat);
    // if allEvents get the right event
    if (modifiedEvent.name === 'ALLEVENTS') {
        const matchedEvent = jsonInterface.find(j => j.signature === data.topics[0]);
        if (matchedEvent) {
            modifiedEvent = matchedEvent;
        } else {
            modifiedEvent = {
                anonymous: true
            };
        }
    }
    // create empty inputs if none are present (e.g. anonymous events on allEvents)
    modifiedEvent.inputs = (_b = (_a = modifiedEvent.inputs) !== null && _a !== void 0 ? _a : event.inputs) !== null && _b !== void 0 ? _b : [];
    // Handle case where an event signature shadows the current ABI with non-identical
    // arg indexing. If # of topics doesn't match, event is anon.
    if (!modifiedEvent.anonymous) {
        let indexedInputs = 0;
        ((_c = modifiedEvent.inputs) !== null && _c !== void 0 ? _c : []).forEach(input => {
            if (input.indexed) {
                indexedInputs += 1;
            }
        });
        if (indexedInputs > 0 && (data === null || data === void 0 ? void 0 : data.topics) && (data === null || data === void 0 ? void 0 : data.topics.length) !== indexedInputs + 1) {
            // checks if event is anonymous
            modifiedEvent = Object.assign(Object.assign({}, modifiedEvent), {
                anonymous: true,
                inputs: []
            });
        }
    }
    const argTopics = modifiedEvent.anonymous ? data.topics : ((_d = data.topics) !== null && _d !== void 0 ? _d : []).slice(1);
    return Object.assign(Object.assign({}, result), {
        returnValues: (0, web3_eth_abi_1.decodeLog)([...((_e = modifiedEvent.inputs) !== null && _e !== void 0 ? _e : [])], data.data, argTopics),
        event: modifiedEvent.name,
        signature: modifiedEvent.anonymous || !data.topics || data.topics.length === 0 || !data.topics[0] ?
            undefined :
            data.topics[0],
        raw: {
            data: data.data,
            topics: data.topics,
        }
    });
};
exports.decodeEventABI = decodeEventABI;
const encodeMethodABI = (abi, args, deployData) => {
    const inputLength = Array.isArray(abi.inputs) ? abi.inputs.length : 0;
    if (inputLength !== args.length) {
        throw new web3_errors_1.Web3ContractError(`The number of arguments is not matching the methods required number. You need to pass ${inputLength} arguments.`);
    }
    const params = (0, web3_eth_abi_1.encodeParameters)(Array.isArray(abi.inputs) ? abi.inputs : [], args).replace('0x', '');
    if ((0, web3_eth_abi_1.isAbiConstructorFragment)(abi)) {
        if (!deployData)
            throw new web3_errors_1.Web3ContractError('The contract has no contract data option set. This is necessary to append the constructor parameters.');
        if (!deployData.startsWith('0x')) {
            return `0x${deployData}${params}`;
        }
        return `${deployData}${params}`;
    }
    return `${(0, web3_eth_abi_1.encodeFunctionSignature)(abi)}${params}`;
};
exports.encodeMethodABI = encodeMethodABI;
const decodeMethodReturn = (abi, returnValues) => {
    // If it was constructor then we need to return contract address
    if (abi.type === 'constructor') {
        return returnValues;
    }
    if (!returnValues) {
        // Using "null" value intentionally to match legacy behavior
        // eslint-disable-next-line no-null/no-null
        return null;
    }
    const value = returnValues.length >= 2 ? returnValues.slice(2) : returnValues;
    if (!abi.outputs) {
        // eslint-disable-next-line no-null/no-null
        return null;
    }
    const result = (0, web3_eth_abi_1.decodeParameters)([...abi.outputs], value);
    if (result.__length__ === 1) {
        return result[0];
    }
    return result;
};
exports.decodeMethodReturn = decodeMethodReturn;
//# sourceMappingURL=encoding.js.map