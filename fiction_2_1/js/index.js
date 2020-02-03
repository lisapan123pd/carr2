var baseUrl ='http://api.yebans.com/'
var weixin = false;
var showlist= false;
var urlImage= '';
var moreText= false;
var image= [];
var top= '';
var readMenu= true;
var sectionList= [];
var settingColor= '#333';
var fontSize= 34;
var backColor= '#fff';
var setColor= 1;
var lists= '';
var arrList= '';
var section= '';
var maxsection= '';
var imgshow= false;
var uid= '';
var loading= true;
var user= '';
var imgarr= '';
var activeRead= false;
var activ= false;
var topscroll= '';
var scrollT= '';
var imgI=0;
var pageY= '';
var startY= '';
var title= '';
var settSize= false;
var statusBarHeight= '';
var topheight= '';
var navigationBarHeight= '';
var titleBarHeight= '';
var status= 'more';
var numactive= false;
var pai= 'ASC';
var bookid= '';
var imgUrl= '';
var popturn= false;
var detail= '';
var online= false;
var heig= 0;
var imgs=[
    {img1:'image/image/1.gif',img2:'image/image/2.gif', img3:'image/image/3.gif',img4:'image/image/4.jpg', img5:'image/image/5.gif'},
    {img1:'image/image/3.gif',img2:'image/image/4.jpg', img3:'image/image/2.gif',img4:'image/image/6.jpg', img5:'image/image/7.gif'},
    {img1:'image/image/5.gif',img2:'image/image/6.jpg', img3:'image/image/4.jpg',img4:'image/image/6.jpg', img5:'image/image/7.gif'},
    {img1:'image/image/7.gif',img2:'image/image/8.png', img3:'image/image/5.gif',img4:'image/image/6.jpg', img5:'image/image/1.gif'},
    ];
var imgTexts=[
    "96年女秘书故意露丁字裤，被老板猛插粉红嫩逼...",
    "白嫩小姨被我狂操90分钟，嫩逼被灌满白浆.....",
    "爽呀！！嫂子们一个比一个口活好，小穴水汪汪...",
    "你那个...太雄伟了，操的我下面好痛......啊~啊！",
    "嫂子，下面水好咸，可以不吸吗......",
    "淫荡的她让我吸她奶，坐我身上下插入，小穴太爽了！！！",
];
var imgIndex=0;
var statusTypes= [
    {
        value: 'more',
        text: '加载前'
    },
    {
        value: 'loading',
        text: '加载中'
    },
    {
        value: 'noMore',
        text: '没有更多'
    }
];
var contentText= {
    contentdown: '查看更多',
    contentrefresh: '加载中',
    contentnomore: '没有更多'
};
var id= '';
var channel= '';
var idArr=['5','5','5','5','5','5'];

//获取标题
var imgIndex = getRandomNumberByRange(0,5);
$('#headtitle').text(imgTexts[imgIndex]);
// 随机数
function getRandomNumberByRange(start, end) {
    return Math.floor(Math.random() * (end - start) + start);
}

//判断微信
isWeixinEsz();
function isWeixinEsz() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        weixin = true;
        $('.goskip').show();
    } else {
        weixin = false;
    }
}

var imgIValue = localStorage.getItem('imgI');
var channel = getQueryString('channel');

var idnode = 0;
var jumpId = 0;
var jumpIndex = 0;
getversion();
var bookid = jumpId;
if(imgIValue==''||imgIValue==undefined||imgIValue==null){
    localStorage.setItem('imgI',0)
    details();
}
goack();

//点击下载
$('.godownload').click(function(){
    godownload();
})

function goack(){
    var imgIValue = localStorage.getItem('imgI');
    online = false;
    if(imgIValue==0){
        imgI=imgIValue;
        localStorage.setItem('imgI',Number(imgI)+1);
    }else{
        imgI=imgIValue;
        localStorage.setItem('imgI',Number(imgI)+1);
        if(imgI==4){
            imgI = 0;
            localStorage.setItem('imgI',1);
        }
    }
    details();
    pushHistory()

    var url = window.location.href
    window.addEventListener("popstate", function(e) {  
        window.location=url
    }, false)

}

function pushHistory(){
    // function pushHistory() {
        var url = window.location.href
    　　var state = {
    　　　　title: "title",
    　　　　url: url
    　　};
    
    　　window.history.pushState(state, "title", url);
    // }
}

$('#closeAlert').click(function(){
    popturn = false;
    $('#alert').hide();
})


function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}


function gorank() {
    read();
}
function godownload() {
    var url = 'base/getNewVersionInfo';
    var method = `POST`;
    var param ={
    'channel':channel
    }

    $.ajax({
        url: baseUrl+url,
        type: method,
        // 设置的是请求参数
        data: param,
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function (res) {
            if(res.code==0){
                var url = res.data[0].downloadUrl;
                location.href = url;
            }else{
            }
        }
    })
}

function getversion() {
    var url = 'base/getNewVersionInfo';
    var method = `POST`;
    var param ={
        'channel':channel
    }
    
    $.ajax({
        url: baseUrl+url,
        type: method,
        // 设置的是请求参数
        data: param,
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        async: false,
        success: function (res) {
            if(res.code==0){
                jumpId = res.data[0].jumpBook;
                jumpIndex = res.data[0].jumpBookIndex;
                idnode = 0;
                console.log("设置idnode为0：" + idnode);
            }else{
            }
        }
    })
}


function details(){

	var url = 'book/detail';
    var method = `POST`;
    var param ={
        'id' :bookid,
        sort:pai
    }
      
    $.ajax({
        url: baseUrl+url,
        type: method,
        // 设置的是请求参数
        data: param,
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function (res) {
            if(res.code==0){
                if(res.data){
                    detail = res.data;
                }
                deRead();
                imgUrl=res.dfsfileaccessprefix;

                $('#titleimg').attr('src',imgUrl + detail.titleImg)
                $('#detailtitle').text(detail.title);
            }else{
                
            }
            
        }
    })
}

function read(obj){
	var url = 'booksection/read';
    var method = `POST`;
    console.log(id)
    var param ={
    'sectionid' :id
    }

    console.log("1 Read book SectionId: " + id);
    $.ajax({
        url: baseUrl+url,
        type: method,
        // 设置的是请求参数
        data: param,
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function (res) {
            if(res.code==0){
                image.push(res.data);
                imgshow = true;
                lists = res.data;
                if(res.data){
                    numactive = true
                    status = 'more';
                }else{
                    numactive = false
                    status = 'null';
                }

                var html = '';
                for(var i=0;i<image.length;i++){
                    if(i==0){
                        html += '<img src="'+imgs[imgI].img1+'" alt="" />';
                    }else if(i == 1){
                        html += '<img src="'+imgs[imgI].img2+'" alt="" />';
                    }else if(i == 2){
                        html += '<img src="'+imgs[imgI].img3+'" alt="" />';
                    }else if(i == 3){
                        html += '<img src="'+imgs[imgI].img4+'" alt="" />';
                    }else if(i == 4){
                        html += '<img src="'+imgs[imgI].img5+'" alt="" />';
                    }
                    
                    html += image[i];

                }
                $('#img_text').html(html);

            }
        }
    })

}

function readadd(obj){
	var url = 'booksection/read';
    var method = `POST`;
    var param ={
    'sectionid' :readId
    }

    console.log("2 Read book SectionId: " + readId);
    $.ajax({
        url: baseUrl+url,
        type: method,
        // 设置的是请求参数
        data: param,
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function (res) {
            if(res.code==0){
                // getuserin()
                console.log(image.length)
                console.log(jumpIndex)
                
                if(image.length<jumpIndex){
                    image.push(res.data);
                    var html = '';
                    for(var i=0;i<image.length;i++){
                        if(i==0){
                            html += '<img src="'+imgs[imgI].img1+'" alt="" />';
                        }else if(i == 1){
                            html += '<img src="'+imgs[imgI].img2+'" alt="" />';
                        }else if(i == 2){
                            html += '<img src="'+imgs[imgI].img3+'" alt="" />';
                        }else if(i == 3){
                            html += '<img src="'+imgs[imgI].img4+'" alt="" />';
                        }else if(i == 4){
                            html += '<img src="'+imgs[imgI].img5+'" alt="" />';
                        }
                        
                        html += image[i];
    
                    }
                    $('#img_text').html(html);

                    if(res.data){
                        status = 'more';
                    }else{
                        status = 'null';
                    }
                }else{
                    online = true;
                    popturn = true;
                    moreText = true;
                    status = 'null';
                    $('#alert').show();
                    $('#moreText').show();
                }
            }else{
                
            }
        }
    })
      
}

function deRead() {
    for (var i in detail.list) {
        if (i == idnode) {
            id = detail.list[i].id;
        }
    }
    gorank();
}



//滚动到底部
$(window).scroll(function (event) {
    var wScrollY = window.scrollY; // 当前滚动条位置  
    var wInnerH = window.innerHeight; // 设备窗口的高度（不会变）  
    var bScrollH = document.body.scrollHeight; // 滚动条总高度    
    
    //滚动到底部
    if (wScrollY + wInnerH >= bScrollH) {
        console.log("触发底部");
        if (!online) {
            status = 'loading';
            // idnode=idnode+1;
			for (let i in detail.list) {
				if (i == idnode) {
                    readId = detail.list[i].id;
                    console.log("section:" + detail.list[i].section);
					readadd();
				}
			}
		}
    }


    
});


//滚动一段距离弹出下载框
$('#webchat_scroller').on('touchend',function(e) {

    var touch = e.originalEvent.changedTouches[0]; 

    var y = touch.pageY;
    if (online) {
        heig = y - heig;
        if(heig>50){
             popturn = true;
             $('#alert').show();
        }
    }
});


//处理适配
function recalc() {
    var h = document.getElementById('html');
     // w代表实际宽度,获取当前屏幕可视区域大小
     var w = document.documentElement.clientWidth;
     // d代表设计宽度
     var d = 375;
     // 来动态设置html根标签的字体大小
   if (w>= 640) { 
         h.style.fontSize = '60px';
   } else {
         h.style.fontSize = w / d * 100 / 2 + 'px';
       } 
   }
   
   window.addEventListener("resize", recalc, false);
   
   document.addEventListener('DOMContentLoaded', recalc, false);