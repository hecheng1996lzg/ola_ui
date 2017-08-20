/**
 * Created by HeCheng on 2017/7/27.
 */
var _temp = [
    {content:"Transaction success",state:9,time:'2017-01-02 03:21:11'},
    {content:"vp3 transaction accomplish and is written into the ledger",state:0,time:'2017-01-02 03:21:11'},
    {content:"vp1 transaction accomplish and is written into the ledger",state:0,time:'2017-01-02 03:21:11'},
    {content:"vp2 transaction accomplish and is written into the ledger",state:0,time:'2017-01-02 03:21:11'},
    {content:"vp0 transaction accomplish and is written into the ledger",state:0,time:'2017-01-02 03:21:11'},
    {content:"Consensus accomplish",state:0,time:'2017-01-02 03:21:11'},
    {content:"vp3 request received",state:0,time:'2017-01-02 03:21:11'},
    {content:"vp2 request received",state:0,time:'2017-01-02 03:21:11'},
    {content:"vp1 request received",state:0,time:'2017-01-02 03:21:11'},
    {content:"vp0 transaction request packed and distributed",state:0,time:'2017-01-02 03:21:11'},
    {content:"vp0 transaction request accepted",state:0,time:'2017-01-02 03:21:11'},
    {content:"Transaction transmit",state:0,time:'2017-01-02 03:21:11'},
    {content:"Receipt submission",state:0,time:'2017-01-02 03:21:11'},
];
// const _temp =
//   [{content:"交易执行成功",state:9,time:'2017-01-02 03:21:11'},
//   {content:"vp3执行交易完成并写入账本",state:0,time:'2017-01-02 03:21:11'},
//   {content:"vp1执行交易完成并写入账本",state:0,time:'2017-01-02 03:21:11'},
//   {content:"vp2执行交易完成并写入账本",state:0,time:'2017-01-02 03:21:11'},
//   {content:"vp0执行交易完成并写入账本",state:0,time:'2017-01-02 03:21:11'},
//   {content:"共识完成",state:0,time:'2017-01-02 03:21:11'},
//   {content:"vp3收到请求",state:0,time:'2017-01-02 03:21:11'},
//   {content:"vp2收到请求",state:0,time:'2017-01-02 03:21:11'},
//   {content:"vp1收到请求",state:0,time:'2017-01-02 03:21:11'},
//   {content:"vp0打包并分发交易请求",state:0,time:'2017-01-02 03:21:11'},
//   {content:"vp0接收交易请求",state:0,time:'2017-01-02 03:21:11'},
//   {content:"交易转发",state:0,time:'2017-01-02 03:21:11'},
//   {content:"表单提交",state:0,time:'2017-01-02 03:21:11'},]

function log(){

    /**
     * 一：功能需求
     *      1. 随机1-2秒插入一条记录
     *      2. 插入记录伴随动画
     *
     * 二：程序设计
     *      . 属性-容器对象
     *      . 属性-记录数据
     *      . 方法-清空插入区域
     *      . 方法-插入一条数据
     *      . 方法-对外初始化接口
     * */

    var _temp = [
        {content:"交易执行成功",state:9,time:'2017-01-02 03:21:11'},
        {content:"vp3执行交易完成并写入账本",state:0,time:'2017-01-02 03:21:11'},
        {content:"vp1执行交易完成并写入账本",state:0,time:'2017-01-02 03:21:11'},
        {content:"vp2执行交易完成并写入账本",state:0,time:'2017-01-02 03:21:11'},
        {content:"vp0执行交易完成并写入账本",state:0,time:'2017-01-02 03:21:11'},
        {content:"共识完成",state:0,time:'2017-01-02 03:21:11'},
        {content:"vp3收到请求",state:0,time:'2017-01-02 03:21:11'},
        {content:"vp2收到请求",state:0,time:'2017-01-02 03:21:11'},
        {content:"vp1收到请求",state:0,time:'2017-01-02 03:21:11'},
        {content:"vp0打包并分发交易请求",state:0,time:'2017-01-02 03:21:11'},
        {content:"vp0接收交易请求",state:0,time:'2017-01-02 03:21:11'},
        {content:"交易转发",state:0,time:'2017-01-02 03:21:11'},
        {content:"表单提交",state:0,time:'2017-01-02 03:21:11'},
    ];

    this.dom = $('.alter-layout');
    var _self = this;
    var logIndex = 0;

    this.init = function () {
        clearLog();
        addLog();
    }
    
    function clearLog(){
        _self.dom.children('.log').children('ul').html('');
    }
    
    function addLog() {
        var html = '<li><i></i><span>'+_temp[logIndex].content+'</span></li>';
        html = $(html);
        _self.dom.children('.log').children('ul').append(html);
        _self.dom.children('.log')[0].scrollTop=9999;
        logIndex++;
        if(logIndex<_temp.length)_self.addLogTime = window.setTimeout(addLog,randNum(300,800));
    }

    function randNum(min,max){
        return Math.random()*(max-min) + min;
    }

}

