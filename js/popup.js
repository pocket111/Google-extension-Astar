
var winBackgroundPage = chrome.extension.getBackgroundPage();

function popupFun(){
	this.init=function(){
		var _sl = localStorage['_sl'];
		if(!_sl || _sl == undefined){
			return ;
		}
		var _i = localStorage['_i'];
		
		//chrome.storage.local.get(['_sl','_i','state'], function(result) {
		//	if(result._sl == undefined){
		//		return ;
		//	}
		//	var _d = result._sl;
			var _d = JSON.parse(_sl)
		
			$(".ip").html("<font style='font-family: verdana, sans-serif;font-size: 30px;font-weight: bold;'>disconnect</font>");
			
			var _img = "";
			var _f = "";
			if(_i == undefined){
				for(var i = 0;i < _d.d.length;i++){
					if(i == 0){
						_f += '<img class="x-select-icon" src="/img/flags/'+_d.d[i].p+'">';
						_f += '<label style="display: none;" id="select_now">'+_d.d[i].i+'</label>';
						_f += '<div class="x-select-title">'+_d.d[i].n+'</div>  ';
						var _l = '';
						if(_d.d[i].l == 2){
							_l = '<div class="x-select-badge">Premium</div>';
						}
						_f += _l;
						_f += '<div class="x-select-arrow"></div>';
						
						_img = _d.d[i].p;
					}
				}
			} else {
				var _flag = true;
				for(var i = 0;i < _d.d.length;i++){
					if(_d.d[i].i == _i){
						_flag = false;
					}
				}
				
				for(var i = 0;i < _d.d.length;i++){
					if(_flag){
						if(i == 0){
							_f += '<img class="x-select-icon" src="/img/flags/'+_d.d[i].p+'">';
							_f += '<label style="display: none;" id="select_now">'+_d.d[i].i+'</label>';
							_f += '<div class="x-select-title">'+_d.d[i].n+'</div>  ';
							var _l = '';
							if(_d.d[i].l == 2){
								_l = '<div class="x-select-badge">Premium</div>';
							}
							_f += _l;
							_f += '<div class="x-select-arrow"></div>';
							
							_img = _d.d[i].p;
						}
					} else {
						if(_d.d[i].i == _i){
							_f += '<img class="x-select-icon" src="/img/flags/'+_d.d[i].p+'">';
							_f += '<label style="display: none;" id="select_now">'+_d.d[i].i+'</label>';
							_f += '<div class="x-select-title">'+_d.d[i].n+'</div>  ';
							var _l = '';
							if(_d.d[i].l == 2){
								_l = '<div class="x-select-badge">Premium</div>';
							}
							_f += _l;
							_f += '<div class="x-select-arrow"></div>';
							
							_img = _d.d[i].p;
						}
					}
				}
			}
			$(".x-select-view").html(_f);
			
			$(".x-select-arrow").bind("click", function(){
				var _dispaly = $(".x-select-dropdown").css("display");
				if(_dispaly == 'none'){
					$(".x-select-dropdown").css("display", "block");
				} else {
					$(".x-select-dropdown").css("display", "none");
				}
			});
			
			var _s = "";
			for(var i = 0;i < _d.d.length;i++){
				var __s = '<div class="x-select-item" value="'+_d.d[i].i+'">';
					__s += '<img class="x-select-icon" src="/img/flags/'+_d.d[i].p+'">';
					__s += '<div class="x-select-title">'+_d.d[i].n+'</div>';
					var _l = "";
					if(_d.d[i].l == 2){
						_l = '<div class="x-select-badge">Premium</div>';
					}
					__s += _l;
					__s += '</div>';
				_s += __s;
			}
			$(".x-select-dropdown").html(_s);
			
			$(".x-select-item").bind("click", function(){
				var _i = $(this).attr("value");
				popup.showSelected(_i);
			});
			
			var state = localStorage['state'];
			if(state == undefined || state == 0){
				return ;
			}
			
			if(state == 1){
				$("body").addClass("on");
				$('#vpn-on').attr("checked", true);
				$(".ip").html("<font style='font-family: verdana, sans-serif;font-size: 30px;font-weight: bold;'>connect</font>");
			}
		//});
	},
	this.showSelected=function(_i){
		//chrome.storage.local.get(['_sl'], function(result) {
		//	if(result._sl == undefined){
		//		return ;
		//	}
			
		//	var _d = result._sl;
		var _sl = localStorage['_sl'];
		if(_sl == undefined){
			return ;
		}
			var _d = JSON.parse(_sl)
			//$(".ip").html("connect");
			
			$(".x-select-dropdown").css("display", "none");
			
			var _f = "";
			for(var i = 0;i < _d.d.length;i++){
				if(_d.d[i].i == _i){
					_f += '<img class="x-select-icon" src="/img/flags/'+_d.d[i].p+'">';
					_f += '<label style="display: none;" id="select_now">'+_d.d[i].i+'</label>';
					_f += '<div class="x-select-title">'+_d.d[i].n+'</div>  ';
					var _l = '';
					if(_d.d[i].l == 2){
						_l = '<div class="x-select-badge">Premium</div>';
					}
					_f += _l;
					_f += '<div class="x-select-arrow"></div>';
				}
			}
			$(".x-select-view").html(_f);
			
			$(".x-select-arrow").bind("click", function(){
				var _dispaly = $(".x-select-dropdown").css("display");
				if(_dispaly == 'none'){
					$(".x-select-dropdown").css("display", "block");
				} else {
					$(".x-select-dropdown").css("display", "none");
				}
			});
			
			var state = localStorage['state'];
			
			//chrome.storage.local.get(['state'], function(result) {
				if(state == undefined){
					return ;
				}
				if(state == 1){
					$("body").addClass("loading");
					$(".ip").html("<font style='font-family: verdana, sans-serif;font-size: 30px;font-weight: bold;'>connecting</font>");
					//chrome.storage.local.set({"_i":_i},function(){});
					localStorage['_i'] = _i
					//chrome.runtime.sendMessage(chrome.runtime.id,{'n':202}, function(response){});
					winBackgroundPage.server.popupEvent(202);
				}
				if(state == 0){
					$(".ip").html("<font style='font-family: verdana, sans-serif;font-size: 30px;font-weight: bold;'>disconnecting</font>");
					//chrome.storage.local.set({"_i":_i},function(){});
					localStorage['_i'] = _i
					//chrome.runtime.sendMessage(chrome.runtime.id,{'n':202}, function(response){});
					winBackgroundPage.server.popupEvent(202);
				}
			//});
		//});
	},
    this.listenerSt = function(){
        
    },
    this.listenerBg = function(){
		chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
			if(message.n == 1){
				$("body").removeClass("loading");
				$("body").addClass("on");
				$('#vpn-on').attr("checked", true);
				popup.init();
			}
			if(message.n == 0){
				$("body").removeClass("on");
				$("body").removeClass("loading");
				$('#vpn-on').attr("checked", false);
				popup.init();
			}
			if(message.n == 2){
				popup.init();
			}
			if(message.n == 4){
				$("body").removeClass("on");
				popup.init();
			}
			
			sendResponse({caback: "ok"});
		});
	},
	this.backgroundEvent = function(message){
		if(message.n == 1){
			$("body").removeClass("loading");
			$("body").addClass("on");
			$('#vpn-on').attr("checked", true);
			popup.init();
		}
		if(message.n == 0){
			$("body").removeClass("on");
			$("body").removeClass("loading");
			$('#vpn-on').attr("checked", false);
			popup.init();
		}
		if(message.n == 2){
			popup.init();
		}
		if(message.n == 4){
			$("body").removeClass("on");
			popup.init();
		}
	},
	this.change = function(){
		if($('#vpn-on').is(':checked')){
			$("body").addClass("loading");
			$(".ip").html("<font style='font-family: verdana, sans-serif;font-size: 30px;font-weight: bold;'>connecting</font>");
			var _title = $("#select_now").html();
			//chrome.storage.local.set({"_i":_title},function(){});
			localStorage['_i'] = _title
			//chrome.runtime.sendMessage(chrome.runtime.id,{'n':200}, function(response){}); <span>IP </span> ...
			winBackgroundPage.server.popupEvent(200);
		} else {
			$(".ip").html("<font style='font-family: verdana, sans-serif;font-size: 30px;font-weight: bold;'>disconnecting</font>");
			//chrome.runtime.sendMessage(chrome.runtime.id,{'n':404}, function(response){});
			winBackgroundPage.server.popupEvent(404);
		}
    }
	/*,
	this.showIP = function(){
		chrome.storage.local.get(['_sl'], function(result) {
			if(result._sl == undefined){
				return ;
			}
			var _d = result._sl;
			//$(".ip").html("disconnect");
		});
	}*/
	,
	this.showWebRtc = function(state){
		var webRtcState = localStorage['webRtcState']
		if(state){
			webRtcState = state
		}
		if(webRtcState == '1'){
			$("#startWebRtc").css({"display":"block"});
			$("#stopWebRtc").css({"display":"none"});
		} else {
			$("#startWebRtc").css({"display":"none"});
			$("#stopWebRtc").css({"display":"block"});
		}
	}
}

var popup = new popupFun();
popup.init();
popup.listenerSt();

$(function(){
	//chrome.storage.local.set({"_click":1},function(){});
	localStorage['_click'] = '1';
	
	$('#vpn-on').bind("click", function(){
		//chrome.storage.local.get(['_click'], function(result) {
			var _click = localStorage['_click']
			if(_click == 0){
				return ;
			}
			//chrome.storage.local.set({"_click":0},function(){});
			localStorage['_click'] = '0';
			popup.change();
		//});
	});
	
	$("#open-settings").bind("click", function(){
		$("#setting-panel").css({"width":"300px"});
		$("#setting-header").css({"display":"block"});
		$("#setting-body").css({"display":"block"});
		popup.showWebRtc()
		
	});
	
	$("#close-settings").bind("click", function(){
		$("#setting-header").css({"display":"none"});
		$("#setting-body").css({"display":"none"});
		$("#setting-panel").css({"width":"0px"});
		
		
	});
	
	$(".wechat").hover(function(){
		$(".wechatshare").css({"display":"block"});
	},function(){
		$(".wechatshare").css({"display":"none"});
	});
	
	$("#stopWebRtc").bind("click", function(){
		chrome.permissions.request({
			permissions: ['privacy'],
		}, (granted) => {
			console.info(granted)
			if (granted) {
				winBackgroundPage.stopWebRtc()
				popup.showWebRtc('1')
				localStorage['webRtcState'] = '1';
			} else {
				popup.showWebRtc('2')
				localStorage['webRtcState'] = '2';
			}
		})
	});
	
	$("#startWebRtc").bind("click", function(){
		winBackgroundPage.startWebRtc()
		chrome.permissions.remove({
			permissions: ['privacy'],
		}, (granted) => {
			console.info(granted)
			if (granted) {
				popup.showWebRtc('2')
				localStorage['webRtcState'] = '2';
			} else {
				popup.showWebRtc('1')
				localStorage['webRtcState'] = '1';
			}
		})
	});
	
	$("#five_astar").bind("click", function(){
		var userAgent = window.navigator.userAgent;
		var t = "";
		if(userAgent.indexOf('Chrome') != -1){
			t = "https://chrome.google.com/webstore/detail/jajilbjjinjmgcibalaakngmkilboobh/reviews?utm_source=chrome-ntp-icon";
		} else {
			t = "https://addons.mozilla.org/zh-CN/firefox/addon/jajilbjjinjmgcibalaakngmkilboobh/";
		}
		
		window.open(t,"about")
	});
	
	$("[name='share_img']").bind("click", function(){
		var  t = 'https://chrome.google.com/webstore/detail/jajilbjjinjmgcibalaakngmkilboobh';
		var i = 'Astar VPN';
		var n = 'Astar VPN - Free and fast VPN for everyone. Easily watch 720P, 1080P, 1440P, 4K, 8K videos on YouTube.';
		var toPage = $(this).attr("id");
		
		if(toPage == 'facebook'){
			window.open("https://www.facebook.com/sharer/sharer.php?u="+t,"facebook")
		} else if(toPage == 'twitter'){
			window.open("https://twitter.com/intent/tweet?text="+i+": "+n+"&url="+t,"twitter")
		} else if(toPage == 'weibo'){
			window.open("http://service.weibo.com/share/share.php?title="+i+": "+n+"&url="+t+"&pic=","weibo")
		} else if(toPage == 'google'){
			window.open("https://plus.google.com/share?url="+t,"google")
		} else if(toPage == 'qzone'){
			window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+t+"&title="+i+": "+n+"&desc="+i+": "+n+"&summary="+i+": "+n+"&site="+i+": "+n,"qzone")
		}
		});
})