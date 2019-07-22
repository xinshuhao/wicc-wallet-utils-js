'use strict'

// const express = require("express");
var bitcore = require('..');
var WriterHelper = require('../lib/util/writerhelper')
var privateKey = bitcore.PrivateKey.fromWIF('Y6J4aK6Wcs4A3Ex4HXdfjJ6ZsHpNZfjaS4B9w7xqEnmFEYMqQd13')

var arg = {network: 'testnet'}
var wiccApi = new bitcore.WiccApi(arg)

// 验证地址
var ret = wiccApi.validateAddress('wLKf2NqwtHk3BfzK5wMDfbKYN1SC3weyR4')
console.log(ret)

/*
Build a transaction for common transfer
note:
1, nValidHeight: the height of the block when creating the signature, and the height difference when submitting the broadcast transaction must be <=250
2, fees: handling fee when deploying a smart contract, >= 10000 sawi (0.0001 wicc)
3. The same transaction cannot be submitted repeatedly before it is confirmed(BPS=0.1). It is recommended to solve the problem of batch initiated transaction by adding random handling fee.
*/
/*
构建普通转账交易的交易单
注意：
1、nValidHeight:创建签名时的区块高度,与提交广播交易时的高度差必须 <=250
2、fees:发布合约时的手续费, >= 10000 sawi(0.0001 wicc)
3、相同的交易在未被确认前不能重复提交(BPS=0.1),建议采用添加随机手续费方式解决批量发起交易问题
*/
var dexSellLimitTxinfo = {
    nTxType: bitcore.WiccApi.DEX_SELL_LIMIT_ORDER_TX,
    nVersion: 1,
    nValidHeight: 602371,
    fees: 10000,
    srcRegId: '54528-1',
    coinType: WriterHelper.prototype.CoinType.WICC,
    assetType:WriterHelper.prototype.CoinType.WUSD,
    assetAmount:30000000000,
    askPrice:200000000,
    network: 'testnet'
  };

  var value = 10000000000
  var tmp = (value >>> 7)


  var dexSellLimitOrderTx = new bitcore.Transaction.DexSellLimitOrderTx(dexSellLimitTxinfo);
  console.log(dexSellLimitOrderTx.destAddr)

  var hex = dexSellLimitOrderTx.SerializeTx(privateKey)
  console.log(hex)
