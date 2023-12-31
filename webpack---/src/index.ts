"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var crc_32_1 = require("crc-32");
var ethereumjs_util_1 = require("ethereumjs-util");
var chains_1 = require("./chains");
var hardforks_1 = require("./hardforks");
var eips_1 = require("./eips");
/**
 * Common class to access chain and hardfork parameters
 */
var Common = /** @class */ (function (_super) {
    __extends(Common, _super);
    /**
     * @constructor
     */
    function Common(opts) {
        var _a, _b;
        var _this = _super.call(this) || this;
        _this._supportedHardforks = [];
        _this._eips = [];
        _this._customChains = (_a = opts.customChains) !== null && _a !== void 0 ? _a : [];
        _this._chainParams = _this.setChain(opts.chain);
        _this.DEFAULT_HARDFORK = (_b = _this._chainParams.defaultHardfork) !== null && _b !== void 0 ? _b : 'istanbul';
        _this._hardfork = _this.DEFAULT_HARDFORK;
        if (opts.supportedHardforks) {
            _this._supportedHardforks = opts.supportedHardforks;
        }
        if (opts.hardfork) {
            _this.setHardfork(opts.hardfork);
        }
        if (opts.eips) {
            _this.setEIPs(opts.eips);
        }
        return _this;
    }
    /**
     * Creates a Common object for a custom chain, based on a standard one. It uses all the [[Chain]]
     * params from [[baseChain]] except the ones overridden in [[customChainParams]].
     *
     * @param baseChain The name (`mainnet`) or id (`1`) of a standard chain used to base the custom
     * chain params on.
     * @param customChainParams The custom parameters of the chain.
     * @param hardfork String identifier ('byzantium') for hardfork (optional)
     * @param supportedHardforks Limit parameter returns to the given hardforks (optional)
     */
    Common.forCustomChain = function (baseChain, customChainParams, hardfork, supportedHardforks) {
        var standardChainParams = Common._getChainParams(baseChain);
        return new Common({
            chain: __assign(__assign({}, standardChainParams), customChainParams),
            hardfork: hardfork,
            supportedHardforks: supportedHardforks,
        });
    };
    /**
     * Static method to determine if a chainId is supported as a standard chain
     * @param chainId BN id (`1`) of a standard chain
     * @returns boolean
     */
    Common.isSupportedChainId = function (chainId) {
        var initializedChains = chains_1._getInitializedChains();
        return Boolean(initializedChains['names'][chainId.toString()]);
    };
    Common._getChainParams = function (chain, customChains) {
        var initializedChains = chains_1._getInitializedChains(customChains);
        if (typeof chain === 'number' || ethereumjs_util_1.BN.isBN(chain)) {
            chain = chain.toString();
            if (initializedChains['names'][chain]) {
                var name_1 = initializedChains['names'][chain];
                return initializedChains[name_1];
            }
            throw new Error("Chain with ID " + chain + " not supported");
        }
        if (initializedChains[chain]) {
            return initializedChains[chain];
        }
        throw new Error("Chain with name " + chain + " not supported");
    };
    /**
     * Sets the chain
     * @param chain String ('mainnet') or Number (1) chain
     *     representation. Or, a Dictionary of chain parameters for a private network.
     * @returns The dictionary with parameters set as chain
     */
    Common.prototype.setChain = function (chain) {
        var e_1, _a;
        if (typeof chain === 'number' || typeof chain === 'string' || ethereumjs_util_1.BN.isBN(chain)) {
            this._chainParams = Common._getChainParams(chain, this._customChains);
        }
        else if (typeof chain === 'object') {
            if (this._customChains.length > 0) {
                throw new Error('Chain must be a string, number, or BN when initialized with customChains passed in');
            }
            var required = ['networkId', 'genesis', 'hardforks', 'bootstrapNodes'];
            try {
                for (var required_1 = __values(required), required_1_1 = required_1.next(); !required_1_1.done; required_1_1 = required_1.next()) {
                    var param = required_1_1.value;
                    if (chain[param] === undefined) {
                        throw new Error("Missing required chain parameter: " + param);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (required_1_1 && !required_1_1.done && (_a = required_1.return)) _a.call(required_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this._chainParams = chain;
        }
        else {
            throw new Error('Wrong input format');
        }
        return this._chainParams;
    };
    /**
     * Sets the hardfork to get params for
     * @param hardfork String identifier (e.g. 'byzantium')
     */
    Common.prototype.setHardfork = function (hardfork) {
        var e_2, _a;
        if (!this._isSupportedHardfork(hardfork)) {
            throw new Error("Hardfork " + hardfork + " not set as supported in supportedHardforks");
        }
        var existing = false;
        try {
            for (var HARDFORK_CHANGES_1 = __values(hardforks_1.hardforks), HARDFORK_CHANGES_1_1 = HARDFORK_CHANGES_1.next(); !HARDFORK_CHANGES_1_1.done; HARDFORK_CHANGES_1_1 = HARDFORK_CHANGES_1.next()) {
                var hfChanges = HARDFORK_CHANGES_1_1.value;
                if (hfChanges[0] === hardfork) {
                    if (this._hardfork !== hardfork) {
                        this._hardfork = hardfork;
                        this.emit('hardforkChanged', hardfork);
                    }
                    existing = true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (HARDFORK_CHANGES_1_1 && !HARDFORK_CHANGES_1_1.done && (_a = HARDFORK_CHANGES_1.return)) _a.call(HARDFORK_CHANGES_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (!existing) {
            throw new Error("Hardfork with name " + hardfork + " not supported");
        }
    };
    /**
     * Returns the hardfork based on the block number provided
     * @param blockNumber
     * @returns The name of the HF
     */
    Common.prototype.getHardforkByBlockNumber = function (blockNumber) {
        var e_3, _a;
        blockNumber = ethereumjs_util_1.toType(blockNumber, ethereumjs_util_1.TypeOutput.BN);
        var hardfork = 'chainstart';
        try {
            for (var _b = __values(this.hardforks()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var hf = _c.value;
                // Skip comparison for not applied HFs
                if (hf.block === null) {
                    continue;
                }
                if (blockNumber.gte(new ethereumjs_util_1.BN(hf.block))) {
                    hardfork = hf.name;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return hardfork;
    };
    /**
     * Sets a new hardfork based on the block number provided
     * @param blockNumber
     * @returns The name of the HF set
     */
    Common.prototype.setHardforkByBlockNumber = function (blockNumber) {
        blockNumber = ethereumjs_util_1.toType(blockNumber, ethereumjs_util_1.TypeOutput.BN);
        var hardfork = this.getHardforkByBlockNumber(blockNumber);
        this.setHardfork(hardfork);
        return hardfork;
    };
    /**
     * Internal helper function to choose between hardfork set and hardfork provided as param
     * @param hardfork Hardfork given to function as a parameter
     * @returns Hardfork chosen to be used
     */
    Common.prototype._chooseHardfork = function (hardfork, onlySupported) {
        if (onlySupported === void 0) { onlySupported = true; }
        if (!hardfork) {
            hardfork = this._hardfork;
        }
        else if (onlySupported && !this._isSupportedHardfork(hardfork)) {
            throw new Error("Hardfork " + hardfork + " not set as supported in supportedHardforks");
        }
        return hardfork;
    };
    /**
     * Internal helper function, returns the params for the given hardfork for the chain set
     * @param hardfork Hardfork name
     * @returns Dictionary with hardfork params
     */
    Common.prototype._getHardfork = function (hardfork) {
        var e_4, _a;
        var hfs = this.hardforks();
        try {
            for (var hfs_1 = __values(hfs), hfs_1_1 = hfs_1.next(); !hfs_1_1.done; hfs_1_1 = hfs_1.next()) {
                var hf = hfs_1_1.value;
                if (hf['name'] === hardfork)
                    return hf;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (hfs_1_1 && !hfs_1_1.done && (_a = hfs_1.return)) _a.call(hfs_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        throw new Error("Hardfork " + hardfork + " not defined for chain " + this.chainName());
    };
    /**
     * Internal helper function to check if a hardfork is set to be supported by the library
     * @param hardfork Hardfork name
     * @returns True if hardfork is supported
     */
    Common.prototype._isSupportedHardfork = function (hardfork) {
        var e_5, _a;
        if (this._supportedHardforks.length > 0) {
            try {
                for (var _b = __values(this._supportedHardforks), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var supportedHf = _c.value;
                    if (hardfork === supportedHf)
                        return true;
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        else {
            return true;
        }
        return false;
    };
    /**
     * Sets the active EIPs
     * @param eips
     */
    Common.prototype.setEIPs = function (eips) {
        var e_6, _a;
        var _this = this;
        if (eips === void 0) { eips = []; }
        var _loop_1 = function (eip) {
            if (!(eip in eips_1.EIPs)) {
                throw new Error(eip + " not supported");
            }
            var minHF = this_1.gteHardfork(eips_1.EIPs[eip]['minimumHardfork']);
            if (!minHF) {
                throw new Error(eip + " cannot be activated on hardfork " + this_1.hardfork() + ", minimumHardfork: " + minHF);
            }
            if (eips_1.EIPs[eip].requiredEIPs) {
                // eslint-disable-next-line prettier/prettier
                eips_1.EIPs[eip].requiredEIPs.forEach(function (elem) {
                    if (!(eips.includes(elem) || _this.isActivatedEIP(elem))) {
                        throw new Error(eip + " requires EIP " + elem + ", but is not included in the EIP list");
                    }
                });
            }
        };
        var this_1 = this;
        try {
            for (var eips_2 = __values(eips), eips_2_1 = eips_2.next(); !eips_2_1.done; eips_2_1 = eips_2.next()) {
                var eip = eips_2_1.value;
                _loop_1(eip);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (eips_2_1 && !eips_2_1.done && (_a = eips_2.return)) _a.call(eips_2);
            }
            finally { if (e_6) throw e_6.error; }
        }
        this._eips = eips;
    };
    /**
     * Returns a parameter for the current chain setup
     *
     * If the parameter is present in an EIP, the EIP always takes precendence.
     * Otherwise the parameter if taken from the latest applied HF with
     * a change on the respective parameter.
     *
     * @param topic Parameter topic ('gasConfig', 'gasPrices', 'vm', 'pow')
     * @param name Parameter name (e.g. 'minGasLimit' for 'gasConfig' topic)
     * @returns The value requested or `null` if not found
     */
    Common.prototype.param = function (topic, name) {
        var e_7, _a;
        // TODO: consider the case that different active EIPs
        // can change the same parameter
        var value = null;
        try {
            for (var _b = __values(this._eips), _c = _b.next(); !_c.done; _c = _b.next()) {
                var eip = _c.value;
                value = this.paramByEIP(topic, name, eip);
                if (value !== null) {
                    return value;
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return this.paramByHardfork(topic, name, this._hardfork);
    };
    /**
     * Returns the parameter corresponding to a hardfork
     * @param topic Parameter topic ('gasConfig', 'gasPrices', 'vm', 'pow')
     * @param name Parameter name (e.g. 'minGasLimit' for 'gasConfig' topic)
     * @param hardfork Hardfork name
     * @returns The value requested or `null` if not found
     */
    Common.prototype.paramByHardfork = function (topic, name, hardfork) {
        var e_8, _a, e_9, _b;
        hardfork = this._chooseHardfork(hardfork);
        var value = null;
        try {
            for (var HARDFORK_CHANGES_2 = __values(hardforks_1.hardforks), HARDFORK_CHANGES_2_1 = HARDFORK_CHANGES_2.next(); !HARDFORK_CHANGES_2_1.done; HARDFORK_CHANGES_2_1 = HARDFORK_CHANGES_2.next()) {
                var hfChanges = HARDFORK_CHANGES_2_1.value;
                // EIP-referencing HF file (e.g. berlin.json)
                if (hfChanges[1].hasOwnProperty('eips')) { // eslint-disable-line
                    var hfEIPs = hfChanges[1]['eips'];
                    try {
                        for (var hfEIPs_1 = (e_9 = void 0, __values(hfEIPs)), hfEIPs_1_1 = hfEIPs_1.next(); !hfEIPs_1_1.done; hfEIPs_1_1 = hfEIPs_1.next()) {
                            var eip = hfEIPs_1_1.value;
                            var valueEIP = this.paramByEIP(topic, name, eip);
                            value = valueEIP !== null ? valueEIP : value;
                        }
                    }
                    catch (e_9_1) { e_9 = { error: e_9_1 }; }
                    finally {
                        try {
                            if (hfEIPs_1_1 && !hfEIPs_1_1.done && (_b = hfEIPs_1.return)) _b.call(hfEIPs_1);
                        }
                        finally { if (e_9) throw e_9.error; }
                    }
                    // Paramater-inlining HF file (e.g. istanbul.json)
                }
                else {
                    if (!hfChanges[1][topic]) {
                        throw new Error("Topic " + topic + " not defined");
                    }
                    if (hfChanges[1][topic][name] !== undefined) {
                        value = hfChanges[1][topic][name].v;
                    }
                }
                if (hfChanges[0] === hardfork)
                    break;
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (HARDFORK_CHANGES_2_1 && !HARDFORK_CHANGES_2_1.done && (_a = HARDFORK_CHANGES_2.return)) _a.call(HARDFORK_CHANGES_2);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return value;
    };
    /**
     * Returns a parameter corresponding to an EIP
     * @param topic Parameter topic ('gasConfig', 'gasPrices', 'vm', 'pow')
     * @param name Parameter name (e.g. 'minGasLimit' for 'gasConfig' topic)
     * @param eip Number of the EIP
     * @returns The value requested or `null` if not found
     */
    Common.prototype.paramByEIP = function (topic, name, eip) {
        if (!(eip in eips_1.EIPs)) {
            throw new Error(eip + " not supported");
        }
        var eipParams = eips_1.EIPs[eip];
        if (!(topic in eipParams)) {
            throw new Error("Topic " + topic + " not defined");
        }
        if (eipParams[topic][name] === undefined) {
            return null;
        }
        var value = eipParams[topic][name].v;
        return value;
    };
    /**
     * Returns a parameter for the hardfork active on block number
     * @param topic Parameter topic
     * @param name Parameter name
     * @param blockNumber Block number
     */
    Common.prototype.paramByBlock = function (topic, name, blockNumber) {
        var activeHfs = this.activeHardforks(blockNumber);
        var hardfork = activeHfs[activeHfs.length - 1]['name'];
        return this.paramByHardfork(topic, name, hardfork);
    };
    /**
     * Checks if an EIP is activated by either being included in the EIPs
     * manually passed in with the `eips` constructor option or in a
     * hardfork currently being active
     *
     * Note: this method only works for EIPs being supported
     * by the `eips` constructor option
     * @param eip
     */
    Common.prototype.isActivatedEIP = function (eip) {
        var e_10, _a;
        if (this.eips().includes(eip)) {
            return true;
        }
        try {
            for (var HARDFORK_CHANGES_3 = __values(hardforks_1.hardforks), HARDFORK_CHANGES_3_1 = HARDFORK_CHANGES_3.next(); !HARDFORK_CHANGES_3_1.done; HARDFORK_CHANGES_3_1 = HARDFORK_CHANGES_3.next()) {
                var hfChanges = HARDFORK_CHANGES_3_1.value;
                var hf = hfChanges[1];
                if (this.gteHardfork(hf['name']) && 'eips' in hf) {
                    if (hf['eips'].includes(eip)) {
                        return true;
                    }
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (HARDFORK_CHANGES_3_1 && !HARDFORK_CHANGES_3_1.done && (_a = HARDFORK_CHANGES_3.return)) _a.call(HARDFORK_CHANGES_3);
            }
            finally { if (e_10) throw e_10.error; }
        }
        return false;
    };
    /**
     * Checks if set or provided hardfork is active on block number
     * @param hardfork Hardfork name or null (for HF set)
     * @param blockNumber
     * @param opts Hardfork options (onlyActive unused)
     * @returns True if HF is active on block number
     */
    Common.prototype.hardforkIsActiveOnBlock = function (hardfork, blockNumber, opts) {
        var _a;
        if (opts === void 0) { opts = {}; }
        blockNumber = ethereumjs_util_1.toType(blockNumber, ethereumjs_util_1.TypeOutput.BN);
        var onlySupported = (_a = opts.onlySupported) !== null && _a !== void 0 ? _a : false;
        hardfork = this._chooseHardfork(hardfork, onlySupported);
        var hfBlock = this.hardforkBlockBN(hardfork);
        if (hfBlock && blockNumber.gte(hfBlock)) {
            return true;
        }
        return false;
    };
    /**
     * Alias to hardforkIsActiveOnBlock when hardfork is set
     * @param blockNumber
     * @param opts Hardfork options (onlyActive unused)
     * @returns True if HF is active on block number
     */
    Common.prototype.activeOnBlock = function (blockNumber, opts) {
        return this.hardforkIsActiveOnBlock(null, blockNumber, opts);
    };
    /**
     * Sequence based check if given or set HF1 is greater than or equal HF2
     * @param hardfork1 Hardfork name or null (if set)
     * @param hardfork2 Hardfork name
     * @param opts Hardfork options
     * @returns True if HF1 gte HF2
     */
    Common.prototype.hardforkGteHardfork = function (hardfork1, hardfork2, opts) {
        var e_11, _a;
        if (opts === void 0) { opts = {}; }
        var onlyActive = opts.onlyActive === undefined ? false : opts.onlyActive;
        hardfork1 = this._chooseHardfork(hardfork1, opts.onlySupported);
        var hardforks;
        if (onlyActive) {
            hardforks = this.activeHardforks(null, opts);
        }
        else {
            hardforks = this.hardforks();
        }
        var posHf1 = -1, posHf2 = -1;
        var index = 0;
        try {
            for (var hardforks_2 = __values(hardforks), hardforks_2_1 = hardforks_2.next(); !hardforks_2_1.done; hardforks_2_1 = hardforks_2.next()) {
                var hf = hardforks_2_1.value;
                if (hf['name'] === hardfork1)
                    posHf1 = index;
                if (hf['name'] === hardfork2)
                    posHf2 = index;
                index += 1;
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (hardforks_2_1 && !hardforks_2_1.done && (_a = hardforks_2.return)) _a.call(hardforks_2);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return posHf1 >= posHf2 && posHf2 !== -1;
    };
    /**
     * Alias to hardforkGteHardfork when hardfork is set
     * @param hardfork Hardfork name
     * @param opts Hardfork options
     * @returns True if hardfork set is greater than hardfork provided
     */
    Common.prototype.gteHardfork = function (hardfork, opts) {
        return this.hardforkGteHardfork(null, hardfork, opts);
    };
    /**
     * Checks if given or set hardfork is active on the chain
     * @param hardfork Hardfork name, optional if HF set
     * @param opts Hardfork options (onlyActive unused)
     * @returns True if hardfork is active on the chain
     */
    Common.prototype.hardforkIsActiveOnChain = function (hardfork, opts) {
        var e_12, _a;
        var _b;
        if (opts === void 0) { opts = {}; }
        var onlySupported = (_b = opts.onlySupported) !== null && _b !== void 0 ? _b : false;
        hardfork = this._chooseHardfork(hardfork, onlySupported);
        try {
            for (var _c = __values(this.hardforks()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var hf = _d.value;
                if (hf['name'] === hardfork && hf['block'] !== null)
                    return true;
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return false;
    };
    /**
     * Returns the active hardfork switches for the current chain
     * @param blockNumber up to block if provided, otherwise for the whole chain
     * @param opts Hardfork options (onlyActive unused)
     * @return Array with hardfork arrays
     */
    Common.prototype.activeHardforks = function (blockNumber, opts) {
        var e_13, _a;
        if (opts === void 0) { opts = {}; }
        var activeHardforks = [];
        var hfs = this.hardforks();
        try {
            for (var hfs_2 = __values(hfs), hfs_2_1 = hfs_2.next(); !hfs_2_1.done; hfs_2_1 = hfs_2.next()) {
                var hf = hfs_2_1.value;
                if (hf['block'] === null)
                    continue;
                if (blockNumber !== undefined && blockNumber !== null && blockNumber < hf['block'])
                    break;
                if (opts.onlySupported && !this._isSupportedHardfork(hf['name']))
                    continue;
                activeHardforks.push(hf);
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (hfs_2_1 && !hfs_2_1.done && (_a = hfs_2.return)) _a.call(hfs_2);
            }
            finally { if (e_13) throw e_13.error; }
        }
        return activeHardforks;
    };
    /**
     * Returns the latest active hardfork name for chain or block or throws if unavailable
     * @param blockNumber up to block if provided, otherwise for the whole chain
     * @param opts Hardfork options (onlyActive unused)
     * @return Hardfork name
     */
    Common.prototype.activeHardfork = function (blockNumber, opts) {
        if (opts === void 0) { opts = {}; }
        var activeHardforks = this.activeHardforks(blockNumber, opts);
        if (activeHardforks.length > 0) {
            return activeHardforks[activeHardforks.length - 1]['name'];
        }
        else {
            throw new Error("No (supported) active hardfork found");
        }
    };
    /**
     * Returns the hardfork change block for hardfork provided or set
     * @param hardfork Hardfork name, optional if HF set
     * @returns Block number
     * @deprecated Please use hardforkBlockBN() for large number support
     */
    Common.prototype.hardforkBlock = function (hardfork) {
        return ethereumjs_util_1.toType(this.hardforkBlockBN(hardfork), ethereumjs_util_1.TypeOutput.Number);
    };
    /**
     * Returns the hardfork change block for hardfork provided or set
     * @param hardfork Hardfork name, optional if HF set
     * @returns Block number
     */
    Common.prototype.hardforkBlockBN = function (hardfork) {
        hardfork = this._chooseHardfork(hardfork, false);
        return new ethereumjs_util_1.BN(this._getHardfork(hardfork)['block']);
    };
    /**
     * True if block number provided is the hardfork (given or set) change block
     * @param blockNumber Number of the block to check
     * @param hardfork Hardfork name, optional if HF set
     * @returns True if blockNumber is HF block
     */
    Common.prototype.isHardforkBlock = function (blockNumber, hardfork) {
        blockNumber = ethereumjs_util_1.toType(blockNumber, ethereumjs_util_1.TypeOutput.BN);
        hardfork = this._chooseHardfork(hardfork, false);
        return this.hardforkBlockBN(hardfork).eq(blockNumber);
    };
    /**
     * Returns the change block for the next hardfork after the hardfork provided or set
     * @param hardfork Hardfork name, optional if HF set
     * @returns Block number or null if not available
     * @deprecated Please use nextHardforkBlockBN() for large number support
     */
    Common.prototype.nextHardforkBlock = function (hardfork) {
        var block = this.nextHardforkBlockBN(hardfork);
        return block === null ? null : ethereumjs_util_1.toType(block, ethereumjs_util_1.TypeOutput.Number);
    };
    /**
     * Returns the change block for the next hardfork after the hardfork provided or set
     * @param hardfork Hardfork name, optional if HF set
     * @returns Block number or null if not available
     */
    Common.prototype.nextHardforkBlockBN = function (hardfork) {
        hardfork = this._chooseHardfork(hardfork, false);
        var hfBlock = this.hardforkBlockBN(hardfork);
        // Next fork block number or null if none available
        // Logic: if accumulator is still null and on the first occurence of
        // a block greater than the current hfBlock set the accumulator,
        // pass on the accumulator as the final result from this time on
        var nextHfBlock = this.hardforks().reduce(function (acc, hf) {
            var block = new ethereumjs_util_1.BN(hf.block);
            return block.gt(hfBlock) && acc === null ? block : acc;
        }, null);
        return nextHfBlock;
    };
    /**
     * True if block number provided is the hardfork change block following the hardfork given or set
     * @param blockNumber Number of the block to check
     * @param hardfork Hardfork name, optional if HF set
     * @returns True if blockNumber is HF block
     */
    Common.prototype.isNextHardforkBlock = function (blockNumber, hardfork) {
        blockNumber = ethereumjs_util_1.toType(blockNumber, ethereumjs_util_1.TypeOutput.BN);
        hardfork = this._chooseHardfork(hardfork, false);
        var nextHardforkBlock = this.nextHardforkBlockBN(hardfork);
        return nextHardforkBlock === null ? false : nextHardforkBlock.eq(blockNumber);
    };
    /**
     * Internal helper function to calculate a fork hash
     * @param hardfork Hardfork name
     * @returns Fork hash as hex string
     */
    Common.prototype._calcForkHash = function (hardfork) {
        var e_14, _a;
        var genesis = Buffer.from(this.genesis().hash.substr(2), 'hex');
        var hfBuffer = Buffer.alloc(0);
        var prevBlock = 0;
        try {
            for (var _b = __values(this.hardforks()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var hf = _c.value;
                var block = hf.block;
                // Skip for chainstart (0), not applied HFs (null) and
                // when already applied on same block number HFs
                if (block !== 0 && block !== null && block !== prevBlock) {
                    var hfBlockBuffer = Buffer.from(block.toString(16).padStart(16, '0'), 'hex');
                    hfBuffer = Buffer.concat([hfBuffer, hfBlockBuffer]);
                }
                if (hf.name === hardfork)
                    break;
                prevBlock = block;
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_14) throw e_14.error; }
        }
        var inputBuffer = Buffer.concat([genesis, hfBuffer]);
        // CRC32 delivers result as signed (negative) 32-bit integer,
        // convert to hex string
        var forkhash = ethereumjs_util_1.intToBuffer(crc_32_1.buf(inputBuffer) >>> 0).toString('hex');
        return "0x" + forkhash;
    };
    /**
     * Returns an eth/64 compliant fork hash (EIP-2124)
     * @param hardfork Hardfork name, optional if HF set
     */
    Common.prototype.forkHash = function (hardfork) {
        hardfork = this._chooseHardfork(hardfork, false);
        var data = this._getHardfork(hardfork);
        if (data['block'] === null) {
            var msg = 'No fork hash calculation possible for non-applied or future hardfork';
            throw new Error(msg);
        }
        if (data['forkHash'] !== undefined) {
            return data['forkHash'];
        }
        return this._calcForkHash(hardfork);
    };
    /**
     *
     * @param forkHash Fork hash as a hex string
     * @returns Array with hardfork data (name, block, forkHash)
     */
    Common.prototype.hardforkForForkHash = function (forkHash) {
        var resArray = this.hardforks().filter(function (hf) {
            return hf.forkHash === forkHash;
        });
        return resArray.length >= 1 ? resArray[resArray.length - 1] : null;
    };
    /**
     * Returns the Genesis parameters of current chain
     * @returns Genesis dictionary
     */
    Common.prototype.genesis = function () {
        return this._chainParams['genesis'];
    };
    /**
     * Returns the hardforks for current chain
     * @returns {Array} Array with arrays of hardforks
     */
    Common.prototype.hardforks = function () {
        return this._chainParams['hardforks'];
    };
    /**
     * Returns bootstrap nodes for the current chain
     * @returns {Dictionary} Dict with bootstrap nodes
     */
    Common.prototype.bootstrapNodes = function () {
        return this._chainParams['bootstrapNodes'];
    };
    /**
     * Returns DNS networks for the current chain
     * @returns {String[]} Array of DNS ENR urls
     */
    Common.prototype.dnsNetworks = function () {
        return this._chainParams['dnsNetworks'];
    };
    /**
     * Returns the hardfork set
     * @returns Hardfork name
     */
    Common.prototype.hardfork = function () {
        return this._hardfork;
    };
    /**
     * Returns the Id of current chain
     * @returns chain Id
     * @deprecated Please use chainIdBN() for large number support
     */
    Common.prototype.chainId = function () {
        return ethereumjs_util_1.toType(this.chainIdBN(), ethereumjs_util_1.TypeOutput.Number);
    };
    /**
     * Returns the Id of current chain
     * @returns chain Id
     */
    Common.prototype.chainIdBN = function () {
        return new ethereumjs_util_1.BN(this._chainParams['chainId']);
    };
    /**
     * Returns the name of current chain
     * @returns chain name (lower case)
     */
    Common.prototype.chainName = function () {
        return this._chainParams['name'];
    };
    /**
     * Returns the Id of current network
     * @returns network Id
     * @deprecated Please use networkIdBN() for large number support
     */
    Common.prototype.networkId = function () {
        return ethereumjs_util_1.toType(this.networkIdBN(), ethereumjs_util_1.TypeOutput.Number);
    };
    /**
     * Returns the Id of current network
     * @returns network Id
     */
    Common.prototype.networkIdBN = function () {
        return new ethereumjs_util_1.BN(this._chainParams['networkId']);
    };
    /**
     * Returns the active EIPs
     * @returns List of EIPs
     */
    Common.prototype.eips = function () {
        return this._eips;
    };
    /**
     * Returns the consensus type of the network
     * Possible values: "pow"|"poa"
     */
    Common.prototype.consensusType = function () {
        return this._chainParams['consensus']['type'];
    };
    /**
     * Returns the concrete consensus implementation
     * algorithm or protocol for the network
     * e.g. "ethash" for "pow" consensus type or
     * "clique" for "poa" consensus type
     */
    Common.prototype.consensusAlgorithm = function () {
        return this._chainParams['consensus']['algorithm'];
    };
    /**
     * Returns a dictionary with consensus configuration
     * parameters based on the consensus algorithm
     *
     * Expected returns (parameters must be present in
     * the respective chain json files):
     *
     * ethash: -
     * clique: period, epoch
     * aura: -
     */
    Common.prototype.consensusConfig = function () {
        return this._chainParams['consensus'][this.consensusAlgorithm()];
    };
    /**
     * Returns a deep copy of this common instance.
     */
    Common.prototype.copy = function () {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    };
    return Common;
}(events_1.EventEmitter));
exports.default = Common;
//# sourceMappingURL=index.js.map